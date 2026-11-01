import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins once
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Configure ScrollTrigger for maximum performance
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger, useGSAP };

