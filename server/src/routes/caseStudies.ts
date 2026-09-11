import { Router, Request, Response, NextFunction } from 'express';
import { CaseStudy } from '../models/CaseStudy';
import { sendSuccess, sendError } from '../middleware/errorHandler';

const router = Router();

// GET /api/case-studies - list published case studies with pagination
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const query = { status: 'published' };
    const [caseStudies, total] = await Promise.all([
      CaseStudy.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      CaseStudy.countDocuments(query),
    ]);

    return sendSuccess(res, caseStudies, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return next(error);
  }
});

// GET /api/case-studies/:slug - get case study detail by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const caseStudy = await CaseStudy.findOne({ slug, status: 'published' }).lean();

    if (!caseStudy) {
      return sendError(res, 'NOT_FOUND', `Case study '${slug}' not found`, 404);
    }

    return sendSuccess(res, caseStudy);
  } catch (error) {
    return next(error);
  }
});

export default router;
