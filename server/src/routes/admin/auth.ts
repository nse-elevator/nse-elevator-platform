import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../../models/User';
import { config } from '../../config/env';
import { sendSuccess, sendError } from '../../middleware/errorHandler';
import { adminAuth } from '../../middleware/adminAuth';

const router = Router();

// Zod validation schema for admin login
const loginSchema = z.object({
  email: z.string().email('Valid email is required').trim().toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

// POST /api/admin/auth/login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return sendError(
        res,
        'VALIDATION_ERROR',
        'Invalid login credentials submitted',
        422,
        fieldErrors
      );
    }

    const { email, password } = parseResult.data;

    // Look up user by lowercase email
    const user = await User.findOne({ email });

    if (!user) {
      return sendError(
        res,
        'INVALID_CREDENTIALS',
        'Invalid email or password',
        401
      );
    }

    // Verify bcrypt password hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return sendError(
        res,
        'INVALID_CREDENTIALS',
        'Invalid email or password',
        401
      );
    }

    // Verify admin role
    if (user.role !== 'admin') {
      return sendError(
        res,
        'FORBIDDEN',
        'Access denied. Account does not have administrative privileges.',
        403
      );
    }

    // Generate JWT access token (8h expiry)
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRES_IN,
      }
    );

    return sendSuccess(res, {
      token,
      tokenType: 'Bearer',
      expiresIn: config.JWT_EXPIRES_IN,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
});

// GET /api/admin/auth/me — verify active session using adminAuth middleware
router.get('/me', adminAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.id).select('-passwordHash').lean();

    if (!user) {
      return sendError(res, 'USER_NOT_FOUND', 'Admin user not found', 404);
    }

    return sendSuccess(res, { user });
  } catch (error) {
    return next(error);
  }
});

export default router;
