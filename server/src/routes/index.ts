import { Router } from 'express';
import servicesRouter from './services';
import locationsRouter from './locations';
import industriesRouter from './industries';
import caseStudiesRouter from './caseStudies';
import blogRouter from './blog';
import careersRouter from './careers';
import testimonialsRouter from './testimonials';
import leadsRouter from './leads';
import eventsRouter from './events';
import adminRouter from './admin';

const router = Router();

// Master Admin Routes (/api/admin/*)
router.use('/admin', adminRouter);

// Public Content Routes
router.use('/services', servicesRouter);
router.use('/locations', locationsRouter);
router.use('/industries', industriesRouter);
router.use('/case-studies', caseStudiesRouter);
router.use('/blog', blogRouter);
router.use('/careers', careersRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/leads', leadsRouter);
router.use('/events', eventsRouter);

// Public Settings route
router.get('/settings', async (req, res, next) => {
  try {
    const { Settings } = await import('../models/Settings');
    const settings = await (Settings as any).getSingleton();
    res.json({ success: true, data: settings, meta: { timestamp: new Date().toISOString() }, error: null });
  } catch (err) {
    next(err);
  }
});

// Root healthcheck
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'NSE – New Sahyadri Elevator API',
    timestamp: new Date().toISOString(),
  });
});

export default router;
