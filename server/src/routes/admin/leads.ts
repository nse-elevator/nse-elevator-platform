import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Lead } from '../../models/Lead';
import { leadStatusSchema } from '../../validation/contentSchemas';
import { sendSuccess, sendError } from '../../middleware/errorHandler';

const router = Router();

function escapeCsvField(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

// 1. GET /api/admin/leads/export (CSV export respecting filter params)
// NOTE: Must be defined before /:id route
router.get('/export', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: Record<string, any> = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.propertyType) {
      filter.propertyType = req.query.propertyType;
    }

    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate as string);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate as string);
      }
    }

    const searchQuery = (req.query.search || req.query.q) as string;
    if (searchQuery) {
      const regex = new RegExp(searchQuery.trim(), 'i');
      filter.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { buildingName: regex },
        { address: regex },
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(5000).lean();

    const headers = [
      'Lead ID',
      'Name',
      'Email',
      'Phone',
      'Building Name',
      'Address',
      'Property Type',
      'Elevator Count',
      'Service Urgency',
      'Status',
      'Created At',
      'Message',
    ];

    const rows = leads.map((lead: any) => [
      escapeCsvField(lead._id),
      escapeCsvField(lead.name),
      escapeCsvField(lead.email),
      escapeCsvField(lead.phone),
      escapeCsvField(lead.buildingName || ''),
      escapeCsvField(lead.address || ''),
      escapeCsvField(lead.propertyType || ''),
      escapeCsvField(lead.elevatorCount || 1),
      escapeCsvField(lead.serviceUrgency || ''),
      escapeCsvField(lead.status),
      escapeCsvField(lead.createdAt ? new Date(lead.createdAt).toISOString() : ''),
      escapeCsvField(lead.message || ''),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const dateStamp = new Date().toISOString().split('T')[0];

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="nse-leads-export-${dateStamp}.csv"`);
    res.status(200).send(csvContent);
  } catch (error) {
    return next(error);
  }
});

// 2. GET /api/admin/leads/stats (CRM aggregation for admin dashboard)
router.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const [totalLeads, leadsThisWeek, statusAggregation, sourcesAggregation, recentLeads] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: oneWeekAgo } }),
      Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Lead.aggregate([
        { $group: { _id: { $ifNull: ['$source', 'website'] }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const statusCounts: Record<string, number> = {
      New: 0,
      Contacted: 0,
      Quoted: 0,
      Converted: 0,
      Lost: 0,
    };

    for (const item of statusAggregation) {
      if (item._id && statusCounts[item._id] !== undefined) {
        statusCounts[item._id] = item.count;
      }
    }

    const topSources = sourcesAggregation.map((s) => ({
      source: s._id || 'website',
      count: s.count,
    }));

    return sendSuccess(res, {
      totalLeads,
      leadsThisWeek,
      statusCounts,
      topSources,
      recentLeads,
    });
  } catch (error) {
    return next(error);
  }
});

// 2. GET /api/admin/leads (Paginated, filterable, default sort createdAt desc)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 10));
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.propertyType) {
      filter.propertyType = req.query.propertyType;
    }

    const searchQuery = (req.query.search || req.query.q) as string;
    if (searchQuery) {
      const regex = new RegExp(searchQuery.trim(), 'i');
      filter.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { buildingName: regex },
        { address: regex },
      ];
    }

    // Default sort: createdAt desc
    let sortObj: Record<string, 1 | -1> = { createdAt: -1 };
    if (req.query.sort) {
      const sortParts = (req.query.sort as string).split(':');
      if (sortParts.length === 2) {
        sortObj = { [sortParts[0]]: sortParts[1].toLowerCase() === 'desc' ? -1 : 1 };
      } else if ((req.query.sort as string).startsWith('-')) {
        sortObj = { [(req.query.sort as string).substring(1)]: -1 };
      } else {
        sortObj = { [req.query.sort as string]: 1 };
      }
    }

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
      Lead.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return sendSuccess(res, leads, {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    return next(error);
  }
});

// 3. GET /api/admin/leads/:id (Single lead detail)
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 'INVALID_ID', `Invalid lead ID '${id}'`, 400);
    }

    const lead = await Lead.findById(id).lean();

    if (!lead) {
      return sendError(res, 'NOT_FOUND', `Lead with ID '${id}' not found`, 404);
    }

    return sendSuccess(res, lead);
  } catch (error) {
    return next(error);
  }
});

// 4. PATCH /api/admin/leads/:id/status (Update status only)
router.patch('/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 'INVALID_ID', `Invalid lead ID '${id}'`, 400);
    }

    const parseResult = leadStatusSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return sendError(
        res,
        'VALIDATION_ERROR',
        'Invalid lead status submitted. Must be one of: New, Contacted, Quoted, Converted, Lost',
        422,
        fieldErrors
      );
    }

    const { status } = parseResult.data;

    const existingLead = await Lead.findById(id);
    if (!existingLead) {
      return sendError(res, 'NOT_FOUND', `Lead with ID '${id}' not found`, 404);
    }

    const updateFields: Record<string, any> = { status };
    if (status !== 'New' && !existingLead.firstContactedAt) {
      updateFields.firstContactedAt = new Date();
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    ).lean();

    return sendSuccess(res, updatedLead, {
      message: `Lead status updated to '${status}' successfully`,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
