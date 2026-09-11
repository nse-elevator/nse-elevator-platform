import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { sendError } from './errorHandler';
import { User, IUser } from '../models/User';

export interface AdminJwtPayload {
  id: string;
  email: string;
  role: string;
}

// Extend Express Request type to include authenticated admin user
declare global {
  namespace Express {
    interface Request {
      user?: AdminJwtPayload;
      adminDoc?: IUser;
    }
  }
}

/**
 * Middleware to authenticate requests for all /api/admin/* endpoints using JWT.
 * Expects header: "Authorization: Bearer <token>"
 */
export async function adminAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const authHeader = req.headers.authorization;
    let token = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.query.token && typeof req.query.token === 'string') {
      token = req.query.token;
    }

    if (!token) {
      return sendError(
        res,
        'AUTH_HEADER_MISSING',
        'Authorization header missing or invalid format. Format must be: Bearer <token>',
        401
      );
    }

    let decoded: AdminJwtPayload;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET) as AdminJwtPayload;
    } catch (jwtErr) {
      const isExpired = (jwtErr as Error).name === 'TokenExpiredError';
      return sendError(
        res,
        isExpired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN',
        isExpired
          ? 'Your admin session has expired. Please log in again.'
          : 'Invalid authentication token. Access denied.',
        401
      );
    }

    // Verify user role
    if (decoded.role !== 'admin') {
      return sendError(
        res,
        'FORBIDDEN',
        'Access forbidden. Admin role privileges required.',
        403
      );
    }

    // Attach decoded user payload to request
    req.user = decoded;

    return next();
  } catch (error) {
    return next(error);
  }
}
