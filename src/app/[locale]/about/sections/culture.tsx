'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerSlow,
  textReveal,
  scaleInUp
} from '@/lib/animations';

export const CultureSection: React.FC = () => {
  const t = useTranslations('aboutPage.culture');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Get the values array from translation
  const values = t.raw('aboutPage.culture.values') as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-20 lg:py-32 bg-black text-white relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-white to-transparent rounded-full -translate-x-36 -translate-y-36"
        ></motion.div>
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white to-transparent rounded-full translate-x-48 translate-y-48"
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative">
        
        {/* Header */}
        <ScrollReveal direction="up" className="mb-16 lg:mb-24">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className={cn(
              "text-center",
              isRTL ? "text-right" : "text-left"
            )}
          >
            
            <div className="overflow-hidden mb-8 lg:mb-12">
              <motion.h2 
                variants={textReveal}
                className={cn(
                  "text-5xl md:text-6xl lg:text-7xl font-medium text-white",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {t('headline')}
              </motion.h2>
            </div>

            <motion.p 
              variants={fadeInUp}
              className={cn(
                "text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto",
                isRTL ? "font-arabic" : "font-inter"
              )}
            >
              {t('intro')}
            </motion.p>

          </motion.div>
        </ScrollReveal>

        {/* Values Grid */}
        <ScrollReveal direction="up" delay={0.3}>
          <motion.div 
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            
            {values.map((value, index) => (
              <motion.div 
                key={index}
                variants={scaleInUp}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className={cn(
                  "group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:border-white/20",
                  isRTL ? "text-right" : "text-left"
                )}
              >
                
                {/* Animated Index Number */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 0.2, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  className={cn(
                    "absolute top-4 text-6xl font-bold text-white",
                    isRTL ? "right-4 font-arabic" : "left-4 font-inter"
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>

                <div className="relative z-10 pt-16">
                  
                  {/* Value Title */}
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
                    className={cn(
                      "text-2xl md:text-3xl font-medium text-white mb-6 leading-tight",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {value.title}
                  </motion.h3>

                  {/* Value Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.9, duration: 0.6 }}
                    className={cn(
                      "text-lg text-gray-300 leading-relaxed",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {value.description}
                  </motion.p>

                </div>

                {/* Subtle gradient overlay on hover */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 rounded-xl"
                ></motion.div>

                {/* Animated border effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 border border-white/30 rounded-xl"
                />

              </motion.div>
            ))}

          </motion.div>
        </ScrollReveal>

        {/* Bottom decorative line with animation */}
        <ScrollReveal direction="up" delay={0.8}>
          <motion.div 
            className="mt-20 lg:mt-32 flex justify-center"
          >
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-px bg-gradient-to-r from-transparent via-white to-transparent"
            ></motion.div>
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  );
}; 