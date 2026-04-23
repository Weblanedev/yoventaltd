import type { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/session';
import { isProductionNodeEnv } from '@/lib/env';

const maxAge = 7 * 24 * 60 * 60;

export function applySessionCookie(res: NextResponse, token: string) {
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge,
    secure: isProductionNodeEnv(),
  });
}

export function clearSessionOnResponse(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    secure: isProductionNodeEnv(),
  });
}
