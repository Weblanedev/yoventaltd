import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { UserRecord } from '@/types/user';

const FILE = join(process.cwd(), 'data', 'users.json');
const BLOB_KEY = 'user-records';
const BLOB_STORE = 'yoventa-auth';

function shouldUseNetlifyBlobs(): boolean {
  return (
    process.env.NETLIFY === 'true' ||
    Boolean(process.env.NETLIFY_BLOBS_READ_WRITE_TOKEN)
  );
}

let memory: UserRecord[] | null = null;
let init: Promise<void> | null = null;
let opChain: Promise<unknown> = Promise.resolve();

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const p = opChain.then(fn, fn) as Promise<T>;
  opChain = p.then(
    () => undefined,
    () => undefined,
  );
  return p;
}

async function readBlobUsers(): Promise<UserRecord[] | null> {
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore(BLOB_STORE);
    const j = await store.get(BLOB_KEY, { type: 'json' });
    return Array.isArray(j) ? (j as UserRecord[]) : null;
  } catch {
    return null;
  }
}

async function readFileUsers(): Promise<UserRecord[]> {
  const raw = await readFile(FILE, 'utf8');
  return JSON.parse(raw) as UserRecord[];
}

async function loadUnlocked(): Promise<void> {
  if (shouldUseNetlifyBlobs()) {
    const blob = await readBlobUsers();
    if (blob) {
      memory = blob;
      return;
    }
    try {
      memory = await readFileUsers();
    } catch {
      memory = [];
    }
    return;
  }
  try {
    memory = await readFileUsers();
  } catch {
    memory = [];
  }
}

async function ensureLoad(): Promise<void> {
  if (memory) return;
  if (!init) {
    init = loadUnlocked();
  }
  await init;
}

async function persistUnlocked(users: UserRecord[]) {
  memory = users;
  if (shouldUseNetlifyBlobs()) {
    try {
      const { getStore } = await import('@netlify/blobs');
      const store = getStore(BLOB_STORE);
      await store.setJSON(BLOB_KEY, users);
      return;
    } catch {
      // Fall back to file when Blobs is not configured
    }
  }
  await mkdir(join(process.cwd(), 'data'), { recursive: true });
  await writeFile(FILE, JSON.stringify(users, null, 2), 'utf8');
}

export async function findByEmail(
  email: string,
): Promise<UserRecord | undefined> {
  return enqueue(async () => {
    await ensureLoad();
    return memory!.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
  });
}

export async function findById(id: string): Promise<UserRecord | undefined> {
  return enqueue(async () => {
    await ensureLoad();
    return memory!.find((u) => u.id === id);
  });
}

export async function add(user: UserRecord): Promise<void> {
  return enqueue(async () => {
    await ensureLoad();
    memory!.push(user);
    await persistUnlocked([...memory!]);
  });
}

export async function update(
  id: string,
  patch: Partial<UserRecord>,
): Promise<UserRecord | null> {
  return enqueue(async () => {
    await ensureLoad();
    const i = memory!.findIndex((u) => u.id === id);
    if (i < 0) return null;
    memory![i] = { ...memory![i], ...patch };
    await persistUnlocked([...memory!]);
    return memory![i];
  });
}
