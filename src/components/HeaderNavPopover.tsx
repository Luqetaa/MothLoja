import React, { useState, useEffect } from 'react';
import navMenImg from '../assets/figma/nav-men.jpg';
import navWomenImg from '../assets/figma/nav-women.jpg';

interface HeaderNavPopoverProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: (e?: React.MouseEvent) => void;
  onSelectCategory?: (category: string) => void;
}

export const HeaderNavPopover: React.FC<HeaderNavPopoverProps> = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onSelectCategory,
}) => {
  const [activeTab, setActiveTab] = useState<'men' | 'women' | null>(null);

  // Reset category selection whenever the popover is closed
  useEffect(() => {
    if (!isOpen) {
      setActiveTab(null);
    }
  }, [isOpen]);

  const handlePopoverMouseLeave = (e: React.MouseEvent) => {
    setActiveTab(null);
    const related = e.relatedTarget as Node | null;
    const headerCenter = (e.currentTarget as HTMLElement).closest('.header-center');
    if (headerCenter && related && headerCenter.contains(related)) {
      return; // Cursor moved back to the logo button! Keep popover open.
    }
    onMouseLeave(e);
  };

  return (
    <div
      className={`header-nav-popover-wrapper ${isOpen ? 'open' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handlePopoverMouseLeave}
      role="region"
      aria-label="Menu de Categorias Moth"
    >
      {/* Invisible bridge to prevent mouseleave gap between logo and popover */}
      <div className="popover-bridge" />

      <div
        className="header-nav-card"
        onMouseLeave={() => setActiveTab(null)}
      >
        {/* Left Column: Navigation items with active pill highlight */}
        <div
          className="nav-items-col"
          onMouseLeave={() => setActiveTab(null)}
        >
          <button
            type="button"
            className={`nav-item-btn ${activeTab === 'men' ? 'active' : ''}`}
            onMouseEnter={() => setActiveTab('men')}
            onClick={() => onSelectCategory?.('men')}
          >
            <span className="nav-item-title">Men</span>
            <span className="nav-item-subtitle">Clothing, Accessories, shoes.</span>
          </button>

          <button
            type="button"
            className={`nav-item-btn ${activeTab === 'women' ? 'active' : ''}`}
            onMouseEnter={() => setActiveTab('women')}
            onClick={() => onSelectCategory?.('women')}
          >
            <span className="nav-item-title">Women</span>
            <span className="nav-item-subtitle">
              Clothing, Acessories,Dresses, Shoes, Maternity Clothes.
            </span>
          </button>
        </div>

        {/* Right Column: Visual Preview corresponding to active category (hidden if none hovered) */}
        <div className="nav-preview-col">
          <div className="nav-image-container">
            <img
              src={navMenImg}
              alt="Moth Men Streetwear Collection"
              className={`nav-preview-img ${activeTab === 'men' ? 'visible' : ''}`}
            />
            <img
              src={navWomenImg}
              alt="Moth Women Streetwear Collection"
              className={`nav-preview-img ${activeTab === 'women' ? 'visible' : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
