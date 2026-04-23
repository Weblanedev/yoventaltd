import { NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';
import { createSessionToken } from '@/lib/session';
import { getSessionSecret } from '@/lib/env';
import { applySessionCookie } from '@/lib/session-cookie';
import * as users from '@/lib/users-storage';
import type { PublicUser, UserRecord } from '@/types/user';

function toPublic(u: UserRecord): PublicUser {
  const { passwordHash, ...rest } = u;
  void passwordHash;
  return rest;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  if (!email || !isEmail(email) || !password) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 },
    );
  }
  const user = await users.findByEmail(email);
  if (!user) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 },
    );
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 },
    );
  }
  const token = createSessionToken(user.id, getSessionSecret());
  const res = NextResponse.json({ user: toPublic(user) });
  applySessionCookie(res, token);
  return res;
}
