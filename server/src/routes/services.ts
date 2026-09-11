import { Router, Request, Response, NextFunction } from 'express';
import { Service } from '../models/Service';
import { sendSuccess, sendError } from '../middleware/errorHandler';

const router = Router();

// GET /api/services - list published services with pagination
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const query = { status: 'published' };
    const [services, total] = await Promise.all([
      Service.find(query).skip(skip).limit(limit).sort({ createdAt: 1 }).lean(),
      Service.countDocuments(query),
    ]);

    return sendSuccess(res, services, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return next(error);
  }
});

// GET /api/services/:slug - get service detail by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const service = await Service.findOne({ slug, status: 'published' }).lean();

    if (!service) {
      return sendError(res, 'NOT_FOUND', `Service '${slug}' not found`, 404);
    }

    return sendSuccess(res, service);
  } catch (error) {
    return next(error);
  }
});

export default router;
