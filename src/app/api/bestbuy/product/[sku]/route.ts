import { NextResponse } from 'next/server';
import { fetchSingleProduct } from '@/lib/dummyjson';

type Ctx = { params: Promise<{ sku: string }> };

export async function GET(_req: Request, context: Ctx) {
  const { sku } = await context.params;
  const p = await fetchSingleProduct(sku);
  if (!p) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }
  return NextResponse.json({ product: p });
}
