"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import { Container } from "./Container";
import { NavbarProps } from "@/types";
import { cn } from "@/lib/utils";

// Animated Navigation Link Component with Wipe Effects
interface AnimatedNavLinkProps {
  href: string;
  children: React.ReactNode;
  isRTL: boolean;
}

const AnimatedNavLink: React.FC<AnimatedNavLinkProps> = ({ href, children, isRTL }) => {
  return (
    <Link
      href={href}
      className={cn(
        "nav-link-wipe px-3 py-2 text-sm font-medium relative overflow-hidden",
        isRTL ? "nav-link-rtl" : "nav-link-ltr"
      )}
    >
      <span className="relative z-10">
        {children}
      </span>
    </Link>
  );
};

export function Navbar({ className }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { name: t('home'), href: "/" },
    { name: t('about'), href: "/about" },
    { name: t('services'), href: "/services" },
    { name: t('projects'), href: "/projects" },
    { name: t('blog'), href: "/blog" },
    { name: t('contact'), href: "/contact" },
  ];

  // Logo configuration based on locale
  const logoConfig = {
    en: {
      src: "/logos/logo-en-black.svg",
      alt: "Liftex Logo"
    },
    ar: {
      src: "/logos/arabic-black-logo.svg", 
      alt: "شعار ليفتكس"
    }
  };

  const currentLogo = logoConfig[locale as keyof typeof logoConfig] || logoConfig.en;

  // Logo component
  const LogoComponent = (
    <div className="flex-shrink-0">
      <Link href="/" className="flex items-center">
        <Image
          src={currentLogo.src}
          alt={currentLogo.alt}
          width={120}
          height={40}
          className="h-8 w-auto sm:h-10"
          priority
        />
      </Link>
    </div>
  );

  // Desktop Navigation component
  const DesktopNavigation = (
    <div className={cn(
      "hidden lg:flex lg:items-center",
      isRTL ? "lg:space-x-reverse lg:space-x-8" : "lg:space-x-8"
    )}>
      {navigationItems.map((item) => (
        <AnimatedNavLink
          key={item.href}
          href={item.href}
          isRTL={isRTL}
        >
          {item.name}
        </AnimatedNavLink>
      ))}
    </div>
  );

  // Mobile menu button
  const MobileMenuButton = (
    <div className="lg:hidden">
      <button
        onClick={toggleMobileMenu}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
    </div>
  );

  return (
    <nav className={cn("bg-white border-b border-gray-100 fixed top-[32px] left-0 right-0 z-40", className)}>
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Conditional rendering based on locale */}
          {isRTL ? (
            <>
              {/* RTL: Navigation first (left), Logo last (right) */}
              {DesktopNavigation}
              {LogoComponent}
              {MobileMenuButton}
            </>
          ) : (
            <>
              {/* LTR: Logo first (left), Navigation last (right) */}
              {LogoComponent}
              {DesktopNavigation}
              {MobileMenuButton}
            </>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-6"
              : "max-h-0 opacity-0 pb-0"
          )}
        >
          <div className="pt-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
} 