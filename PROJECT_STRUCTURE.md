# Liftex - Project Structure

This document outlines the project structure and best practices followed in this Next.js application with Tailwind CSS.

## 📁 Project Structure

```
liftex/
├── public/                     # Static assets
│   └── logos/                  # Logo files (SVG format)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/           # Future: Route groups for organization
│   │   ├── about/             # About page
│   │   ├── services/          # Services page
│   │   ├── projects/          # Projects page
│   │   ├── blog/              # Blog section
│   │   ├── contact/           # Contact page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   │   ├── Container.tsx  # Main container component
│   │   │   ├── Navbar.tsx     # Navigation component
│   │   │   └── index.ts       # Component exports
│   │   ├── common/            # Common components
│   │   └── pages/             # Page-specific components
│   │       ├── HomePage.tsx   # Homepage component
│   │       └── index.ts       # Component exports
│   ├── lib/                   # Utility functions
│   │   └── utils.ts           # Tailwind class utilities
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # Global types
│   └── constants/             # Application constants
│       └── navigation.ts      # Navigation configuration
└── Configuration files...
```

## 🎨 Tailwind CSS Best Practices

### 1. **Utility-First Approach**
- Use Tailwind utility classes directly in components
- Avoid custom CSS unless absolutely necessary
- Keep styles co-located with components

### 2. **Class Organization**
- Use `clsx` and `tailwind-merge` for conditional classes
- Consistent ordering: layout → spacing → typography → colors → effects
- Use the `cn()` utility function for class merging

### 3. **Custom Components**
- Use `@apply` directive sparingly for repeated patterns
- Create component variants using conditional classes
- Maintain semantic naming for custom classes

### 4. **Responsive Design**
- Mobile-first approach with Tailwind's responsive variants
- Use consistent breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test across all screen sizes

## 🏗️ Component Architecture

### Layout Components (`src/components/layout/`)
- **Container**: Provides consistent max-width and padding
- **Navbar**: Responsive navigation with mobile menu
- **Future**: Footer, Sidebar, Header variants

### UI Components (`src/components/ui/`)
- Reusable, atomic components
- Button variants, Input fields, Cards, etc.
- No business logic, only presentation

### Page Components (`src/components/pages/`)
- Page-specific components
- Can contain business logic
- Import and compose UI and layout components

## 📱 Page Structure

Each page will follow this structure:
```typescript
// Example: src/app/about/page.tsx
import { AboutPage } from "@/components/pages";

export default function About() {
  return <AboutPage />;
}
```

### Future Page Organization
- Each page can have sub-sections as separate components
- Slug pages will use dynamic routes: `[slug]/page.tsx`
- Group related pages using route groups: `(marketing)/about/`

## 🔧 Development Guidelines

### TypeScript
- Strict mode enabled
- Explicit typing for all props and functions
- Use utility types and interfaces appropriately

### Imports
- Use absolute imports with `@/` alias
- Group imports: React → Next.js → Third-party → Internal
- Use barrel exports from index files

### File Naming
- PascalCase for components: `HomePage.tsx`
- camelCase for utilities: `utils.ts`
- kebab-case for pages: `about/page.tsx`

## 🚀 Performance Optimization

### Images
- Use `next/image` for all images
- Optimize SVG logos in `/public/logos/`
- Add proper alt text and dimensions

### CSS
- Tailwind purges unused styles automatically
- Custom styles in global.css with semantic names
- Use CSS custom properties for theme variables

### Components
- Lazy load heavy components
- Use React.memo for expensive renders
- Prefer server components when possible

## 📋 Future Enhancements

1. **Dark Mode**: Implement with Tailwind's dark mode utilities
2. **Internationalization**: Add multi-language support
3. **Animation**: Use Framer Motion with Tailwind
4. **Testing**: Jest + Testing Library setup
5. **CMS Integration**: For blog and dynamic content

## 🎯 Best Practices Summary

- ✅ Use semantic HTML elements
- ✅ Implement proper accessibility (ARIA labels, focus states)
- ✅ Follow responsive design principles
- ✅ Maintain consistent spacing and typography
- ✅ Use TypeScript for type safety
- ✅ Keep components small and focused
- ✅ Document complex functionality
- ✅ Test components thoroughly

This structure provides a solid foundation for scaling the application while maintaining clean code and excellent performance. 