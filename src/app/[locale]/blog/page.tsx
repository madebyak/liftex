import { setRequestLocale } from 'next-intl/server';
import { HeroSection, BlogGridSection } from './sections';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <BlogGridSection />
    </main>
  );
} 