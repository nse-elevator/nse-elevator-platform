import { Router } from 'express';
import authRouter from './auth';
import leadsRouter from './leads';
import settingsRouter from './settings';
import analyticsRouter from './analytics';
import { createGenericCrudRouter } from './crudFactory';
import { adminAuth } from '../../middleware/adminAuth';

const router = Router();

// 1. Admin Authentication Routes (login is public, /me is verified)
router.use('/auth', authRouter);

// 2. Admin Leads CRM Routes (protected by adminAuth)
router.use('/leads', adminAuth, leadsRouter);

// 3. Admin Site Settings Routes (protected by adminAuth)
router.use('/settings', adminAuth, settingsRouter);

// 4. Admin Conversion Analytics Routes (protected by adminAuth)
router.use('/analytics', analyticsRouter);

// 3. Generic Protected Content CRUD Routes for all 7 content types
//    Protected by adminAuth middleware
router.use('/', adminAuth, createGenericCrudRouter());

export default router;
