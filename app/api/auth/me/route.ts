import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_INTERNAL_URL || 'http://127.0.0.1:5000';

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
    const res = await fetch(`${BACKEND_URL}/api/admin/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'Failed to verify session' },
      },
      { status: 500 }
    );
  }
}
