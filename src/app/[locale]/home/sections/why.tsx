'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

export const WhySection: React.FC = () => {
  const t = useTranslations('why');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Split subheading by \n for proper line breaks
  const subheadingLines = t('subheading').split('\n');

  return (
    <section className="bg-black py-16 lg:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <div className="space-y-12">
          
          {/* Header Content - Centered */}
          <div className="text-center space-y-6">
            
            {/* Main Headline */}
            <h2 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight",
              isRTL ? "font-arabic" : "font-inter"
            )}>
              {t('headline')}
            </h2>

            {/* Multi-line Subheading */}
            <div className={cn(
              "space-y-2 text-gray-300 text-2xl md:text-xl leading-tight max-w-4xl mx-auto",
              isRTL ? "font-arabic" : "font-inter"
            )}>
              {subheadingLines.map((line, index) => (
                <p key={index} className="block">
                  {line}
                </p>
              ))}
            </div>

          </div>

          {/* Image Grid */}
          <div className="space-y-6">
            
            {/* Full Width Image */}
            <div className="relative aspect-[21/9] lg:aspect-[32/9] overflow-hidden">
              <Image
                src="/imgs/why-home-top.jpg"
                alt={isRTL ? "صورة ليفتكس الرئيسية" : "Liftex main image"}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>

            {/* Two Column Images */}
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-6",
              isRTL ? "md:grid-flow-dense" : ""
            )}>
              
              {/* First Column Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/imgs/why-home-left.jpg"
                  alt={isRTL ? "صورة مصاعد ليفتكس" : "Liftex elevators image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Second Column Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/imgs/why-home-right.jpg"
                  alt={isRTL ? "صورة تقنيات ليفتكس" : "Liftex technology image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}; 