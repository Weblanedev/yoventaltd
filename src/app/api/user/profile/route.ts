import { NextResponse } from 'next/server';
import { getUserIdOrConfigError } from '@/lib/auth-session';
import * as users from '@/lib/users-storage';
import type { PublicUser, UserRecord } from '@/types/user';

function toPublic(u: UserRecord): PublicUser {
  const { passwordHash, ...rest } = u;
  void passwordHash;
  return rest;
}

export async function PATCH(req: Request) {
  const session = await getUserIdOrConfigError();
  if (session.error) return session.error;
  const { userId } = session;

  let body: { name?: string; profile?: UserRecord['profile'] };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const current = await users.findById(userId);
  if (!current) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }
  const nextProfile = { ...current.profile, ...body.profile };
  const name =
    body.name?.trim() && body.name.trim().length > 0
      ? body.name.trim()
      : current.name;
  const updated = await users.update(userId, {
    name,
    profile: nextProfile,
  });
  if (!updated) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }
  return NextResponse.json({ user: toPublic(updated) });
}
