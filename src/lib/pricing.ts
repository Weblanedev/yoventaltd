export function getUnitPrice(product: {
  price: number;
  discountPercentage?: number;
}): number {
  const d = product.discountPercentage ?? 0;
  return product.price * (1 - d / 100);
}

export function formatUsd(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(n);
}
