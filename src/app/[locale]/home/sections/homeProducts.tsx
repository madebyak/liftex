'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

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
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  category,
  imageLeft,
  isRTL
}) => {
  // For RTL: flip the imageLeft logic to create mirror effect
  const shouldImageBeLeft = isRTL ? !imageLeft : imageLeft;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center" dir="ltr">
      
      {/* Conditionally render Image first or Content first */}
      {shouldImageBeLeft ? (
        <>
          {/* Image Column - First */}
          <div className="relative aspect-[4/3] lg:w-1/2 flex-shrink-0 overflow-hidden">
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content Column - Second */}
          <div className={cn(
            "lg:w-1/2 space-y-6",
            isRTL ? "text-right" : "text-left"
          )} dir={isRTL ? 'rtl' : 'ltr'}>
            
            {/* Category Title */}
            <h3 className={cn(
              "text-2xl md:text-3xl font-bold text-black leading-tight",
              isRTL ? "font-arabic" : "font-inter"
            )}>
              {category.title}
            </h3>

            {/* Products or Description */}
            {category.products ? (
              <div className="space-y-4">
                {category.products.map((product: Product, index: number) => (
                  <div key={index} className="space-y-2">
                    <h4 className={cn(
                      "text-lg font-semibold text-black",
                      isRTL ? "font-arabic" : "font-inter"
                    )}>
                      • {product.title}
                    </h4>
                    <p className={cn(
                      "text-gray-700 leading-relaxed",
                      isRTL ? "font-arabic mr-4" : "font-inter ml-4"
                    )}>
                      {product.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={cn(
                "text-lg text-gray-700 leading-relaxed",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {category.description}
              </p>
            )}

          </div>
        </>
      ) : (
        <>
          {/* Content Column - First */}
          <div className={cn(
            "lg:w-1/2 space-y-6",
            isRTL ? "text-right" : "text-left"
          )} dir={isRTL ? 'rtl' : 'ltr'}>
            
            {/* Category Title */}
            <h3 className={cn(
              "text-2xl md:text-3xl font-bold text-black leading-tight",
              isRTL ? "font-arabic" : "font-inter"
            )}>
              {category.title}
            </h3>

            {/* Products or Description */}
            {category.products ? (
              <div className="space-y-4">
                {category.products.map((product: Product, index: number) => (
                  <div key={index} className="space-y-2">
                    <h4 className={cn(
                      "text-lg font-semibold text-black",
                      isRTL ? "font-arabic" : "font-inter"
                    )}>
                      • {product.title}
                    </h4>
                    <p className={cn(
                      "text-gray-700 leading-relaxed",
                      isRTL ? "font-arabic mr-4" : "font-inter ml-4"
                    )}>
                      {product.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={cn(
                "text-lg text-gray-700 leading-relaxed",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {category.description}
              </p>
            )}

          </div>

          {/* Image Column - Second */}
          <div className="relative aspect-[4/3] lg:w-1/2 flex-shrink-0 overflow-hidden">
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </>
      )}
      
    </div>
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
          <div className={cn(
            "space-y-6 max-w-4xl",
            isRTL ? "text-right ml-auto" : "text-left"
          )} dir={isRTL ? 'rtl' : 'ltr'}>
              
              {/* Small Title */}
              <p className={cn(
                "text-sm font-medium text-gray-600 tracking-wider uppercase",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('title')}
              </p>

              {/* Main Headline */}
              <h2 className={cn(
                "text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('headline')}
              </h2>

              {/* Multi-paragraph Subheading */}
              <div className={cn(
                "space-y-4 text-xl md:text-2xl text-gray-700 leading-relaxed",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {subheadingParagraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>

          </div>

          {/* Category Showcases */}
          <div className="space-y-20">
            {categories.map((category: Category, index: number) => (
              <CategoryShowcase
                key={index}
                category={category}
                imageLeft={index % 2 === 0} // Alternating layout
                isRTL={isRTL}
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}; 