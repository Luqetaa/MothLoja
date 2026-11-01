import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap, ScrollTrigger } from '../lib/gsap';

function LenisScrollTriggerConnector() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root autoRaf={false} options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <LenisScrollTriggerConnector />
      {children}
    </ReactLenis>
  );
}
