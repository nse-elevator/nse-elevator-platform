import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_INTERNAL_URL || 'http://127.0.0.1:5000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok || !result.success || !result.data?.token) {
      return NextResponse.json(result, { status: response.status });
    }

    const token = result.data.token;

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

    // Return user info to client without exposing JWT in response body to client-side scripts
    return NextResponse.json({
      success: true,
      data: {
        user: result.data.user,
        message: 'Authentication successful',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AUTH_SERVER_ERROR',
          message: (error as Error).message || 'Authentication server unreachable',
        },
      },
      { status: 500 }
    );
  }
}
