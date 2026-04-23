import { NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';
import { createSessionToken, newUserId } from '@/lib/session';
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
  let body: { email?: string; password?: string; name?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  const name = String(body.name || '').trim();
  if (!email || !isEmail(email)) {
    return NextResponse.json(
      { message: ['email must be an email'] },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { message: 'Password must be at least 8 characters' },
      { status: 400 },
    );
  }
  if (name.length < 1) {
    return NextResponse.json({ message: 'name is required' }, { status: 400 });
  }
  const existing = await users.findByEmail(email);
  if (existing) {
    return NextResponse.json(
      { message: 'An account with this email already exists' },
      { status: 409 },
    );
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: UserRecord = {
    id: newUserId(),
    email,
    name,
    passwordHash,
    profile: {},
    createdAt: new Date().toISOString(),
  };
  await users.add(user);
  const token = createSessionToken(user.id, getSessionSecret());
  const res = NextResponse.json({ user: toPublic(user) });
  applySessionCookie(res, token);
  return res;
}
