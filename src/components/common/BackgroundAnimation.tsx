'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundAnimationProps {
  count?: number;
  className?: string;
}

export const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ 
  count = 6, 
  className = "" 
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.1, 0],
            scale: [0, 1, 0],
            x: [0, 100, 200],
            y: [0, -50, -100]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
          className="absolute w-4 h-4 bg-black rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};
