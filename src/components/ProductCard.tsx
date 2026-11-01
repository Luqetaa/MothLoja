import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
  nodeIdImage?: string;
  nodeIdText?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  nodeIdImage,
  nodeIdText,
}) => {
  return (
    <article 
      className="product-card" 
      aria-label={product.name}
      data-product-hover="true"
    >
      {/* Product Image Container */}
      <div 
        className="product-image-container" 
        data-node-id={nodeIdImage}
        onClick={() => onSelectProduct?.(product)}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>

      {/* Product Details on Left, Save/Wishlist button on Right */}
      <div className="product-bottom-bar">
        <div 
          className="product-details" 
          data-node-id={nodeIdText}
          onClick={() => onSelectProduct?.(product)}
          style={{ cursor: 'pointer' }}
        >
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">{product.priceFormatted}</p>
        </div>

        <button
          type="button"
          className={`product-save-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? "Remover dos favoritos" : "Salvar produto"}
          aria-label="Salvar produto"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.8" fill={isWishlisted ? "currentColor" : "none"}>
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </article>
  );
};
