'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout';
import { ScrollReveal } from '@/components/common';
import { ButtonMain } from '@/components/ui';
import { 
  fadeInUp, 
  staggerContainer, 
  textReveal
} from '@/lib/animations';

export const BuildSection: React.FC = () => {
  const t = useTranslations('contactPage.buildSection');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="py-20 lg:py-32 bg-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <ScrollReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-4xl mx-auto"
          >
            
            {/* Build Smarter Headline */}
            <div className="overflow-hidden mb-8">
              <motion.h2 
                variants={textReveal}
                className={cn(
                  "text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-black leading-tight",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {t('headline')}
              </motion.h2>
            </div>

            {/* Subline */}
            <motion.p 
              variants={fadeInUp}
              className={cn(
                "text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-12",
                isRTL ? "font-arabic" : "font-inter"
              )}
            >
              {t('subline')}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={fadeInUp}
              className="mb-16"
            >
              <ButtonMain
                href="/services"
                className={cn(
                  "inline-flex items-center justify-center px-8 py-4 text-lg",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {t('cta')}
              </ButtonMain>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-8"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-px bg-gray-400"
              />
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 360 }}
                transition={{ duration: 1, delay: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 100 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-px bg-gray-400"
              />
            </motion.div>

          </motion.div>
        </ScrollReveal>
      </Container>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-96 h-96 border border-gray-300 rounded-full"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 border border-gray-300 rounded-full"
          />
        </motion.div>
      </div>

    </section>
  );
}; 