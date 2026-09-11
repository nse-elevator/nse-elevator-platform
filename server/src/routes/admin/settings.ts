import { Router, Request, Response, NextFunction } from 'express';
import { Settings } from '../../models/Settings';
import { sendSuccess } from '../../middleware/errorHandler';

const router = Router();

// GET /api/admin/settings — get current site settings
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await (Settings as any).getSingleton();
    return sendSuccess(res, settings);
  } catch (error) {
    return next(error);
  }
});

// PUT /api/admin/settings — update site settings
router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await (Settings as any).getSingleton();

    const allowedKeys = [
      'companyName',
      'brandName',
      'contactPhone',
      'whatsappNumber',
      'dispatchEmail',
      'emergencyBannerText',
      'emergencyResponseWindow',
      'headOfficeAddress',
      'puneBranch1Address',
      'businessHours',
    ];

    for (const key of allowedKeys) {
      if (req.body[key] !== undefined) {
        (settings as any)[key] = req.body[key];
      }
    }

    await settings.save();
    return sendSuccess(res, settings, { message: 'Site settings updated successfully' });
  } catch (error) {
    return next(error);
  }
});

export default router;
