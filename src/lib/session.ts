import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const COOKIE = 'techvault_session';

function base64Url(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(s: string): Buffer {
  const pad = 4 - (s.length % 4);
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + (pad < 4 ? '='.repeat(pad) : '');
  return Buffer.from(b64, 'base64');
}

export function createSessionToken(
  userId: string,
  secret: string,
  maxAgeMs = 7 * 24 * 60 * 60 * 1000,
): string {
  const exp = Date.now() + maxAgeMs;
  const payload = base64Url(
    Buffer.from(JSON.stringify({ userId, exp }), 'utf8'),
  );
  const sig = createHmac('sha256', secret)
    .update(payload)
    .digest('base64url');
  return `${payload}.${sig}`;
}

export function parseSessionToken(
  token: string | undefined,
  secret: string,
): { userId: string } | null {
  if (!token || !secret) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = createHmac('sha256', secret)
    .update(payload)
    .digest('base64url');
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const json = JSON.parse(base64UrlDecode(payload).toString('utf8')) as {
      userId: string;
      exp: number;
    };
    if (!json.userId || !json.exp || Date.now() > json.exp) return null;
    return { userId: json.userId };
  } catch {
    return null;
  }
}

export function newUserId(): string {
  return base64Url(randomBytes(16));
}

export { COOKIE as SESSION_COOKIE_NAME };
