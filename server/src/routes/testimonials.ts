import { Router, Request, Response, NextFunction } from 'express';
import { Testimonial } from '../models/Testimonial';
import { sendSuccess } from '../middleware/errorHandler';

const router = Router();

// GET /api/testimonials - list verified testimonials
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const query = { status: 'published' };
    const [testimonials, total] = await Promise.all([
      Testimonial.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      Testimonial.countDocuments(query),
    ]);

    return sendSuccess(res, testimonials, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
