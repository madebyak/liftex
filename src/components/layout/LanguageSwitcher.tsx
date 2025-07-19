'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('topNavbar.language');
  const [isPending, startTransition] = useTransition();

  function onSelectChange(nextLocale: 'en' | 'ar') {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="flex items-center bg-gray-800 rounded-full p-0.5">
      <button
        className={`px-1.5 md:px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${
          locale === 'en' 
            ? 'bg-blue-600 text-white shadow-sm' 
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
        onClick={() => onSelectChange('en')}
        disabled={isPending}
        aria-label="Switch to English"
      >
        {t('en')}
      </button>
      <button
        className={`px-1.5 md:px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 font-arabic-regular ${
          locale === 'ar' 
            ? 'bg-blue-600 text-white shadow-sm' 
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
        onClick={() => onSelectChange('ar')}
        disabled={isPending}
        aria-label="تبديل إلى العربية"
      >
        {t('ar')}
      </button>
    </div>
  );
} 