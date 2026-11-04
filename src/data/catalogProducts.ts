import type { Product } from '../types';
import t1a from '../assets/catalog/template1-1.jpg';
import t1b from '../assets/catalog/template1-2.jpg';
import t2a from '../assets/catalog/template2-1.png';
import t2b from '../assets/catalog/template2-2.png';
import t2c from '../assets/catalog/template2-3.png';
import t2d from '../assets/catalog/template2-4.png';
import t3a from '../assets/catalog/template3-1.jpg';
import t3b from '../assets/catalog/template3-2.jpg';
import t3c from '../assets/catalog/template3-3.jpg';

const make = (
  id: string,
  name: string,
  price: number,
  images: string[],
  description: string,
): Product => ({
  id,
  name,
  price,
  currency: 'USD',
  priceFormatted: `$${price.toFixed(2)} USD`,
  image: images[0],
  images,
  category: 'apparel',
  description,
});

/* Template 1: two large images of the same product */
export const TEMPLATE_1_PRODUCT = make(
  'tpl1-1',
  'Navy Essential T-Shirt',
  30,
  [t1a, t1b],
  'Navy short sleeve T-Shirt in soft cotton jersey with a regular fit and a clean crew neck.',
);

/* Template 2: carousel of similar products */
export const TEMPLATE_2_PRODUCTS: Product[] = [
  make('tpl2-1', 'Black Essential T-Shirt', 30, [t2a], 'Black cotton T-Shirt with a relaxed fit and a ribbed crew neck.'),
  make('tpl2-2', 'White Essential T-Shirt', 30, [t2b], 'White cotton T-Shirt with a relaxed fit and a ribbed crew neck.'),
  make('tpl2-3', 'Black Striped T-Shirt', 35, [t2c], 'Boxy fit T-Shirt in black with thin tan stripes.'),
  make('tpl2-4', 'Ecru Striped T-Shirt', 35, [t2d], 'Relaxed T-Shirt in ecru with thin black stripes.'),
];

/* Template 3: three different products */
export const TEMPLATE_3_PRODUCTS: Product[] = [
  make('tpl3-1', 'Washed Black Chest Print T-Shirt', 40, [t3a], 'Oversized washed black T-Shirt with a small white chest print.'),
  make('tpl3-2', 'Affirmation Back Print T-Shirt', 45, [t3b], 'Oversized white T-Shirt with a large patch-style graphic printed at the back.'),
  make('tpl3-3', 'Off-White Boxy T-Shirt', 35, [t3c], 'Boxy off-white T-Shirt in heavy cotton with a dropped shoulder.'),
];

