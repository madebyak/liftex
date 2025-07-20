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
  scaleIn
} from '@/lib/animations';
import { Calendar, Clock, Tag } from 'lucide-react';

export const BlogGridSection: React.FC = () => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-IQ' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 lg:py-32 bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        <ScrollReveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12",
              isRTL ? "text-right" : "text-left"
            )}
          >
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                variants={scaleIn}
                whileHover="hover"
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl"
              >
                <Link href={`/blog/${article.id}`}>
                  
                  {/* Article Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <motion.span 
                          initial={{ opacity: 0, y: -10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800",
                            isRTL ? "font-arabic" : "font-inter"
                          )}
                        >
                          <Tag className="w-3 h-3" />
                          {article.category}
                        </motion.span>
                                             </div>
                     </div>
                   </div>

                  {/* Article Content */}
                  <div className="p-6 lg:p-8">
                    
                    {/* Article Meta */}
                    <motion.div 
                      variants={fadeInUp}
                      className={cn(
                        "flex items-center gap-4 text-sm text-gray-500 mb-4",
                        isRTL ? "font-arabic" : "font-inter"
                      )}
                    >
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
                    <motion.h3 
                      variants={fadeInUp}
                      className={cn(
                        "text-xl lg:text-2xl font-semibold text-black mb-4 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2",
                        isRTL ? "font-arabic" : "font-inter"
                      )}
                    >
                      {article.title}
                    </motion.h3>

                    {/* Article Excerpt */}
                    <motion.p 
                      variants={fadeInUp}
                      className={cn(
                        "text-gray-600 leading-relaxed mb-6 line-clamp-3",
                        isRTL ? "font-arabic" : "font-inter"
                      )}
                    >
                      {article.excerpt}
                    </motion.p>

                    {/* Read More Link */}
                    <motion.div
                      variants={fadeInUp}
                      className={cn(
                        "flex items-center gap-2 text-black font-medium group-hover:gap-3 transition-all duration-300",
                        isRTL ? "font-arabic" : "font-inter"
                      )}
                    >
                      <span>{t('readMore')}</span>
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
                    </motion.div>

                  </div>
                  
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </ScrollReveal>
      </Container>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="w-96 h-96 border border-gray-300 rounded-full"
          />
        </motion.div>
      </div>

    </section>
  );
}; 