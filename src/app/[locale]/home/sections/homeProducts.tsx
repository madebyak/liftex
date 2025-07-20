'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
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

interface Product {
  title: string;
  description: string;
}

interface Category {
  title: string;
  image: string;
  description?: string;
  products?: Product[];
}

interface CategoryShowcaseProps {
  category: Category;
  imageLeft: boolean;
  isRTL: boolean;
  index: number;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  category,
  imageLeft,
  isRTL,
  index
}) => {
  // For RTL: flip the imageLeft logic to create mirror effect
  const shouldImageBeLeft = isRTL ? !imageLeft : imageLeft;

  return (
    <ScrollReveal direction="up" delay={index * 0.2} className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
      
      {/* Conditionally render Image first or Content first */}
      {shouldImageBeLeft ? (
        <>
          {/* Image Column - First */}
          <ScrollReveal 
            direction={isRTL ? "right" : "left"} 
            delay={0.1}
            className="relative aspect-[4/3] lg:w-1/2 flex-shrink-0 overflow-hidden"
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={imageHover}
              className="relative w-full h-full rounded-lg overflow-hidden group"
            >
              <ParallaxImage
                src={category.image}
                alt={category.title}
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

              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className={cn(
                  "absolute -bottom-4 bg-white px-6 py-3 rounded-lg shadow-xl",
                  isRTL ? "-right-4" : "-left-4"
                )}
              >
                <span className={cn(
                  "text-sm font-medium text-black",
                  isRTL ? "font-arabic" : "font-inter"
                )}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Content Column - Second */}
          <ScrollReveal 
            direction={isRTL ? "left" : "right"} 
            delay={0.3}
            className={cn(
              "lg:w-1/2 space-y-6",
              isRTL ? "text-right" : "text-left"
            )}
          >
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              
              {/* Category Title with text reveal */}
              <div className="overflow-hidden">
                <motion.h3 
                  variants={textReveal}
                  className={cn(
                    "text-2xl md:text-3xl font-bold text-black leading-tight",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {category.title}
                </motion.h3>
              </div>

              {/* Products or Description */}
              {category.products ? (
                <motion.div 
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {category.products.map((product: Product, productIndex: number) => (
                    <motion.div 
                      key={productIndex} 
                      variants={fadeInUp}
                      className="space-y-2"
                    >
                      <motion.h4 
                        whileHover={{ x: isRTL ? -5 : 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className={cn(
                          "text-lg font-semibold text-black cursor-pointer",
                          isRTL ? "font-arabic" : "font-inter"
                        )}
                      >
                        • {product.title}
                      </motion.h4>
                      <motion.p 
                        variants={fadeInUp}
                        className={cn(
                          "text-gray-700 leading-relaxed",
                          isRTL ? "font-arabic mr-4" : "font-inter ml-4"
                        )}
                      >
                        {product.description}
                      </motion.p>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.p 
                  variants={fadeInUp}
                  className={cn(
                    "text-lg text-gray-700 leading-relaxed",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {category.description}
                </motion.p>
              )}

            </motion.div>
          </ScrollReveal>
        </>
      ) : (
        <>
          {/* Content Column - First */}
          <ScrollReveal 
            direction={isRTL ? "right" : "left"} 
            className={cn(
              "lg:w-1/2 space-y-6",
              isRTL ? "text-right" : "text-left"
            )}
          >
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              
              {/* Category Title with text reveal */}
              <div className="overflow-hidden">
                <motion.h3 
                  variants={textReveal}
                  className={cn(
                    "text-2xl md:text-3xl font-bold text-black leading-tight",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {category.title}
                </motion.h3>
              </div>

              {/* Products or Description */}
              {category.products ? (
                <motion.div 
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {category.products.map((product: Product, productIndex: number) => (
                    <motion.div 
                      key={productIndex} 
                      variants={fadeInUp}
                      className="space-y-2"
                    >
                      <motion.h4 
                        whileHover={{ x: isRTL ? -5 : 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className={cn(
                          "text-lg font-semibold text-black cursor-pointer",
                          isRTL ? "font-arabic" : "font-inter"
                        )}
                      >
                        • {product.title}
                      </motion.h4>
                      <motion.p 
                        variants={fadeInUp}
                        className={cn(
                          "text-gray-700 leading-relaxed",
                          isRTL ? "font-arabic mr-4" : "font-inter ml-4"
                        )}
                      >
                        {product.description}
                      </motion.p>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.p 
                  variants={fadeInUp}
                  className={cn(
                    "text-lg text-gray-700 leading-relaxed",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {category.description}
                </motion.p>
              )}

            </motion.div>
          </ScrollReveal>

          {/* Image Column - Second */}
          <ScrollReveal 
            direction={isRTL ? "left" : "right"} 
            delay={0.3}
            className="relative aspect-[4/3] lg:w-1/2 flex-shrink-0 overflow-hidden"
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={imageHover}
              className="relative w-full h-full rounded-lg overflow-hidden group"
            >
              <ParallaxImage
                src={category.image}
                alt={category.title}
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

              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className={cn(
                  "absolute -bottom-4 bg-white px-6 py-3 rounded-lg shadow-xl",
                  isRTL ? "-left-4" : "-right-4"
                )}
              >
                <span className={cn(
                  "text-sm font-medium text-black",
                  isRTL ? "font-arabic" : "font-inter"
                )}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </>
      )}
      
    </ScrollReveal>
  );
};

export const HomeProductsSection: React.FC = () => {
  const t = useTranslations('homeProducts');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Split subheading by double \n for proper paragraph breaks
  const subheadingParagraphs = t('subheading').split('\n\n');

  // Get categories from translations
  const categories = t.raw('categories') as Category[];

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="space-y-16">
          
          {/* Header Content - Left aligned */}
          <ScrollReveal 
            direction="up" 
            className={cn(
              "space-y-6 max-w-4xl",
              isRTL ? "text-right ml-auto" : "text-left"
            )}
          >
              
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              
              {/* Small Title */}
              <motion.p 
                variants={fadeInUp}
                className={cn(
                  "text-sm font-medium text-gray-600 tracking-wider uppercase",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {t('title')}
              </motion.p>

              {/* Main Headline with text reveal */}
              <div className="overflow-hidden my-6">
                <motion.h2 
                  variants={textReveal}
                  className={cn(
                    "text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {t('headline')}
                </motion.h2>
              </div>

              {/* Multi-paragraph Subheading with stagger */}
              <motion.div 
                variants={staggerContainer}
                className={cn(
                  "space-y-4 text-xl md:text-2xl text-gray-700 leading-relaxed",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {subheadingParagraphs.map((paragraph, index) => (
                  <motion.p 
                    key={index}
                    variants={fadeInUp}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>

            </motion.div>

          </ScrollReveal>

          {/* Category Showcases */}
          <div className="space-y-20">
            {categories.map((category: Category, index: number) => (
              <CategoryShowcase
                key={index}
                category={category}
                imageLeft={index % 2 === 0} // Alternating layout
                isRTL={isRTL}
                index={index}
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}; 