import React from 'react';
import iconMenu from '../assets/figma/menu.png';
import { Magnetic } from './Magnetic';

interface CatalogToolbarProps {
  activeFilterCount: number;
  onToggleFilter: () => void;
}

export const CatalogToolbar: React.FC<CatalogToolbarProps> = ({
  activeFilterCount,
  onToggleFilter,
}) => {
  return (
    <div className="catalog-toolbar">
      {/* Left: "New drop: " */}
      <div className="toolbar-left">
        <span className="toolbar-label" data-node-id="10:25">
          New drop:{' '}
        </span>
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
