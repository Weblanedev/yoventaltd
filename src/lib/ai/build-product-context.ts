import { PRODUCT_CATEGORIES } from '@/lib/categories';
import { formatUsd } from '@/lib/pricing';
import { fetchTopFromCategory } from '@/lib/dummyjson';

/**
 * Build short catalog text for the AI system prompt. Internal; do not show raw feed names to customers.
 */
export async function buildProductContextForAI(): Promise<string> {
  const parts: string[] = [];
  for (const c of PRODUCT_CATEGORIES) {
    const items = await fetchTopFromCategory(
      c.dummyjsonCategorySlug,
      4,
    );
    if (!items.length) continue;
    const lines = items.map(
      (p) =>
        `- ${p.name} (${c.label}) — ${formatUsd(p.salePrice)} · sku ${p.sku}`,
    );
    parts.push(`**${c.label}**\n${lines.join('\n')}`);
  }
  return [
    'You are a helpful product assistant for a store that sells laptops and laptop accessories only. Answer using the following catalog sample when relevant. Prefer concise, professional replies.',
    `Categories we highlight: ${PRODUCT_CATEGORIES.map((c) => c.label).join(', ')}.`,
    'Representative items:',
    parts.join('\n\n'),
  ].join('\n\n');
}
