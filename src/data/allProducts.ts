import type { Product } from '../types';
import { PRODUCTS } from './products';
import {
  TEMPLATE_1_PRODUCT,
  TEMPLATE_2_PRODUCTS,
  TEMPLATE_3_PRODUCTS,
} from './catalogProducts';

export const ALL_PRODUCTS: Product[] = [
  ...PRODUCTS,
  TEMPLATE_1_PRODUCT,
  ...TEMPLATE_2_PRODUCTS,
  ...TEMPLATE_3_PRODUCTS,
];

export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const productPath = (product: Product) => `/product/${slugify(product.name)}`;

export const findProductBySlug = (slug?: string) =>
  ALL_PRODUCTS.find((p) => slugify(p.name) === slug);

