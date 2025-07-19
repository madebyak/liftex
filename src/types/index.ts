// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

// Component props types
export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  as?: React.ElementType;
}

export interface NavbarProps {
  className?: string;
}

// Language types
export type Language = "en" | "ar";

export interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
}

export interface TopNavbarProps {
  className?: string;
}

// Page types
export interface PageSection {
  id: string;
  title: string;
  component: React.ComponentType;
}

export interface PageData {
  title: string;
  description: string;
  sections: PageSection[];
} 