import { setRequestLocale } from 'next-intl/server';
import { HeroSection, ContactFormSection, BuildSection } from './sections';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ContactFormSection />
      <BuildSection />
    </main>
  );
} 