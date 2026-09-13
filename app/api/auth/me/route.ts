import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../../../lib/db';
import { User } from '../../../../server/src/models/User';
import { config } from '../../../../server/src/config/env';

export async function GET() {
  const token = cookies().get('admin_token')?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'No active session' },
      },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    await connectToDatabase();
    const user = await User.findById(decoded.id).select('-passwordHash');

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'FORBIDDEN', message: 'User not found or insufficient privileges' },
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'Session expired or invalid' },
      },
      { status: 401 }
    );
  }
}
