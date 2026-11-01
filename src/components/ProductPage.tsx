import React, { useState } from 'react';
import { Footer } from './Footer';
import pdpHero from '../assets/figma/pdp-hero.png';
import pdpGallery1 from '../assets/figma/pdp-gallery-1.png';
import pdpFlatBack from '../assets/figma/pdp-flat-back.png';
import pdpDetailChest from '../assets/figma/pdp-detail-chest.png';
import heroGym from '../assets/figma/hero-gym.png';
import prodTshirt from '../assets/figma/prod-tshirt.png';
import arrowDown from '../assets/figma/arrow-down.png';

// Recommendations
import recBlack from '../assets/figma/rec-black.png';
import recWhite from '../assets/figma/rec-white.png';
import recMauve from '../assets/figma/rec-mauve.png';
import recTan from '../assets/figma/rec-tan.png';
import recBrown from '../assets/figma/rec-brown.png';

import type { Product } from '../types';

interface ProductPageProps {
  onBackToHome: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  onBackToHome,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Sea Foam');
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Sea Foam', 'Washed Black', 'Vintage White'];

  const currentProduct: Product = {
    id: 'prod-4',
    name: "Pros de l'internet T-Shirt",
    price: 30.0,
    currency: 'USD',
    priceFormatted: '$30.00 USD',
    image: pdpHero,
    category: 'apparel',
    description: `Sea foam T-Shirt 100% cotton. "Pros de l'internet" graphic printed at back and Locomotive glyph printed at front pocket. Made in Los Angeles.`,
  };

  const recommendations = [
    { id: 'rec-1', name: 'Leather Bomber Jacket', price: '$180.00 USD', image: recBlack },
    { id: 'rec-2', name: 'Waffle Long Sleeve', price: '$45.00 USD', image: recWhite },
    { id: 'rec-3', name: 'Washed Rose T-Shirt', price: '$30.00 USD', image: recMauve },
    { id: 'rec-4', name: 'Sand Oversized Crewneck', price: '$65.00 USD', image: recTan },
    { id: 'rec-5', name: 'Espresso Fleece Pullover', price: '$70.00 USD', image: recBrown },
  ];

  return (
    <div className="product-page-container" data-node-id="19:3">
      {/* Navigation Breadcrumb */}
      <div className="pdp-top-nav">
        <button 
          type="button" 
          className="pdp-back-btn" 
          onClick={onBackToHome}
          aria-label="Voltar para a página inicial"
        >
          ← Voltar para o catálogo
        </button>
      </div>

      {/* Main PDP Section: Hero Split */}
      <section className="pdp-hero-grid">
        {/* Left Column: Big Editorial Hero Image & Description */}
        <div className="pdp-left-col">
          <div 
            className="pdp-main-image-wrap" 
            data-node-id="21:3"
            data-product-hover="true"
          >
            <img 
              src={pdpHero} 
              alt="Pros de l'internet T-Shirt Back Fit" 
              className="pdp-main-image"
            />
          </div>

          <p className="pdp-description-text" data-node-id="21:18">
            Sea foam T-Shirt 100% cotton. &quot;Pros de l&apos;internet&quot; graphic printed at back and Locomotive glyph printed at front pocket. Made in Los Angeles.
          </p>
        </div>

        {/* Right Column: Title, Price, Color, Size & Add to card */}
        <div className="pdp-right-col">
          <h1 className="pdp-product-title" data-node-id="21:7">
            Pros de l&apos;internet<br />T-Shirt
          </h1>

          <p className="pdp-product-price" data-node-id="22:41">
            $30.00 USD
          </p>

          {/* Color Selector */}
          <div className="pdp-color-picker-wrap">
            <button
              type="button"
              className="pdp-color-picker-btn"
              onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
              data-node-id="21:34"
            >
              <span>Color: {selectedColor}</span>
              <img 
                src={arrowDown} 
                alt="Dropdown arrow" 
                className="pdp-dropdown-arrow" 
                data-node-id="22:43"
              />
            </button>

            {isColorDropdownOpen && (
              <div className="pdp-color-dropdown">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`pdp-color-opt ${selectedColor === c ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedColor(c);
                      setIsColorDropdownOpen(false);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Size Selectors (S, M, L, XL) */}
          <div className="pdp-sizes-container">
            {sizes.map((s) => {
              const isSelected = selectedSize === s;
              return (
                <button
                  key={s}
                  type="button"
                  className={`pdp-size-box ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(s)}
                  data-node-id={s === 'M' ? '21:10' : s === 'S' ? '22:44' : s === 'L' ? '22:45' : '22:47'}
                  aria-pressed={isSelected}
                >
                  <span className="pdp-size-label">{s}</span>
                </button>
              );
            })}
          </div>

          {/* Add to card button */}
          <button
            type="button"
            className="pdp-add-to-card-btn"
            onClick={() => onAddToCart(currentProduct, selectedSize, selectedColor)}
            data-node-id="21:8"
            aria-label="Adicionar à sacola"
          >
            <span className="pdp-add-label" data-node-id="21:17">Add to card</span>
          </button>
        </div>
      </section>

      {/* Lookbook Gallery / Editorial Grid */}
      <section className="pdp-lookbook-section" aria-label="Galeria de Detalhes">
        <div className="pdp-lookbook-row-1">
          <div 
            className="pdp-gallery-item pdp-gallery-small" 
            data-node-id="21:20"
            data-product-hover="true"
          >
            <img src={pdpGallery1} alt="Moth Editorial" />
          </div>

          <div 
            className="pdp-gallery-item pdp-gallery-flat" 
            data-node-id="21:24"
            data-product-hover="true"
          >
            <img src={pdpFlatBack} alt="T-Shirt Graphic Back Flat Lay" />
          </div>

          <div 
            className="pdp-gallery-item pdp-gallery-gym" 
            data-node-id="21:27"
            data-product-hover="true"
          >
            <img src={prodTshirt} alt="Gym Models Back" />
          </div>
        </div>

        {/* Center Detail Pocket */}
        <div className="pdp-lookbook-center-row">
          <div 
            className="pdp-gallery-item pdp-gallery-pocket" 
            data-node-id="21:32"
            data-product-hover="true"
          >
            <img src={pdpDetailChest} alt="Locomotive Glyphs Chest Pocket Detail" />
          </div>
        </div>

        {/* Lower Row */}
        <div className="pdp-lookbook-row-2">
          <div 
            className="pdp-gallery-item pdp-gallery-duo" 
            data-node-id="21:29"
            data-product-hover="true"
          >
            <img src={heroGym} alt="Two models in gym" />
          </div>

          <div 
            className="pdp-gallery-item pdp-gallery-flat-front" 
            data-node-id="21:30"
            data-product-hover="true"
          >
            <img src={pdpFlatBack} alt="T-Shirt Flat Lay Front" />
          </div>
        </div>
      </section>

      {/* "See More" Section */}
      <section className="pdp-see-more-section" aria-label="Recomendações See More">
        <h2 className="pdp-see-more-title" data-node-id="32:2">
          See More
        </h2>

        <div className="pdp-see-more-grid">
          {recommendations.map((item, idx) => (
            <div 
              key={item.id} 
              className="see-more-card" 
              data-node-id={idx === 0 ? '24:75' : idx === 1 ? '24:72' : idx === 2 ? '24:60' : idx === 3 ? '24:66' : '24:63'}
              data-product-hover="true"
            >
              <div className="see-more-img-box">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="see-more-info">
                <h3 className="see-more-name">{item.name}</h3>
                <p className="see-more-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Streetwear Footer (From Figma Node 19:3) */}
      <Footer />
    </div>
  );
};

