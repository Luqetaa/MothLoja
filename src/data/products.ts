import type { Product } from '../types';
import imgTote from '../assets/figma/prod-tote.png';
import imgSocks from '../assets/figma/prod-socks.png';
import imgHat from '../assets/figma/prod-hat.png';
import imgTshirt from '../assets/figma/prod-tshirt.png';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Black Oversized Tote Bag',
    price: 30.0,
    currency: 'USD',
    priceFormatted: '$30.00 USD',
    image: imgTote,
    category: 'accessories',
    description: 'Bolsa tote oversized confeccionada em lona pesada de algodão com estampa gráfica minimalista Moth.'
  },
  {
    id: 'prod-2',
    name: 'Cotton Socks',
    price: 20.0,
    currency: 'USD',
    priceFormatted: '$20.00 USD',
    image: imgSocks,
    category: 'accessories',
    description: 'Meias cano médio em algodão premium com bordado emblemático Moth na lateral.'
  },
  {
    id: 'prod-3',
    name: "Pros de l'internet Hat",
    price: 25.0,
    currency: 'USD',
    priceFormatted: '$25.00 USD',
    image: imgHat,
    category: 'headwear',
    description: 'Boné dad hat estruturado em sarja de algodão cru com bordado tonal e regulagem metálica.'
  },
  {
    id: 'prod-4',
    name: "Pros de l'internet T-Shirt",
    price: 30.0,
    currency: 'USD',
    priceFormatted: '$30.00 USD',
    image: imgTshirt,
    category: 'apparel',
    description: 'Camiseta streetwear boxy fit com estampa traseira em serigrafia de alta definição.'
  }
];

