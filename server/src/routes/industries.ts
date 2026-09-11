import { Router, Request, Response, NextFunction } from 'express';
import { Industry } from '../models/Industry';
import { sendSuccess, sendError } from '../middleware/errorHandler';

const router = Router();

// GET /api/industries - list published industries with pagination
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const query = { status: 'published' };
    const [industries, total] = await Promise.all([
      Industry.find(query).skip(skip).limit(limit).sort({ createdAt: 1 }).lean(),
      Industry.countDocuments(query),
    ]);

    return sendSuccess(res, industries, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return next(error);
  }
});

// GET /api/industries/:slug - get industry detail by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const industry = await Industry.findOne({ slug, status: 'published' }).lean();

    if (!industry) {
      return sendError(res, 'NOT_FOUND', `Industry '${slug}' not found`, 404);
    }

    return sendSuccess(res, industry);
  } catch (error) {
    return next(error);
  }
});

export default router;
