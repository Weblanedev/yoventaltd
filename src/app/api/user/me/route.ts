import { NextResponse } from 'next/server';
import { getUserIdFromCookies } from '@/lib/auth-session';
import * as users from '@/lib/users-storage';
import type { PublicUser, UserRecord } from '@/types/user';

function toPublic(u: UserRecord): PublicUser {
  const { passwordHash, ...rest } = u;
  void passwordHash;
  return rest;
}

export async function GET() {
  const userId = await getUserIdFromCookies();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const u = await users.findById(userId);
  if (!u) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }
  return NextResponse.json({ user: toPublic(u) });
}
