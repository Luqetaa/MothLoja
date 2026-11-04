export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  priceFormatted: string;
  image: string;
  images?: string[];
  category: 'accessories' | 'apparel' | 'headwear';
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

