import { Router, Request, Response, NextFunction } from 'express';
import { JobPosting } from '../models/JobPosting';
import { sendSuccess, sendError } from '../middleware/errorHandler';

const router = Router();

// GET /api/careers - list active job openings
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const query = { status: 'published' };
    const [jobs, total] = await Promise.all([
      JobPosting.find(query).skip(skip).limit(limit).sort({ datePosted: -1 }).lean(),
      JobPosting.countDocuments(query),
    ]);

    return sendSuccess(res, jobs, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return next(error);
  }
});

// GET /api/careers/:slug - get job opening detail by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const job = await JobPosting.findOne({ slug, status: 'published' }).lean();

    if (!job) {
      return sendError(res, 'NOT_FOUND', `Job opening '${slug}' not found`, 404);
    }

    return sendSuccess(res, job);
  } catch (error) {
    return next(error);
  }
});

export default router;
