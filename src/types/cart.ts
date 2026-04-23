import type { StoreProduct } from '@/lib/store-types';

export type { StoreProduct };

export type LineItem = {
  cartKey: string;
  product: StoreProduct;
  quantity: number;
};
