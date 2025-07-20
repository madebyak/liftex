import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  mouseMultiplier?: number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  autoResize?: boolean;
  __experimental__naiveDimensions?: boolean;
}

// Extend window interface to include lenis
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function useLenis(options: LenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Default Lenis configuration optimized for professional websites
    const defaultOptions: LenisOptions = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Disable on touch devices for better mobile performance
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      __experimental__naiveDimensions: false,
      ...options
    };

    // Initialize Lenis
    lenisRef.current = new Lenis(defaultOptions);

    // Animation loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []); // Empty dependency array is correct here as we want to initialize once

  // Return Lenis instance for manual control if needed
  return lenisRef.current;
}

// Utility function to scroll to specific elements or positions
export function scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) {
  if (typeof window === 'undefined') return;
  
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, options);
  }
} 