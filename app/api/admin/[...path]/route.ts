import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_INTERNAL_URL || 'http://127.0.0.1:5000';

async function handleProxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  const token = cookies().get('admin_token')?.value;

  if (!token) {
    const unauthRes = NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'Authentication required. Please log in.' },
      },
      { status: 401 }
    );
    unauthRes.cookies.delete('admin_token');
    return unauthRes;
  }

  const path = params.path.join('/');
  const search = req.nextUrl.search;
  const targetUrl = `${BACKEND_URL}/api/admin/${path}${search}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  const contentType = req.headers.get('content-type');
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  let body: any = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    try {
      body = await req.text();
    } catch {
      // empty body
    }
  }

  try {
    const backendRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    const resContentType = backendRes.headers.get('content-type') || '';

    // Handle CSV or non-JSON file downloads
    if (resContentType.includes('text/csv') || resContentType.includes('application/octet-stream')) {
      const blob = await backendRes.blob();
      const contentDisposition = backendRes.headers.get('content-disposition') || 'attachment';

      return new NextResponse(blob, {
        status: backendRes.status,
        headers: {
          'Content-Type': resContentType,
          'Content-Disposition': contentDisposition,
        },
      });
    }

    // Handle JSON responses
    const data = await backendRes.json();
    const nextRes = NextResponse.json(data, { status: backendRes.status });

    // If backend reports 401/403, purge client session cookie
    if (backendRes.status === 401 || backendRes.status === 403) {
      nextRes.cookies.delete('admin_token');
    }

    return nextRes;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BACKEND_UNREACHABLE',
          message: (error as Error).message || 'Failed to connect to backend server',
        },
      },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
