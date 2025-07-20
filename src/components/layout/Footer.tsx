'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import { ButtonMain } from '@/components/ui';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <footer className="bg-black text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Main Footer Content */}
      <div className="py-16 lg:py-20">
        <Container>
          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16",
            isRTL ? "text-right" : "text-left"
          )}>
            
            {/* Column 1: Menu + Connect */}
            <div className="space-y-8">
              
              {/* Menu Section */}
              <div className="space-y-4">
                <h3 className={cn(
                  "text-lg font-semibold text-white",
                  isRTL ? "font-arabic" : "font-inter"
                )}>
                  {t('menu.title')}
                </h3>
                <nav className="space-y-3">
                  {[
                    { key: 'about', href: '/about' },
                    { key: 'projects', href: '/projects' },
                    { key: 'services', href: '/services' },
                    { key: 'blog', href: '/blog' },
                    { key: 'contact', href: '/contact' }
                  ].map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={cn(
                        "block text-gray-300 hover:text-white transition-colors duration-200",
                        isRTL ? "font-arabic" : "font-inter"
                      )}
                    >
                      {t(`menu.links.${item.key}`)}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Connect Section */}
              <div className="space-y-4">
                <h3 className={cn(
                  "text-lg font-semibold text-white",
                  isRTL ? "font-arabic" : "font-inter"
                )}>
                  {t('connect.title')}
                </h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className={cn(
                      "block text-gray-300 hover:text-white transition-colors duration-200",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {t('connect.social.linkedin')}
                  </a>
                  <a
                    href="#"
                    className={cn(
                      "block text-gray-300 hover:text-white transition-colors duration-200",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                  >
                    {t('connect.social.instagram')}
                  </a>
                </div>
              </div>

            </div>

            {/* Column 2: Contact Info */}
            <div className="space-y-8">
              
              <div className="space-y-4">
                <h3 className={cn(
                  "text-lg font-semibold text-white",
                  isRTL ? "font-arabic" : "font-inter"
                )}>
                  {t('contact.title')}
                </h3>
                
                <div className="space-y-3">
                  <a
                    href={`tel:${t('contact.phone')}`}
                    className={cn(
                      "block text-gray-300 hover:text-white transition-colors duration-200",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                    dir="ltr"
                  >
                    {t('contact.phone')}
                  </a>
                  
                  <a
                    href={`mailto:${t('contact.email')}`}
                    className={cn(
                      "block text-gray-300 hover:text-white transition-colors duration-200",
                      isRTL ? "font-arabic" : "font-inter"
                    )}
                    dir="ltr"
                  >
                    {t('contact.email')}
                  </a>
                  
                  <p className={cn(
                    "text-gray-300 leading-relaxed",
                    isRTL ? "font-arabic" : "font-inter"
                  )}>
                    {t('contact.address')}
                  </p>
                </div>
              </div>

            </div>

            {/* Column 3: Contact Form */}
            <div className="space-y-6">
              
              <h3 className={cn(
                "text-lg font-semibold text-white",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('contactForm.title')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder={t('contactForm.fields.firstName')}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-200",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder={t('contactForm.fields.lastName')}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-200",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                      required
                    />
                  </div>
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder={t('contactForm.fields.email')}
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-200",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t('contactForm.fields.phone')}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-200",
                        isRTL ? "font-arabic text-right" : "font-inter text-left"
                      )}
                      required
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    placeholder={t('contactForm.fields.message')}
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={cn(
                      "w-full px-0 py-3 bg-transparent border-0 border-b border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors duration-200 resize-vertical",
                      isRTL ? "font-arabic text-right" : "font-inter text-left"
                    )}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className={cn(
                  "flex",
                  isRTL ? "justify-start" : "justify-start"
                )}>
                  <ButtonMain
                    onClick={() => {}}
                    variant="primary"
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    {t('contactForm.button')}
                  </ButtonMain>
                </div>

              </form>

            </div>

          </div>
        </Container>
      </div>

      {/* Bottom Legal Section */}
      <div className="bg-[#110F0F] py-6">
        <Container>
          <div className={cn(
            "flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0",
            isRTL ? "md:flex-row-reverse text-right" : "text-left"
          )}>
            
            {/* Legal Links */}
            <div className={cn(
              "flex items-center space-x-6",
              isRTL ? "space-x-reverse" : ""
            )}>
              <Link
                href="/terms"
                className={cn(
                  "text-sm text-gray-400 hover:text-white transition-colors duration-200",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {t('legal.terms')}
              </Link>
              <Link
                href="/privacy"
                className={cn(
                  "text-sm text-gray-400 hover:text-white transition-colors duration-200",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {t('legal.privacy')}
              </Link>
            </div>

            {/* Copyright */}
            <p className={cn(
              "text-sm text-gray-400",
              isRTL ? "font-arabic" : "font-inter"
            )}>
              {t('legal.branding')}
            </p>

          </div>
        </Container>
      </div>

    </footer>
  );
} 