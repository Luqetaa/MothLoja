import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import type { Product } from '../types';
import {
  TEMPLATE_1_PRODUCT,
  TEMPLATE_2_PRODUCTS,
  TEMPLATE_3_PRODUCTS,
} from '../data/catalogProducts';

interface SelectProps {
  onSelectProduct: (product: Product) => void;
}

const ProductText: React.FC<{ product: Product }> = ({ product }) => (
  <div className="tpl-text">
    <h3 className="tpl-title">{product.name}</h3>
    <p className="tpl-price">{product.priceFormatted}</p>
  </div>
);

const ProductImage: React.FC<{ product: Product; index?: number } & SelectProps> = ({
  product,
  index = 0,
  onSelectProduct,
}) => (
  <button
    type="button"
    className="tpl-image"
    data-product-hover="true"
    aria-label={`View ${product.name}`}
    onClick={() => onSelectProduct(product)}
  >
    <img src={product.images?.[index] ?? product.image} alt={product.name} loading="lazy" />
  </button>
);

const TemplateItem: React.FC<{ product: Product } & SelectProps> = ({ product, onSelectProduct }) => (
  <article className="tpl-item">
    <ProductImage product={product} onSelectProduct={onSelectProduct} />
    <ProductText product={product} />
  </article>
);

/* Template 1: duas imagens grandes do mesmo produto (texto uma vez, acima). */
export const TemplateTwoLarge: React.FC<SelectProps> = ({ onSelectProduct }) => (
  <div className="tpl-block tpl-two-large">
    <ProductText product={TEMPLATE_1_PRODUCT} />
    <div className="tpl-two-large-grid">
      {[0, 1].map((i) => (
        <ProductImage key={i} product={TEMPLATE_1_PRODUCT} index={i} onSelectProduct={onSelectProduct} />
      ))}
    </div>
  </div>
);

/* Template 2: carrossel de imagens pequenas de produtos semelhantes. */
export const TemplateCarousel: React.FC<SelectProps> = ({ onSelectProduct }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="tpl-block tpl-carousel">
      <button
        type="button"
        className="tpl-arrow tpl-arrow-prev"
        onClick={() => scrollByPage(-1)}
        aria-label="Previous"
      >
        ‹
      </button>
      <div className="tpl-carousel-track" ref={trackRef}>
        {TEMPLATE_2_PRODUCTS.map((p) => (
          <TemplateItem key={p.id} product={p} onSelectProduct={onSelectProduct} />
        ))}
      </div>
      <button
        type="button"
        className="tpl-arrow tpl-arrow-next"
        onClick={() => scrollByPage(1)}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
};

/* Template 3: três imagens médias de produtos diferentes. */
export const TemplateThreeMedium: React.FC<SelectProps> = ({ onSelectProduct }) => (
  <div className="tpl-block tpl-three-medium">
    {TEMPLATE_3_PRODUCTS.map((p) => (
      <TemplateItem key={p.id} product={p} onSelectProduct={onSelectProduct} />
    ))}
  </div>
);

export const CatalogTemplates: React.FC<SelectProps> = ({ onSelectProduct }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.tpl-block').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          y: 70,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      });
    },
    { scope: ref },
  );

  return (
    <div className="catalog-templates" ref={ref}>
      <TemplateTwoLarge onSelectProduct={onSelectProduct} />
      <TemplateCarousel onSelectProduct={onSelectProduct} />
      <TemplateThreeMedium onSelectProduct={onSelectProduct} />
    </div>
  );
};
