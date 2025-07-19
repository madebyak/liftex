import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { TopNavbar, Navbar } from "@/components/layout";
import { ReactNode } from 'react';

// Inter is a variable font - no weight needed
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Noto Sans Arabic is a variable font - no weight needed
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>; // Updated to Promise type
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: Omit<Props, 'children'>) {
  const { locale } = await params; // Await params before use
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      template: '%s | Liftex',
      default: 'Liftex - Elevator Solutions',
    },
    description: 'Modern elevator and lift solutions for commercial and residential buildings.',
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params; // Await params before use
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable} ${notoSansArabic.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {/* Fixed TopNavbar */}
          <TopNavbar className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-sm" />
          
          {/* Main Navbar */}
          <Navbar className="fixed top-8 left-0 right-0 z-40 bg-white" />
          
          {/* Main Content */}
          <main className="pt-24">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
