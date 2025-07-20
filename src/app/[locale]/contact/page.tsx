import { setRequestLocale } from 'next-intl/server';
import { HeroSection, ContactFormSection, BuildSection } from './sections';

type Props = {
  params: { locale: string };
};

export default function ContactPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ContactFormSection />
      <BuildSection />
    </main>
  );
} 