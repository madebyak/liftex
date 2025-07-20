import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { BlogPostContent } from './sections';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
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