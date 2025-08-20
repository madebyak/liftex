'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerSlow,
  textReveal,
  imageHover,
  scaleInUp
} from '@/lib/animations';

export const WhySection: React.FC = () => {
  const t = useTranslations('why');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Split subheading by \n for proper line breaks
  const subheadingLines = t('subheading').split('\n');

  return (
    <section className="bg-black py-16 lg:py-24 relative overflow-hidden overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Animated background elements */}
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
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white to-transparent rounded-full -translate-x-32 -translate-y-48"
        />
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
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-white to-transparent rounded-full translate-x-20 translate-y-40"
        />
      </div>

      <Container>
        <div className="space-y-12 relative">
          
          {/* Header Content - Centered */}
          <ScrollReveal direction="up" className="text-center space-y-6">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
            >
              
              {/* Main Headline with text reveal */}
              <div className="overflow-hidden">
                <motion.h2 
                  variants={textReveal}
                  className={cn(
                    "text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {t('headline')}
                </motion.h2>
              </div>

              {/* Multi-line Subheading with stagger */}
              <motion.div 
                variants={staggerContainer}
                className={cn(
                  "space-y-2 text-gray-300 text-2xl md:text-xl leading-tight max-w-4xl mx-auto",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {subheadingLines.map((line, index) => (
                  <motion.p 
                    key={index} 
                    variants={fadeInUp}
                    className="block"
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>

            </motion.div>
          </ScrollReveal>

          {/* Image Grid with advanced animations */}
          <ScrollReveal direction="up" delay={0.3} className="space-y-6">
            <motion.div 
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
            >
              
              {/* Full Width Image */}
              <motion.div 
                variants={scaleInUp}
                className="relative aspect-[21/9] lg:aspect-[32/9] overflow-hidden rounded-lg group"
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={imageHover}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/imgs/why-home-top.jpg"
                    alt={isRTL ? "صورة ليفتكس الرئيسية" : "Liftex main image"}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                  
                  {/* Overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-white"
                  />
                </motion.div>

              </motion.div>

              {/* Two Column Images */}
              <motion.div 
                variants={staggerContainer}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-6",
                  isRTL ? "md:grid-flow-dense" : ""
                )}
              >
                
                {/* First Column Image */}
                <motion.div 
                  variants={scaleInUp}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg group"
                >
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={imageHover}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/imgs/why-home-left.jpg"
                      alt={isRTL ? "صورة مصاعد ليفتكس" : "Liftex elevators image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-white"
                    />
                  </motion.div>

                </motion.div>

                {/* Second Column Image */}
                <motion.div 
                  variants={scaleInUp}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg group"
                >
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={imageHover}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/imgs/why-home-right.jpg"
                      alt={isRTL ? "صورة تقنيات ليفتكس" : "Liftex technology image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-white"
                    />
                  </motion.div>

                </motion.div>

              </motion.div>

            </motion.div>
          </ScrollReveal>

        </div>
      </Container>
    </section>
  );
}; 