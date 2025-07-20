'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  textReveal
} from '@/lib/animations';

export const MissionLeadershipSection: React.FC = () => {
  const missionT = useTranslations('aboutPage.mission');
  const leadershipT = useTranslations('aboutPage.leadership');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Split descriptions into paragraphs
  const missionDescription = missionT('description');
  const leadershipDescription = leadershipT('description');
  const leadershipParagraphs = leadershipDescription.split('\n').filter(p => p.trim());

  return (
    <section className="py-20 lg:py-32 bg-gray-50 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 lg:px-8">
        
        <div className="relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            
            {/* Mission - Left Column */}
            <ScrollReveal
              direction="left"
              className={cn(
                "space-y-8",
                isRTL ? "text-right" : "text-left"
              )}
            >
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
                
                <div className="overflow-hidden">
                  <motion.h2 
                    variants={textReveal}
                    className={cn(
                      "text-4xl md:text-5xl font-medium text-black leading-tight",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {missionT('headline')}
                  </motion.h2>
                </div>

                <motion.div 
                  variants={fadeInUp}
                  className="h-8"
                ></motion.div> {/* Breathing space */}

                <motion.p 
                  variants={fadeInUp}
                  className={cn(
                    "text-lg md:text-xl text-gray-700 leading-relaxed",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {missionDescription}
                </motion.p>

                {/* Animated accent line */}
                <motion.div
                  variants={fadeInUp}
                  className="pt-8"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 60 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="h-px bg-black"
                  />
                </motion.div>

              </motion.div>
            </ScrollReveal>

            {/* Leadership - Right Column */}
            <ScrollReveal
              direction="right"
              delay={0.2}
              className={cn(
                "space-y-8 relative",
                isRTL ? "text-right" : "text-left"
              )}
            >
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
                
                {/* Thin divider line for mobile */}
                <motion.div 
                  variants={fadeInUp}
                  className="lg:hidden w-12 h-px bg-black mx-auto mb-8"
                ></motion.div>
                
                <div className="overflow-hidden">
                  <motion.h2 
                    variants={textReveal}
                    className={cn(
                      "text-4xl md:text-5xl font-medium text-black leading-tight",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {leadershipT('headline')}
                  </motion.h2>
                </div>

                <motion.div 
                  variants={fadeInUp}
                  className="h-8"
                ></motion.div> {/* Breathing space */}

                <div className="space-y-6">
                  {leadershipParagraphs.map((paragraph, index) => (
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
                    whileInView={{ width: 60 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="h-px bg-black"
                  />
                </motion.div>

              </motion.div>
            </ScrollReveal>

          </div>

          {/* Desktop Divider Line - Animated */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "60%", opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            viewport={{ once: true }}
            className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-px bg-black h-full"></div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}; 