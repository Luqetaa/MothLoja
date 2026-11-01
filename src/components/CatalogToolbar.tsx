import React, { useState, useRef, useEffect } from 'react';
import iconMenu from '../assets/figma/menu.png';
import { Magnetic } from './Magnetic';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

interface CatalogToolbarProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  activeFilterCount: number;
  onToggleFilter: () => void;
}

export const CatalogToolbar: React.FC<CatalogToolbarProps> = ({
  currentSort,
  onSortChange,
  activeFilterCount,
  onToggleFilter,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSort = (sort: SortOption) => {
    onSortChange(sort);
    setIsSortOpen(false);
  };

  return (
    <div className="catalog-toolbar">
      {/* Left: "Order by +" */}
      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <Magnetic strength={0.2}>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => setIsSortOpen(!isSortOpen)}
            aria-expanded={isSortOpen}
            data-node-id="10:25"
          >
            <span>Order by</span>
            <span className="toolbar-plus" data-node-id="11:27">+</span>
          </button>
        </Magnetic>

        {isSortOpen && (
          <div className="sort-dropdown" role="menu">
            <button
              type="button"
              className={`sort-item ${currentSort === 'default' ? 'active' : ''}`}
              onClick={() => handleSelectSort('default')}
            >
              Padrão / Destaques
            </button>
            <button
              type="button"
              className={`sort-item ${currentSort === 'price-asc' ? 'active' : ''}`}
              onClick={() => handleSelectSort('price-asc')}
            >
              Preço: Menor para Maior
            </button>
            <button
              type="button"
              className={`sort-item ${currentSort === 'price-desc' ? 'active' : ''}`}
              onClick={() => handleSelectSort('price-desc')}
            >
              Preço: Maior para Menor
            </button>
            <button
              type="button"
              className={`sort-item ${currentSort === 'name-asc' ? 'active' : ''}`}
              onClick={() => handleSelectSort('name-asc')}
            >
              Nome: A - Z
            </button>
          </div>
        )}
      </div>

      {/* Right: "[2] Filter" + Hamburger menu icon */}
      <div className="toolbar-right">
        <Magnetic strength={0.25}>
          <button
            type="button"
            className="toolbar-btn"
            onClick={onToggleFilter}
            aria-label="Abrir filtros"
            data-node-id="10:26"
          >
            <span>[{activeFilterCount}] Filter</span>
          </button>
        </Magnetic>

        <Magnetic strength={0.3}>
          <button
            type="button"
            onClick={onToggleFilter}
            aria-label="Menu de filtros"
            data-node-id="11:29"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img src={iconMenu} alt="Filter menu" className="filter-icon-img" />
          </button>
        </Magnetic>
      </div>
    </div>
  );
};
