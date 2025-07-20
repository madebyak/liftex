'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ParallaxImage } from '@/components/common';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  textReveal,
  imageParallax 
} from '@/lib/animations';

export const AboutHeroSection: React.FC = () => {
  const t = useTranslations('aboutPage.hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative w-full h-screen overflow-hidden" 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex h-full">
        
        {/* Image Container - Left in LTR, Right in RTL */}
        <motion.div 
          variants={isRTL ? fadeInRight : fadeInLeft}
          className={cn(
            "relative w-1/2 h-full overflow-hidden",
            isRTL ? "order-2" : "order-1"
          )}
        >
          <div className="relative w-full h-full">
            <ParallaxImage
              src="/imgs/ryunosuke-kikuno-t7SFxN8kLns-unsplash.jpg"
              alt={isRTL ? "مصعد حديث - ليفتكس" : "Modern elevator - Liftex"}
              className="w-full h-full"
              speed={0.3}
              scale={true}
              priority
            />
            
            {/* Overlay gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
            />
          </div>
        </motion.div>

        {/* Content Container - Right in LTR, Left in RTL */}
        <div className={cn(
          "relative w-1/2 h-full flex bg-white",
          isRTL ? "order-1 items-end justify-end" : "order-2 items-end justify-start"
        )}>
          <motion.div 
            variants={staggerContainer}
            className={cn(
              "space-y-6 px-8 lg:px-16 pb-16 max-w-lg",
              isRTL ? "text-right" : "text-left"
            )}
          >
            
            {/* Label with slide up animation */}
            <motion.p 
              variants={fadeInUp}
              className={cn(
                "text-sm font-medium text-gray-600 tracking-wider uppercase",
                isRTL ? "font-arabic" : "font-inter"
              )}
            >
              {t('label')}
            </motion.p>

            {/* Headline with text reveal */}
            <div className="overflow-hidden">
              <motion.h1 
                variants={textReveal}
                className={cn(
                  "text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-medium text-black leading-tight",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {t('headline')}
              </motion.h1>
            </div>

            {/* Animated decorative line */}
            <motion.div
              variants={fadeInUp}
              className="pt-4"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 1, delay: 1 }}
                className="h-px bg-black"
              />
            </motion.div>

          </motion.div>
        </div>

      </div>

      {/* Floating scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center backdrop-blur-sm bg-white/10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

    </motion.section>
  );
}; 