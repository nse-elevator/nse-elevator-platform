import { Router, Request, Response, NextFunction } from 'express';
import { Location } from '../models/Location';
import { sendSuccess, sendError } from '../middleware/errorHandler';

const router = Router();

// GET /api/locations - list published locations with pagination
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const query = { status: 'published' };
    const [locations, total] = await Promise.all([
      Location.find(query).skip(skip).limit(limit).sort({ cityName: 1 }).lean(),
      Location.countDocuments(query),
    ]);

    return sendSuccess(res, locations, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return next(error);
  }
});

// GET /api/locations/:slug - get location detail by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const location = await Location.findOne({ slug, status: 'published' }).lean();

    if (!location) {
      return sendError(res, 'NOT_FOUND', `Location '${slug}' not found`, 404);
    }

    return sendSuccess(res, location);
  } catch (error) {
    return next(error);
  }
});

export default router;
