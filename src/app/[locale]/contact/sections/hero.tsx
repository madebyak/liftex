'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight,
  staggerContainer, 
  textReveal
} from '@/lib/animations';

export const HeroSection: React.FC = () => {
  const t = useTranslations('contactPage.hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
              className="relative min-h-screen bg-white flex items-center justify-center navbar-spacing" 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Container>
        <div className="text-center max-w-4xl mx-auto py-32">
          
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
                "text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-black leading-tight",
                isRTL ? "font-arabic" : "font-inter"
              )}
            >
              {t('headline')}
            </motion.h1>
          </div>

          {/* Subline with elegant fade */}
          <motion.p 
            variants={fadeInUp}
            className={cn(
              "text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-12",
              isRTL ? "font-arabic text-right" : "font-inter text-center"
            )}
          >
            {t('subline')}
          </motion.p>

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

      {/* Advanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center bg-white/50 backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-black rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

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

    </motion.section>
  );
}; 