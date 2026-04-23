import { NextRequest, NextResponse } from 'next/server';
import { isProductCategorySlug } from '@/lib/categories';
import { fetchDummyJsonProducts } from '@/lib/dummyjson';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get('page') || 1) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, Number(searchParams.get('pageSize') || 12) || 12),
  );
  const q = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || undefined;
  if (category && !isProductCategorySlug(category)) {
    return NextResponse.json(
      { message: 'Invalid category', error: 'Bad Request' },
      { status: 400 },
    );
  }
  const data = await fetchDummyJsonProducts({ page, pageSize, q, category });
  return NextResponse.json(data);
}
