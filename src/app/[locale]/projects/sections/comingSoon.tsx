'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { ButtonMain } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  textReveal,
  scaleInUp
} from '@/lib/animations';

export const ComingSoonSection: React.FC = () => {
  const t = useTranslations('projectsPage.comingSoon');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubmitted(false), 4000);
    }
  };

  const features = t.raw('features') as string[];
  const links = t.raw('meanwhile.links') as Record<string, string>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-20 navbar-spacing" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto space-y-12"
        >
          
          {/* Coming Soon Badge */}
          <ScrollReveal direction="up">
            <motion.div
              variants={scaleInUp}
              className="inline-block"
            >
              <span className={cn(
                "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-black text-white tracking-wider uppercase",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('label')}
              </span>
            </motion.div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="overflow-hidden">
              <motion.h1 
                variants={textReveal}
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {t('title')}
              </motion.h1>
            </div>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.4}>
            <motion.p 
              variants={fadeInUp}
              className={cn(
                "text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto",
                isRTL ? "font-arabic" : "font-inter"
              )}
            >
              {t('subtitle')}
            </motion.p>
          </ScrollReveal>

          {/* Features Grid */}
          <ScrollReveal direction="up" delay={0.6}>
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            >
              {features.map((feature: string, index: number) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="w-2 h-2 bg-black rounded-full flex-shrink-0" />
                  <span className={cn(
                    "text-gray-800 font-medium",
                    isRTL ? "font-arabic" : "font-inter"
                  )}>
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>

          {/* Email Notification Section */}
          <ScrollReveal direction="up" delay={0.8}>
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md mx-auto"
            >
              <h3 className={cn(
                "text-xl font-bold text-black mb-2",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('notification.title')}
              </h3>
              <p className={cn(
                "text-gray-600 mb-6",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('notification.description')}
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className={cn(
                    "text-green-600 font-medium",
                    isRTL ? "font-arabic" : "font-inter"
                  )}>
                    {t('notification.success')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('notification.placeholder')}
                      required
                      className={cn(
                        "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full bg-black text-white py-3 px-6 rounded-lg font-medium transition-all hover:bg-gray-800",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {t('notification.button')}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </ScrollReveal>

          {/* Meanwhile Section */}
          <ScrollReveal direction="up" delay={1}>
            <motion.div 
              variants={fadeInUp}
              className="pt-8 border-t border-gray-200"
            >
              <p className={cn(
                "text-gray-600 mb-6",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('meanwhile.title')}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ButtonMain href="/services" variant="primary">
                    {links.services}
                  </ButtonMain>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ButtonMain href="/about" variant="secondary">
                    {links.about}
                  </ButtonMain>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ButtonMain href="/contact" variant="secondary">
                    {links.contact}
                  </ButtonMain>
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.1, 0],
                  scale: [0, 1, 0],
                  x: [0, 100, 200],
                  y: [0, -50, -100]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
                className="absolute w-4 h-4 bg-black rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

        </motion.div>
      </Container>
    </section>
  );
};
