'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { viewportConfig } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: Variants;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  distance?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation,
  delay = 0,
  duration = 0.8,
  className = '',
  direction = 'up',
  distance = 60,
  once = true,
}) => {
  // Default animations based on direction
  const getDefaultAnimation = (dir: string): Variants => {
    const baseTransition = {
      duration,
      delay,
      ease: 'easeOut' as const,
    };

    switch (dir) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0, transition: baseTransition },
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0, transition: baseTransition },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: baseTransition },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        };
    }
  };

  const animationVariants = animation || getDefaultAnimation(direction);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportConfig, once }}
      variants={animationVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 