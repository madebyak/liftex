import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { BlogPostContent } from './sections';

type Props = {
  params: { locale: string; slug: string };
};

export default function BlogPostPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);

  // Validate slug exists (you can expand this with actual data validation)
  const validSlugs = [
    'modernising-old-elevators',
    'elevator-solutions-iraq', 
    'lift-maintenance-signs'
  ];

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <BlogPostContent slug={slug} />
    </main>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'modernising-old-elevators' },
    { slug: 'elevator-solutions-iraq' },
    { slug: 'lift-maintenance-signs' },
  ];
} 