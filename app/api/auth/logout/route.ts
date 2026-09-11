import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const isHttps = req.nextUrl.protocol === 'https:' || req.headers.get('x-forwarded-proto') === 'https';

  cookies().set('admin_token', '', {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({
    success: true,
    data: { message: 'Logged out successfully' },
  });
}
