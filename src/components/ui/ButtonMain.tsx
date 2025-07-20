'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface ButtonMainProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const ButtonMain: React.FC<ButtonMainProps> = ({
  children,
  href,
  onClick,
  className,
  variant = 'primary'
}) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isHovered, setIsHovered] = useState(false);

  // Arrow SVG Component with RTL flip (smaller size)
  const ArrowIcon = () => (
    <svg 
      width="12" 
      height="12" 
      viewBox="0 0 112.31 112.32" 
      className={cn(
        "transition-transform duration-200",
        isRTL ? "scale-x-[-1]" : ""
      )}
      fill="currentColor"
    >
      <polygon points="5 .24 5 20.29 79.06 19.58 0 98.46 13.86 112.32 18.85 107.32 92.74 33.26 92.03 107.32 112.08 107.32 112.31 0 5 .24"/>
    </svg>
  );

  const buttonVariants = {
    primary: "bg-black text-white",
    secondary: "bg-liftex-light-grey text-black"
  };

  const Component = href ? motion.a : motion.button;
  const linkProps = href ? { href } : {};
  const buttonProps = onClick ? { onClick } : {};

  return (
    <Component
      {...linkProps}
      {...buttonProps}
      className={cn(
        "relative overflow-hidden inline-flex items-center gap-2 px-6 py-4 font-semibold text-sm tracking-wider uppercase",
        buttonVariants[variant],
        isRTL ? "font-arabic flex-row-reverse" : "font-inter",
        className
      )}

      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ 
        borderRadius: isHovered ? "50px" : "6px",
      }}
      whileTap={{ 
        scale: 0.98,
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.83, 0, 0.17, 1]
      }}
    >
      {/* Orange sliding background */}
      <motion.div
        className="absolute inset-0 bg-liftex-orange"
        animate={{ 
          y: isHovered ? "0%" : "100%"
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.83, 0, 0.17, 1]
        }}
      />

      {/* Text with mask effect */}
      <div className="relative overflow-hidden">
        {/* Default text */}
        <motion.span
          className="block relative z-10"
          animate={{ 
            y: isHovered ? "-100%" : "0%"
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.83, 0, 0.17, 1]
          }}
        >
          {children}
        </motion.span>
        
        {/* Duplicate text for slide-up effect */}
        <motion.span
          className="block absolute top-0 left-0 w-full z-10"
          animate={{ 
            y: isHovered ? "0%" : "100%"
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.83, 0, 0.17, 1]
          }}
        >
          {children}
        </motion.span>
      </div>

      {/* Arrow with mask effect */}
      <div className="relative overflow-hidden w-3 h-3">
        {/* Default arrow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          animate={{ 
            y: isHovered ? "-100%" : "0%"
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.83, 0, 0.17, 1]
          }}
        >
          <ArrowIcon />
        </motion.div>
        
        {/* Duplicate arrow for slide-up effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          animate={{ 
            y: isHovered ? "0%" : "100%"
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.83, 0, 0.17, 1]
          }}
        >
          <ArrowIcon />
        </motion.div>
      </div>
    </Component>
  );
}; 