'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';
import { ButtonMain } from '@/components/ui';

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
              <div className={cn(
                "space-y-6 lg:w-1/2",
                "text-right"
              )}
              dir="rtl">
            
                {/* Small Title */}
                <p className="text-sm font-medium text-gray-600 tracking-wider uppercase font-arabic text-right">
                  {t('title')}
                </p>

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight font-arabic text-right">
                  {t('headline')}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-700 leading-relaxed font-arabic text-right">
                  {t('description')}
                </p>

                {/* Buttons */}
                <div className="flex gap-4 pt-4 flex-row-reverse justify-start">
                  <ButtonMain href="/services" variant="primary">
                    {t('buttons.services')}
                  </ButtonMain>
                  
                  <ButtonMain href="/about" variant="secondary">
                    {t('buttons.about')}
                  </ButtonMain>
                </div>

              </div>

              {/* Image Column - Second in RTL */}
              <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden lg:w-1/2 flex-shrink-0">
                <Image
                  src="/imgs/about-img-01.jpg"
                  alt="صورة عن ليفتكس"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </>
          ) : (
            <>
              {/* Image Column - First in LTR */}
              <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden lg:w-1/2 flex-shrink-0">
                <Image
                  src="/imgs/about-img-01.jpg"
                  alt="About Liftex"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Content Column - Second in LTR */}
              <div className="space-y-6 lg:w-1/2 text-left" dir="ltr">
                
                {/* Small Title */}
                <p className="text-sm font-medium text-gray-600 tracking-wider uppercase font-inter text-left">
                  {t('title')}
                </p>

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight font-inter text-left">
                  {t('headline')}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-700 leading-relaxed font-inter text-left">
                  {t('description')}
                </p>

                {/* Buttons */}
                <div className="flex gap-4 pt-4 flex-row justify-start">
                  <ButtonMain href="/services" variant="primary">
                    {t('buttons.services')}
                  </ButtonMain>
                  
                  <ButtonMain href="/about" variant="secondary">
                    {t('buttons.about')}
                  </ButtonMain>
                </div>

              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}; 