'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  textReveal
} from '@/lib/animations';

export const ServicesHeroSection: React.FC = () => {
  const t = useTranslations('servicesPage.hero');
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
        
        {/* Video Container - Left in LTR, Right in RTL */}
        <motion.div 
          variants={isRTL ? fadeInRight : fadeInLeft}
          className={cn(
            "relative w-1/2 h-full overflow-hidden",
            isRTL ? "order-2" : "order-1"
          )}
        >
          <div className="relative w-full h-full">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/imgs/services/4500897-hd_1080_1440_30fps.mp4" type="video/mp4" />
              {/* Fallback text */}
              Your browser does not support the video tag.
            </video>
            
            {/* Dynamic overlay gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
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
              "space-y-8 px-8 lg:px-16 pb-16 max-w-lg",
              isRTL ? "text-right" : "text-left"
            )}
          >
            
            {/* Label with bouncing animation */}
            <motion.p 
              variants={fadeInUp}
              className={cn(
                "text-sm font-medium text-gray-600 tracking-wider uppercase",
                isRTL ? "font-arabic" : "font-inter"
              )}
            >
              {t('label')}
            </motion.p>

            {/* Headline with cascading text reveal */}
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

            {/* Subline with word-by-word reveal */}
            <motion.p 
              variants={fadeInUp}
              className={cn(
                "text-lg md:text-xl text-gray-700 leading-relaxed",
                isRTL ? "font-arabic" : "font-inter"
              )}
            >
              {t('subline')}
            </motion.p>

            {/* Animated decorative elements */}
            <motion.div
              variants={fadeInUp}
              className="pt-6 flex items-center gap-4"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="h-px bg-black"
              />
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 1, delay: 1.5, type: "spring" }}
                className="w-2 h-2 bg-black rounded-full"
              />
            </motion.div>

          </motion.div>
        </div>

      </div>


      {/* Advanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
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

    </motion.section>
  );
}; 