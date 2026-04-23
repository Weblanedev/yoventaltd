import { NextResponse } from 'next/server';
import { getUserIdOrConfigError } from '@/lib/auth-session';
import { buildProductContextForAI } from '@/lib/ai/build-product-context';

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

export async function POST(req: Request) {
  const session = await getUserIdOrConfigError();
  if (session.error) return session.error;

  let body: { messages?: ChatMessage[]; model?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    return NextResponse.json(
      {
        message:
          'The product assistant is not available until OPENAI_API_KEY is set. Add your OpenAI API key to the project environment, then redeploy. Without a key, the rest of the shop still works.',
      },
      { status: 503 },
    );
  }
  const model = body.model ?? process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
  const catalog = await buildProductContextForAI();
  const system = [
    catalog,
    'If the user asks for medical, legal, or financial advice, decline and point them to a qualified professional. Keep a helpful retail tone.',
  ].join('\n\n');

  const userMessages = (body.messages || [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: m.content }));

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.5,
      messages: [
        { role: 'system' as const, content: system },
        ...userMessages,
      ],
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    return NextResponse.json(
      { error: 'OpenAI request failed', detail: t },
      { status: 502 },
    );
  }
  const json = (await res.json()) as {
    choices: { message: { content: string } }[];
  };
  const text = json.choices?.[0]?.message?.content?.trim() ?? '';
  return NextResponse.json({ reply: text });
}
