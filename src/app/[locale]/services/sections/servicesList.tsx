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
  imageHover,
  scaleInUp
} from '@/lib/animations';

export const ServicesListSection: React.FC = () => {
  const t = useTranslations('servicesPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Get services data
  const services = [
    {
      title: t('services.installation.title'),
      description: t('services.installation.description'),
      image: '/imgs/about/Commercial-glass-elevator-e1589738199508.jpg.webp',
      number: '01'
    },
    {
      title: t('services.modernisation.title'),
      description: t('services.modernisation.description'),
      image: '/imgs/luxury-lift.png',
      number: '02'
    },
    {
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      image: '/imgs/maintaince-01.jpg',
      number: '03'
    }
  ];

  return (
    <section className="py-20 lg:py-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 lg:px-8">
        
        <div className="space-y-32 lg:space-y-40">
          {services.map((service, index) => (
            <ScrollReveal 
              key={index} 
              direction="up" 
              delay={index * 0.2}
              className="group"
            >
              
              {/* Alternating Layout */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                )}
              >
                
                {/* Content Side */}
                <motion.div 
                  variants={fadeInLeft}
                  className={cn(
                    "space-y-8",
                    isRTL ? "text-right" : "text-left",
                    index % 2 === 1 && !isRTL ? "lg:order-2" : "",
                    index % 2 === 1 && isRTL ? "lg:order-1" : ""
                  )}
                >
                  
                  {/* Service Number with animation */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <span className={cn(
                      "text-8xl md:text-9xl font-bold text-gray-100 leading-none",
                      isRTL ? "font-arabic" : "font-inter"
                    )}>
                      {service.number}
                    </span>
                  </motion.div>

                  {/* Service Title with stagger */}
                  <motion.div 
                    variants={staggerContainer}
                    className="space-y-2"
                  >
                    <motion.h3 
                      variants={fadeInUp}
                      className={cn(
                        "text-lg md:text-xl font-medium text-white tracking-wider uppercase",
                        isRTL ? "font-arabic" : "font-inter"
                      )}
                    >
                      {service.title}
                    </motion.h3>
                    

                  </motion.div>

                  {/* Service Description */}
                  <motion.p 
                    variants={fadeInUp}
                    className={cn(
                      "text-lg md:text-xl text-white/61 leading-relaxed max-w-lg",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {service.description}
                  </motion.p>

                  {/* Animated Decorative Line */}
                  <motion.div
                    variants={fadeInUp}
                    className="pt-8"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 80 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="h-px bg-black"
                    />
                  </motion.div>

                </motion.div>

                {/* Image Side */}
                <motion.div 
                  variants={fadeInRight}
                  className={cn(
                    "relative",
                    index % 2 === 1 && !isRTL ? "lg:order-1" : "",
                    index % 2 === 1 && isRTL ? "lg:order-2" : ""
                  )}
                >
                  
                  {/* Main Image Container with advanced hover effects */}
                  <motion.div 
                    initial="rest"
                    whileHover="hover"
                    variants={imageHover}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg group"
                  >
                    <ParallaxImage
                      src={service.image}
                      alt={`${service.title} - Liftex`}
                      className="w-full h-full"
                      speed={0.3}
                      scale={false}
                    />
                    
                    {/* Dynamic overlay with pulse effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"
                    />

                    {/* Service number overlay on hover */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className={cn(
                        "text-6xl font-bold text-white",
                        isRTL ? "font-arabic" : "font-inter"
                      )}>
                        {service.number}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Floating Badge with bounce animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className={cn(
                      "absolute -top-6 bg-black text-white px-6 py-3 rounded-lg shadow-xl",
                      isRTL ? "-right-6" : "-left-6"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-medium tracking-wider",
                      isRTL ? "font-arabic" : "font-inter"
                    )}>
                      {service.title.toUpperCase()}
                    </span>
                  </motion.div>

                  {/* Animated progress indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={cn(
                      "absolute bottom-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg",
                      isRTL ? "-left-4" : "-right-4"
                    )}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 1 }}
                      viewport={{ once: true }}
                      className="h-1 bg-black rounded-full"
                    />
                  </motion.div>

                </motion.div>

              </motion.div>

              {/* Animated Bottom Border Line */}
              {index < services.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  viewport={{ once: true }}
                  className="mt-32 lg:mt-40"
                >
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent origin-center"></div>
                </motion.div>
              )}

            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}; 