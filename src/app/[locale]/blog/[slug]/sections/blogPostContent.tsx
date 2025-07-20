'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout';
import { ScrollReveal } from '@/components/common';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { 
  fadeInUp, 
  staggerContainer, 
  textReveal,
  scaleIn
} from '@/lib/animations';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react';

interface BlogPostContentProps {
  slug: string;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ slug }) => {
  const t = useTranslations('blogPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Get articles from translation
  const articles = t.raw('articles') as Array<{
    id: string;
    title: string;
    excerpt: string;
    readTime: string;
    category: string;
    date: string;
    image: string;
  }>;

  // Find the current article
  const article = articles.find(article => article.id === slug);
  
  if (!article) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-IQ' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Sample article content - in a real app, this would come from a CMS or markdown files
  const getArticleContent = (slug: string) => {
    const content: { [key: string]: string[] } = {
      'modernising-old-elevators': [
        "Elevators are one of the most important yet overlooked systems in a building. While they may continue to run for decades, many older systems lack the safety features, energy efficiency, and user experience that modern buildings—and modern users—expect.",
        "But replacing an entire lift system from scratch can be costly and disruptive. The good news? You don't have to start over. Elevator modernisation is a smart, effective way to breathe new life into your existing system.",
        "There are three main reasons to consider modernization: safety, efficiency, and performance. Many older elevators still use relay-based controllers, outdated motors, and mechanical door systems—all of which can contribute to breakdowns, safety risks, and higher operating costs.",
        "By upgrading specific components, such as the control panel, drive system, or doors, you can significantly improve reliability and energy consumption without replacing the entire structure.",
        "At Liftex, we've spent decades working on elevators of all types across Iraq. Our team understands the unique challenges that come with modernising lift systems in older buildings—from structural limitations to unpredictable power supply and regulatory considerations."
      ],
      'elevator-solutions-iraq': [
        "As Iraq enters a new era of rebuilding and expansion, vertical mobility is becoming more essential than ever. Across cities like Baghdad, Erbil, Basra, and beyond, we're seeing the rise of multi-storey apartment blocks, commercial hubs, healthcare complexes, and government buildings.",
        "Over the past few years, Iraq has witnessed a growing demand for modern infrastructure, driven by both public investment and private sector development. Large-scale projects in residential housing, hospitality, and retail are expanding across major cities.",
        "One of the most pressing issues is Iraq's unstable electrical grid. In many areas, sudden outages and voltage drops are frequent, putting elevator systems at risk of malfunction. This makes emergency features like UPS systems or generator integration essential.",
        "Despite these challenges, Iraq's dynamic construction sector offers fertile ground for innovative elevator designs—solutions that are not only mechanically robust but also flexible, stylish, and adapted to a variety of building types.",
        "At Liftex, we bring decades of experience in elevator and escalator solutions—designed and delivered for the unique demands of Iraq's construction sector. Our roots in this market go deep."
      ],
      'lift-maintenance-signs': [
        "Elevators are designed to last for decades, but longevity doesn't happen by chance. Like any other piece of machinery, a lift system depends on consistent upkeep to remain safe, smooth, and reliable.",
        "Unfortunately, many property owners or managers delay maintenance until something goes wrong — and by then, it's often far more expensive to fix. The best way to protect your building, tenants, and bottom line is to stay ahead of potential issues.",
        "It might start with something seemingly minor: the doors hesitate before closing, the elevator gets stuck for a few seconds, or you receive a complaint about an unexpected jolt during operation. These little issues are more than just inconveniences.",
        "An elevator should operate smoothly and quietly. If you start hearing grinding, squeaking, buzzing, or knocking sounds — or if you notice the cab shudders slightly during movement — that's a red flag.",
        "At Liftex, we believe that every lift deserves more than just reactive attention. That's why we offer structured maintenance plans based on the specific age, usage, and demands of your system."
      ]
    };
    
    return content[slug] || [];
  };

  const articleContent = getArticleContent(slug);

  return (
    <article className="py-20 lg:py-32 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        
        {/* Back to Blog Link */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link 
              href="/blog"
              className={cn(
                "inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200",
                isRTL ? "font-arabic" : "font-inter"
              )}
            >
              {isRTL ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <ArrowLeft className="w-4 h-4" />
              )}
              {t('backToBlog')}
            </Link>
          </motion.div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          
          {/* Article Header */}
          <ScrollReveal>
            <motion.header
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={cn(
                "mb-12",
                isRTL ? "text-right" : "text-left"
              )}
            >
              
              {/* Article Meta */}
              <motion.div 
                variants={fadeInUp}
                className={cn(
                  "flex items-center gap-4 text-sm text-gray-500 mb-6",
                  isRTL ? "font-arabic justify-end" : "font-inter justify-start"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  <span>{article.category}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </motion.div>

              {/* Article Title */}
              <div className="overflow-hidden mb-8">
                <motion.h1 
                  variants={textReveal}
                  className={cn(
                    "text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-tight",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {article.title}
                </motion.h1>
              </div>

              {/* Article Excerpt */}
              <motion.p 
                variants={fadeInUp}
                className={cn(
                  "text-xl text-gray-600 leading-relaxed",
                  isRTL ? "font-arabic" : "font-inter"
                )}
              >
                {article.excerpt}
              </motion.p>

            </motion.header>
          </ScrollReveal>

          {/* Featured Image */}
          <ScrollReveal>
            <motion.div
              variants={scaleIn}
              className="relative aspect-video md:aspect-[16/10] overflow-hidden rounded-2xl mb-12"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </motion.div>
          </ScrollReveal>

          {/* Article Content */}
          <ScrollReveal>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "prose prose-lg max-w-none",
                isRTL ? "prose-right font-arabic" : "prose-left font-inter"
              )}
            >
              {articleContent.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeInUp}
                                  className={cn(
                  "text-lg leading-relaxed text-gray-800 mb-6",
                  isRTL ? "font-arabic" : "font-inter"
                )}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </ScrollReveal>

          {/* Article Footer */}
          <ScrollReveal>
            <motion.footer
              variants={fadeInUp}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <div className={cn(
                "flex items-center justify-between",
                isRTL ? "flex-row-reverse" : ""
              )}>
                <div className={cn(
                  "text-sm text-gray-600",
                  isRTL ? "font-arabic text-right" : "font-inter text-left"
                )}>
                  Published on {formatDate(article.date)}
                </div>
                <Link 
                  href="/blog"
                  className={cn(
                    "inline-flex items-center gap-2 text-black font-medium hover:gap-3 transition-all duration-300",
                    isRTL ? "font-arabic" : "font-inter"
                  )}
                >
                  {t('backToBlog')}
                  <motion.div
                    animate={{ 
                      x: isRTL ? [-2, 2, -2] : [2, -2, 2] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className={cn(
                      "text-lg",
                      isRTL ? "rotate-180" : ""
                    )}
                  >
                    →
                  </motion.div>
                </Link>
              </div>
            </motion.footer>
          </ScrollReveal>

        </div>
      </Container>
    </article>
  );
}; 