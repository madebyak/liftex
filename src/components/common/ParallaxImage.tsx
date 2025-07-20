'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: boolean;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  speed = 0.5,
  scale = false,
  fill = true,
  sizes,
  priority = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform values based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, scale ? 1.1 : 1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale: scaleValue }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}; 