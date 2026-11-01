import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

export const ProductCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringProduct, setIsHoveringProduct] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = cursorRef.current;
    if (!el) return;

    // Center the element exactly on the cursor using xPercent/yPercent
    gsap.set(el, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(el, 'x', { duration: 0.1, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.1, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        '[data-product-hover], .product-card, .see-more-card, .pdp-gallery-item'
      );
      setIsHoveringProduct(!!target);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`product-hover-cursor ${isHoveringProduct ? 'active' : ''}`}
      aria-hidden="true"
    >
      Click
    </div>
  );
};
