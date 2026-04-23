function headersFor(init: RequestInit): HeadersInit {
  if (init.body) {
    return { 'Content-Type': 'application/json', ...init.headers };
  }
  return { ...init.headers };
}

function formatErr(data: {
  message?: string | string[];
  error?: string;
}): string {
  if (Array.isArray(data?.message)) return data.message.join(', ');
  if (typeof data?.message === 'string') return data.message;
  if (data?.error) return String(data.error);
  return 'Request failed';
}

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function api<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(path, {
    credentials: 'include',
    ...init,
    headers: headersFor(init),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const msg = formatErr(data);
    throw new ApiError(
      msg || res.statusText,
      res.status,
      data,
    );
  }
  return data as T;
}
