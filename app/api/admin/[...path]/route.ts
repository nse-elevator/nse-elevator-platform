import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../../../lib/db';
import { Lead } from '../../../../server/src/models/Lead';
import { Settings } from '../../../../server/src/models/Settings';
import { Service } from '../../../../server/src/models/Service';
import { Location } from '../../../../server/src/models/Location';
import { Industry } from '../../../../server/src/models/Industry';
import { CaseStudy } from '../../../../server/src/models/CaseStudy';
import { BlogPost } from '../../../../server/src/models/BlogPost';
import { JobPosting } from '../../../../server/src/models/JobPosting';
import { Testimonial } from '../../../../server/src/models/Testimonial';
import { config } from '../../../../server/src/config/env';

const modelMap: Record<string, any> = {
  services: Service,
  locations: Location,
  industries: Industry,
  casestudies: CaseStudy,
  'case-studies': CaseStudy,
  blog: BlogPost,
  blogposts: BlogPost,
  careers: JobPosting,
  jobpostings: JobPosting,
  testimonials: Testimonial,
};

function verifyAdminToken(req: NextRequest): boolean {
  let token = cookies().get('admin_token')?.value;
  if (!token) {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }

  if (!token) return false;

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as any;
    return Boolean(decoded && decoded.role === 'admin');
  } catch {
    return false;
  }
}

function escapeCsvField(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

async function handleAdminRequest(req: NextRequest, { params }: { params: { path: string[] } }) {
  // 1. Verify authentication
  const isAuthenticated = verifyAdminToken(req);
  if (!isAuthenticated) {
    const unauthRes = NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'Authentication required. Please log in.' },
      },
      { status: 401 }
    );
    unauthRes.cookies.delete('admin_token');
    return unauthRes;
  }

  // 2. Connect to MongoDB Atlas
  await connectToDatabase();

  const path = params.path || [];
  const resource = path[0] ? path[0].toLowerCase() : '';
  const subAction = path[1] ? path[1].toLowerCase() : '';
  const url = new URL(req.url);

  try {
    // -------------------------------------------------------------
    // ROUTE: /api/admin/leads/*
    // -------------------------------------------------------------
    if (resource === 'leads') {
      // 1. GET /api/admin/leads/stats
      if (req.method === 'GET' && subAction === 'stats') {
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

        return NextResponse.json({
          success: true,
          data: {
            totalLeads,
            leadsThisWeek,
            statusCounts,
            topSources,
            recentLeads,
          },
        });
      }

      // 2. GET /api/admin/leads/export (CSV file download)
      if (req.method === 'GET' && subAction === 'export') {
        const filter: Record<string, any> = {};
        const status = url.searchParams.get('status');
        if (status) filter.status = status;
        const propertyType = url.searchParams.get('propertyType');
        if (propertyType) filter.propertyType = propertyType;
        const search = url.searchParams.get('search') || url.searchParams.get('q');
        if (search) {
          const regex = new RegExp(search.trim(), 'i');
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
          'Lead Score',
          'Score Bucket',
          'Status',
          'Created Date',
          'Source',
          'Message',
        ];

        const rows = leads.map((l: any) => [
          escapeCsvField(l._id),
          escapeCsvField(l.name),
          escapeCsvField(l.email),
          escapeCsvField(l.phone),
          escapeCsvField(l.buildingName || ''),
          escapeCsvField(l.address || ''),
          escapeCsvField(l.propertyType || ''),
          escapeCsvField(l.elevatorCount || 1),
          escapeCsvField(l.serviceUrgency || ''),
          escapeCsvField(l.leadScore || 0),
          escapeCsvField(l.leadScoreBucket || 'Low'),
          escapeCsvField(l.status || 'New'),
          escapeCsvField(l.createdAt ? new Date(l.createdAt).toISOString() : ''),
          escapeCsvField(l.source || ''),
          escapeCsvField(l.message || ''),
        ]);

        const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
        const dateStamp = new Date().toISOString().split('T')[0];

        return new NextResponse(csvContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="nse-leads-export-${dateStamp}.csv"`,
          },
        });
      }

      // 3. PATCH /api/admin/leads/:id/status
      if (req.method === 'PATCH' && path.length === 3 && path[2].toLowerCase() === 'status') {
        const leadId = path[1];
        const body = await req.json().catch(() => ({}));
        const { status } = body;

        const validStatuses = ['New', 'Contacted', 'Quoted', 'Converted', 'Lost'];
        if (!validStatuses.includes(status)) {
          return NextResponse.json(
            { success: false, error: { code: 'VALIDATION_ERROR', message: `Invalid status: ${status}` } },
            { status: 422 }
          );
        }

        const updated = await Lead.findByIdAndUpdate(leadId, { status }, { new: true });
        if (!updated) {
          return NextResponse.json(
            { success: false, error: { code: 'NOT_FOUND', message: 'Lead not found' } },
            { status: 404 }
          );
        }

        return NextResponse.json({ success: true, data: updated });
      }

      // 4. GET /api/admin/leads/:id (Single detail)
      if (req.method === 'GET' && path.length === 2) {
        const leadId = path[1];
        const lead = await Lead.findById(leadId).lean();
        if (!lead) {
          return NextResponse.json(
            { success: false, error: { code: 'NOT_FOUND', message: 'Lead not found' } },
            { status: 404 }
          );
        }
        return NextResponse.json({ success: true, data: lead });
      }

      // 5. GET /api/admin/leads (Paginated list)
      if (req.method === 'GET' && path.length === 1) {
        const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
        const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '10', 10)));
        const skip = (page - 1) * limit;

        const filter: Record<string, any> = {};
        const status = url.searchParams.get('status');
        if (status) filter.status = status;
        const propertyType = url.searchParams.get('propertyType');
        if (propertyType) filter.propertyType = propertyType;
        const search = url.searchParams.get('search') || url.searchParams.get('q');
        if (search) {
          const regex = new RegExp(search.trim(), 'i');
          filter.$or = [
            { name: regex },
            { email: regex },
            { phone: regex },
            { buildingName: regex },
            { address: regex },
          ];
        }

        const [leads, total] = await Promise.all([
          Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
          Lead.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
          success: true,
          data: leads,
          meta: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        });
      }
    }

    // -------------------------------------------------------------
    // ROUTE: /api/admin/settings
    // -------------------------------------------------------------
    if (resource === 'settings') {
      if (req.method === 'GET') {
        const settings = await (Settings as any).getSingleton();
        return NextResponse.json({ success: true, data: settings });
      }

      if (req.method === 'PUT') {
        const body = await req.json().catch(() => ({}));
        let settings = await (Settings as any).getSingleton();
        Object.assign(settings, body);
        await settings.save();
        return NextResponse.json({ success: true, data: settings, message: 'Settings updated successfully' });
      }
    }

    // -------------------------------------------------------------
    // ROUTE: /api/admin/analytics
    // -------------------------------------------------------------
    if (resource === 'analytics') {
      const now = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [totalLeads, convertedLeads, leadsByDay, leadsByPropType] = await Promise.all([
        Lead.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        Lead.countDocuments({ createdAt: { $gte: thirtyDaysAgo }, status: 'Converted' }),
        Lead.aggregate([
          { $match: { createdAt: { $gte: thirtyDaysAgo } } },
          { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
          { $sort: { _id: 1 } },
        ]),
        Lead.aggregate([
          { $group: { _id: '$propertyType', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
      ]);

      const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';

      return NextResponse.json({
        success: true,
        data: {
          totalLeads30d: totalLeads,
          convertedLeads30d: convertedLeads,
          conversionRate: `${conversionRate}%`,
          leadsByDay,
          leadsByPropType,
        },
      });
    }

    // -------------------------------------------------------------
    // ROUTE: /api/admin/[contentType] (Generic Content CRUD)
    // -------------------------------------------------------------
    const Model = modelMap[resource];
    if (Model) {
      // 1. GET list
      if (req.method === 'GET' && path.length === 1) {
        const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
        const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '20', 10)));
        const skip = (page - 1) * limit;

        const filter: Record<string, any> = {};
        const status = url.searchParams.get('status');
        if (status) filter.status = status;

        const [items, total] = await Promise.all([
          Model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
          Model.countDocuments(filter),
        ]);

        return NextResponse.json({
          success: true,
          data: items,
          meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
      }

      // 2. GET single item
      if (req.method === 'GET' && path.length === 2) {
        const item = await Model.findById(path[1]).lean();
        if (!item) {
          return NextResponse.json({ success: false, error: { message: 'Item not found' } }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: item });
      }

      // 3. POST create item
      if (req.method === 'POST') {
        const body = await req.json().catch(() => ({}));
        const newItem = await Model.create(body);
        return NextResponse.json({ success: true, data: newItem }, { status: 201 });
      }

      // 4. PUT update item
      if (req.method === 'PUT' && path.length === 2) {
        const body = await req.json().catch(() => ({}));
        const updated = await Model.findByIdAndUpdate(path[1], body, { new: true });
        if (!updated) {
          return NextResponse.json({ success: false, error: { message: 'Item not found' } }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updated });
      }

      // 5. DELETE item
      if (req.method === 'DELETE' && path.length === 2) {
        const deleted = await Model.findByIdAndDelete(path[1]);
        if (!deleted) {
          return NextResponse.json({ success: false, error: { message: 'Item not found' } }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: { id: path[1], message: 'Deleted successfully' } });
      }
    }

    // Unmatched admin route
    return NextResponse.json(
      {
        success: false,
        error: { code: 'ROUTE_NOT_FOUND', message: `Admin route /api/admin/${path.join('/')} not found` },
      },
      { status: 404 }
    );
  } catch (error) {
    console.error(`[Admin API Error] /api/admin/${path.join('/')}:`, error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: (error as Error).message || 'Internal server error' },
      },
      { status: 500 }
    );
  }
}

export const GET = handleAdminRequest;
export const POST = handleAdminRequest;
export const PUT = handleAdminRequest;
export const PATCH = handleAdminRequest;
export const DELETE = handleAdminRequest;
