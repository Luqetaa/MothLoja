import React, { useState, useRef } from 'react';
import { AnimatedMothLogo } from './AnimatedMothLogo';
import { ProgressiveBlur } from './ProgressiveBlur';
import iconSearch from '../assets/figma/search.png';
import iconCart from '../assets/figma/cart.png';
import iconBookmark from '../assets/figma/bookmark.png';
import iconUser from '../assets/figma/user.png';
import { Magnetic } from './Magnetic';
import { HeaderNavPopover } from './HeaderNavPopover';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onLogoClick?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onLogoClick,
  onSelectCategory,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const headerCenterRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsNavOpen(true);
  };

  const handleMouseLeave = (e?: React.MouseEvent) => {
    if (e) {
      const related = e.relatedTarget as Node | null;
      if (headerCenterRef.current && related && headerCenterRef.current.contains(related)) {
        return;
      }
    }
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsNavOpen(false);
    }, 220);
  };

  return (
    <>
      {/* Camada de desfoque progressivo (estilo bencho.dev/finds) */}
      <ProgressiveBlur />

      <header className="site-header" data-node-id="1:3">
        <div className="header-inner">
          {/* Left Side */}
          <div className="header-left" />

          {/* Center: Moth Logo with hover trigger for hidden navbar */}
          <div 
            ref={headerCenterRef}
            className="header-center" 
            data-node-id="10:3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatedMothLogo
              isNavOpen={isNavOpen}
              onClick={onLogoClick}
              onMouseEnter={handleMouseEnter}
              onFocus={handleMouseEnter}
            />

            {/* Hidden Popover Navigation (Emil Kowalski Design Eng pattern) */}
            <HeaderNavPopover
              isOpen={isNavOpen}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onSelectCategory={(cat) => {
                setIsNavOpen(false);
                onSelectCategory?.(cat);
              }}
            />
          </div>

          {/* Right Side: Action Icons with Magnetic physics */}
          <div className="header-actions">
            <Magnetic strength={0.35}>
              <button 
                type="button" 
                className="action-btn" 
                onClick={onOpenSearch} 
                title="Buscar produtos"
                aria-label="Buscar produtos"
                data-node-id="1:64"
              >
                <img src={iconSearch} alt="Search" className="action-icon" />
              </button>
            </Magnetic>

            <Magnetic strength={0.35}>
              <button 
                type="button" 
                className="action-btn" 
                onClick={onOpenCart} 
                title="Sacola de compras"
                aria-label="Sacola de compras"
                data-node-id="1:66"
              >
                <img src={iconCart} alt="Cart" className="action-icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            </Magnetic>

            <Magnetic strength={0.35}>
              <button 
                type="button" 
                className="action-btn" 
                onClick={onOpenWishlist} 
                title="Lista de desejos"
                aria-label="Lista de desejos"
                data-node-id="1:67"
              >
                <img src={iconBookmark} alt="Bookmark" className="action-icon" />
                {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
              </button>
            </Magnetic>

            <Magnetic strength={0.35}>
              <button 
                type="button" 
                className="action-btn" 
                title="Conta do usuário"
                aria-label="Conta do usuário"
                data-node-id="1:65"
              >
                <img src={iconUser} alt="User" className="action-icon" />
              </button>
            </Magnetic>
          </div>
        </div>
      </header>
    </>
  );
};
