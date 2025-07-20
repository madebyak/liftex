'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import { ButtonMain } from '@/components/ui';
import { ScrollReveal, ParallaxImage } from '@/components/common';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  textReveal,
  imageHover
} from '@/lib/animations';

export const AboutSection: React.FC = () => {
  const t = useTranslations('about');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="bg-white py-16 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Conditionally render content first or image first based on RTL */}
          {isRTL ? (
            <>
              {/* Content Column - First in RTL */}
              <ScrollReveal
                direction="right"
                className={cn(
                  "space-y-6 lg:w-1/2",
                  "text-right"
                )}
              >
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  dir="rtl"
                >
            
                  {/* Small Title */}
                  <motion.p 
                    variants={fadeInUp}
                    className="text-sm font-medium text-gray-600 tracking-wider uppercase font-arabic text-right"
                  >
                    {t('title')}
                  </motion.p>

                  {/* Headline with text reveal */}
                  <div className="overflow-hidden my-6">
                    <motion.h2 
                      variants={textReveal}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight font-arabic text-right"
                    >
                      {t('headline')}
                    </motion.h2>
                  </div>

                  {/* Description */}
                  <motion.p 
                    variants={fadeInUp}
                    className="text-lg text-gray-700 leading-relaxed font-arabic text-right"
                  >
                    {t('description')}
                  </motion.p>

                  {/* Buttons with stagger */}
                  <motion.div 
                    variants={staggerContainer}
                    className="flex gap-4 pt-4 flex-row-reverse justify-start"
                  >
                    <motion.div variants={fadeInUp}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <ButtonMain href="/services" variant="primary">
                          {t('buttons.services')}
                        </ButtonMain>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div variants={fadeInUp}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <ButtonMain href="/about" variant="secondary">
                          {t('buttons.about')}
                        </ButtonMain>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                </motion.div>
              </ScrollReveal>

              {/* Image Column - Second in RTL */}
              <ScrollReveal direction="left" delay={0.2} className="lg:w-1/2 flex-shrink-0">
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={imageHover}
                  className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-lg group"
                >
                  <ParallaxImage
                    src="/imgs/about-img-01.jpg"
                    alt="صورة عن ليفتكس"
                    className="w-full h-full"
                    speed={0.3}
                    scale={false}
                    priority
                  />
                  
                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black"
                  />
                </motion.div>
              </ScrollReveal>
            </>
          ) : (
            <>
              {/* Image Column - First in LTR */}
              <ScrollReveal direction="left" className="lg:w-1/2 flex-shrink-0">
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={imageHover}
                  className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-lg group"
                >
                  <ParallaxImage
                    src="/imgs/about-img-01.jpg"
                    alt="About Liftex"
                    className="w-full h-full"
                    speed={0.3}
                    scale={false}
                    priority
                  />
                  
                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black"
                  />
                </motion.div>
              </ScrollReveal>

              {/* Content Column - Second in LTR */}
              <ScrollReveal
                direction="right"
                delay={0.2}
                className="space-y-6 lg:w-1/2 text-left"
              >
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  dir="ltr"
                >
                  
                  {/* Small Title */}
                  <motion.p 
                    variants={fadeInUp}
                    className="text-sm font-medium text-gray-600 tracking-wider uppercase font-inter text-left"
                  >
                    {t('title')}
                  </motion.p>

                  {/* Headline with text reveal */}
                  <div className="overflow-hidden my-6">
                    <motion.h2 
                      variants={textReveal}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight font-inter text-left"
                    >
                      {t('headline')}
                    </motion.h2>
                  </div>

                  {/* Description */}
                  <motion.p 
                    variants={fadeInUp}
                    className="text-lg text-gray-700 leading-relaxed font-inter text-left"
                  >
                    {t('description')}
                  </motion.p>

                  {/* Buttons with stagger */}
                  <motion.div 
                    variants={staggerContainer}
                    className="flex gap-4 pt-4 flex-row justify-start"
                  >
                    <motion.div variants={fadeInUp}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <ButtonMain href="/services" variant="primary">
                          {t('buttons.services')}
                        </ButtonMain>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div variants={fadeInUp}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <ButtonMain href="/about" variant="secondary">
                          {t('buttons.about')}
                        </ButtonMain>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                </motion.div>
              </ScrollReveal>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}; 