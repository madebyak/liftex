'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal, ParallaxImage } from '@/components/common';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  textReveal,
  imageHover
} from '@/lib/animations';

export const WhoWeAreSection: React.FC = () => {
  const t = useTranslations('aboutPage.whoWeAre');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Split description into paragraphs for better rendering
  const description = t('description');
  const paragraphs = description.split('\n').filter(p => p.trim());

  return (
    <section className="py-20 lg:py-32 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content - Left in LTR, Right in RTL */}
          <ScrollReveal
            direction={isRTL ? "right" : "left"}
            className={cn(
              "space-y-8",
              isRTL ? "lg:order-2 text-right" : "lg:order-1 text-left"
            )}
          >
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
              
              {/* Headline with reveal animation */}
              <div className="overflow-hidden mb-8">
                <motion.h2 
                  variants={textReveal}
                  className={cn(
                    "text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-tight",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {t('headline')}
                </motion.h2>
              </div>

              {/* Description with staggered paragraphs */}
              <div className="space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <motion.p 
                    key={index}
                    variants={fadeInUp}
                    className={cn(
                      "text-lg md:text-xl text-gray-700 leading-relaxed",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Animated accent line */}
              <motion.div
                variants={fadeInUp}
                className="pt-8"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-px bg-black"
                />
              </motion.div>

            </motion.div>
          </ScrollReveal>

          {/* Image - Right in LTR, Left in RTL */}
          <ScrollReveal
            direction={isRTL ? "left" : "right"}
            delay={0.2}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg group",
              isRTL ? "lg:order-1" : "lg:order-2"
            )}
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={imageHover}
              className="relative w-full h-full"
            >
              <ParallaxImage
                src="/imgs/about/image-04.jpg"
                alt={isRTL ? "فريق ليفتكس" : "Liftex team"}
                className="w-full h-full"
                speed={0.3}
                scale={false}
              />
              
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black"
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              className={cn(
                "absolute -bottom-4 bg-black text-white px-6 py-4 rounded-lg shadow-xl",
                isRTL ? "-right-4" : "-left-4"
              )}
            >
              <motion.div
                animate={{ rotate: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "text-sm font-medium",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {isRTL ? "منذ التسعينيات" : "Since 1990s"}
              </motion.div>
            </motion.div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}; 