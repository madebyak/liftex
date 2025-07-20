'use client';

import React from 'react';
import { useLenis } from '@/hooks/useLenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenis = useLenis();

  // Make Lenis instance globally available for utility functions
  React.useEffect(() => {
    if (lenis) {
      window.__lenis = lenis;
    }
    
    return () => {
      window.__lenis = undefined;
    };
  }, [lenis]);

  return <>{children}</>;
} 