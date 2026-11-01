import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.35,
}) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = magneticRef.current;
    if (!el) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    let rect: DOMRect | null = null;

    const handleMouseEnter = () => {
      // Cache bounds once on enter to avoid forced reflows/layout thrashing on mousemove
      rect = el.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      xTo(deltaX);
      yTo(deltaY);
    };

    const handleMouseLeave = () => {
      rect = null;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      });
    };

    el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: magneticRef });

  return (
    <div ref={magneticRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
};
