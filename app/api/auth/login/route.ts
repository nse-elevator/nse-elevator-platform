import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../../../lib/db';
import { User } from '../../../../server/src/models/User';
import { config } from '../../../../server/src/config/env';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Email and password are required',
          },
        },
        { status: 422 }
      );
    }

    // Connect directly to MongoDB Atlas
    await connectToDatabase();

    // Look up user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        },
        { status: 401 }
      );
    }

    // Verify bcrypt password hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        },
        { status: 401 }
      );
    }

    // Verify admin role
    if (user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Access denied. Account does not have administrative privileges.',
          },
        },
        { status: 403 }
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
        expiresIn: (config.JWT_EXPIRES_IN || '8h') as any,
      }
    );

    // Secure cookie only if accessed via HTTPS protocol
    const isHttps = req.nextUrl.protocol === 'https:' || req.headers.get('x-forwarded-proto') === 'https';

    // Set secure httpOnly cookie (8-hour expiry matching JWT)
    cookies().set('admin_token', token, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 60 * 60, // 8 hours in seconds
    });

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: 'Authentication successful',
      },
    });
  } catch (error) {
    console.error('[Admin Login Error]:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTH_SERVER_ERROR',
          message: (error as Error).message || 'Authentication service error',
        },
      },
      { status: 500 }
    );
  }
}
