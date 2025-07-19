'use client';

import { useTranslations } from 'next-intl';
import { Container } from "@/components/layout";

export function HomePage() {
  const t = useTranslations('homepage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-8 pb-32">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              {t('title')}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Liftex
              </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-gray-600 sm:text-xl">
              {t('subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="btn-primary">
                {t('cta.getStarted')}
              </button>
              <button className="btn-secondary">
                {t('cta.learnMore')}
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Additional Content Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('moreContent.title')}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              {t('moreContent.description')}
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
} 