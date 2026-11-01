import React from 'react';
import mothOpen from '../assets/figma/moth-logo.png';
import mothClosed from '../assets/figma/mothfechada-logo.png';

interface AnimatedMothLogoProps {
  isNavOpen?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  className?: string;
}

export const AnimatedMothLogo: React.FC<AnimatedMothLogoProps> = ({
  isNavOpen = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`moth-logo-link moth-logo-wrapper ${isNavOpen ? 'nav-open' : 'nav-closed'} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      aria-label="Moth Home"
      aria-expanded={isNavOpen}
      aria-haspopup="true"
    >
      <span className="moth-stage" aria-hidden="true">
        {/* Open Wings Frame */}
        <img
          src={mothOpen}
          alt="Moth Logo Asas Abertas"
          className="moth-frame moth-frame-open"
          draggable={false}
        />
        {/* Closed Wings Frame */}
        <img
          src={mothClosed}
          alt="Moth Logo Asas Fechadas"
          className="moth-frame moth-frame-closed"
          draggable={false}
        />
      </span>
    </button>
  );
};
