"use client";

import { useTranslations } from 'next-intl';
import { Container } from "./Container";
import { Phone, Mail, MapPin } from "lucide-react";
import { TopNavbarProps } from "@/types";
import { cn } from "@/lib/utils";
import LanguageSwitcher from './LanguageSwitcher';

export function TopNavbar({ className }: TopNavbarProps) {
  const t = useTranslations('topNavbar');

  const contactDetails = [
    {
      icon: Phone,
      text: t('phone'),
      href: `tel:${t('phone')}`,
      label: "Phone",
    },
    {
      icon: Mail,
      text: t('email'),
      href: `mailto:${t('email')}`,
      label: "Email",
    },
    {
      icon: MapPin,
      text: t('address'),
      href: "#",
      label: "Address",
    },
  ];

  return (
    <div className={cn(
      "bg-black text-white py-1 md:py-1.5 text-xs border-b border-gray-700 fixed top-0 left-0 right-0 z-50",
      className
    )}>
      <Container>
        <div className="flex items-center justify-between">
          {/* Left side - Contact Details */}
          <div className="flex items-center gap-1 md:gap-4 overflow-x-auto">
            {contactDetails.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-0.5 md:gap-1.5 text-gray-300 hover:text-white transition-colors duration-200 group whitespace-nowrap"
                  aria-label={contact.label}
                >
                  <IconComponent 
                    className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" 
                    aria-hidden="true"
                  />
                  <span className="hidden md:inline-block font-regular text-xs" dir="ltr">
                    {contact.text}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right side - Language Toggle */}
          <div className="flex items-center ml-1">
            <LanguageSwitcher />
          </div>
        </div>
      </Container>
    </div>
  );
} 