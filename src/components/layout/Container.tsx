import { ContainerProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Main container component for unified structure across the website
 * Provides consistent max-width, padding, and centering
 */
export function Container({
  children,
  className,
  maxWidth = "xl",
  as: Component = "div",
}: ContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-7xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </Component>
  );
} 