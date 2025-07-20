import { setRequestLocale } from 'next-intl/server';
import { HeroSection, BlogGridSection } from './sections';

type Props = {
  params: { locale: string };
};

export default function BlogPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <BlogGridSection />
    </main>
  );
} 