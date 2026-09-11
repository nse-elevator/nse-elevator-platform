import { Router, Request, Response, NextFunction } from 'express';
import { BlogPost } from '../models/BlogPost';
import { sendSuccess, sendError } from '../middleware/errorHandler';

const router = Router();

// GET /api/blog - list published blog posts with pagination
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const query = { status: 'published' };
    const [posts, total] = await Promise.all([
      BlogPost.find(query).skip(skip).limit(limit).sort({ publishedAt: -1 }).lean(),
      BlogPost.countDocuments(query),
    ]);

    return sendSuccess(res, posts, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return next(error);
  }
});

// GET /api/blog/:slug - get article detail by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const post = await BlogPost.findOne({ slug, status: 'published' }).lean();

    if (!post) {
      return sendError(res, 'NOT_FOUND', `Blog article '${slug}' not found`, 404);
    }

    return sendSuccess(res, post);
  } catch (error) {
    return next(error);
  }
});

export default router;
