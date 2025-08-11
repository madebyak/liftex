'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout';
import { BackgroundAnimation } from '@/components/common';
import { 
  fadeInUp, 
  staggerContainer, 
  textReveal
} from '@/lib/animations';

export const HeroSection: React.FC = () => {
  const t = useTranslations('blogPage.hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative py-32 lg:py-40 bg-white" 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Container>
        <div className={cn(
          "max-w-4xl mx-auto",
          isRTL ? "text-right" : "text-center"
        )}>
          
          {/* Label with sliding reveal */}
          <motion.p 
            variants={fadeInUp}
            className={cn(
              "text-sm font-medium text-gray-600 tracking-wider uppercase mb-8",
              isRTL ? "font-arabic" : "font-inter"
            )}
          >
            {t('label')}
          </motion.p>

          {/* Main headline with dramatic text reveal */}
          <div className="overflow-hidden mb-8">
            <motion.h1 
              variants={textReveal}
              className={cn(
                "text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-black leading-tight",
                isRTL ? "font-arabic" : "font-inter"
              )}
            >
              {t('headline')}
            </motion.h1>
          </div>

          {/* Subline with elegant fade */}
          <motion.div 
            variants={fadeInUp}
            className={cn(
              "text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12",
              isRTL ? "font-arabic text-right" : "font-inter text-center"
            )}
          >
            {t('subline').split('\n\n').map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-6" : ""}>
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Animated decorative elements */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-6"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="h-px bg-black"
            />
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1, delay: 1.5, type: "spring" }}
              className="w-3 h-3 bg-black rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="h-px bg-black"
            />
          </motion.div>

        </div>
      </Container>

      {/* Floating elements for visual interest */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute top-1/4 left-10 hidden lg:block"
      >
        <motion.div
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="w-2 h-2 bg-gray-300 rounded-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className={cn(
          "absolute top-1/3 hidden lg:block",
          isRTL ? "left-10" : "right-10"
        )}
      >
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-1 h-1 bg-gray-400 rounded-full"
        />
      </motion.div>

      {/* Animated Background Elements */}
      <BackgroundAnimation />

    </motion.section>
  );
}; 