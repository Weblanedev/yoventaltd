import { cookies } from 'next/headers';
import { parseSessionToken, SESSION_COOKIE_NAME } from '@/lib/session';
import { getSessionSecret, isProductionNodeEnv } from '@/lib/env';

export async function getUserIdFromCookies(): Promise<string | null> {
  const secret = getSessionSecret();
  const c = await cookies();
  const token = c.get(SESSION_COOKIE_NAME)?.value;
  const p = parseSessionToken(token, secret);
  return p?.userId ?? null;
}

/**
 * For routes that must reject weak secrets in production (matches Nest SessionAuthGuard).
 */
export async function getUserIdOrConfigError(): Promise<
  | { userId: string; error?: undefined }
  | { userId?: undefined; error: Response }
> {
  const secret = getSessionSecret();
  if (secret === 'dev-insecure' && isProductionNodeEnv()) {
    const { NextResponse } = await import('next/server');
    return {
      error: NextResponse.json(
        { message: 'Server misconfiguration' },
        { status: 401 },
      ),
    };
  }
  const userId = await getUserIdFromCookies();
  if (!userId) {
    const { NextResponse } = await import('next/server');
    return { error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }) };
  }
  return { userId };
}
