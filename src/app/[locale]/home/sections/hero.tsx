'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import anime from 'animejs';
import { cn } from '@/lib/utils';

// Uncover class - exactly like the reference
interface UncoverOptions {
  covered?: boolean;
  slicesTotal?: number;
  slicesColor?: string;
  orientation?: 'vertical' | 'horizontal';
  slicesOrigin?: {
    show: 'top' | 'bottom' | 'left' | 'right';
    hide: 'top' | 'bottom' | 'left' | 'right';
  };
}

interface AnimationSettings {
  slices?: Record<string, unknown>;
  image?: Record<string, unknown>;
}

class Uncover {
  DOM: { el: HTMLElement; img?: HTMLElement; slices: HTMLElement[] };
  options: UncoverOptions;
  isCovered: boolean;
  slicesTotal: number;

  constructor(el: HTMLElement, options: UncoverOptions = {}) {
    this.DOM = { el, slices: [] };
    this.options = {
      covered: true,
      slicesTotal: 4,
      slicesColor: '#111',
      orientation: 'vertical',
      slicesOrigin: { show: 'top', hide: 'bottom' },
      ...options
    };
    this.isCovered = this.options.covered!;
    this.slicesTotal = 0;
    this.layout();
    if (!this.isCovered) {
      this.show();
    }
  }

  layout() {
    this.DOM.el.classList.add('uncover');
    let inner = '';
    inner += `<div class="uncover__img" style='background-image: ${this.DOM.el.style.backgroundImage}'></div>
              <div class="uncover__slices uncover__slices--${this.options.orientation}">`;
    for (let i = 0; i < this.options.slicesTotal!; i++) {
      inner += `<div class="uncover__slice" style="color:${this.options.slicesColor}"></div>`;
    }
    inner += `</div>`;
    this.DOM.el.innerHTML = inner;
    this.DOM.img = this.DOM.el.querySelector('.uncover__img') as HTMLElement;
    this.DOM.slices = Array.from(this.DOM.el.querySelectorAll('.uncover__slice'));
    this.slicesTotal = this.DOM.slices.length;
  }

  show(animation = false, animationSettings: AnimationSettings = {}) {
    if (!this.isCovered) return Promise.resolve();
    return this.toggle(animation, animationSettings);
  }

  hide(animation = false, animationSettings: AnimationSettings = {}) {
    if (this.isCovered) return Promise.resolve();
    return this.toggle(animation, animationSettings);
  }

  toggle(animation: boolean, animationSettings: AnimationSettings = {}) {
    this.isCovered = !this.isCovered;
    if (!animation) {
      this.DOM.slices.forEach((slice) => {
        slice.style.transform = !this.isCovered
          ? this.options.orientation === 'vertical' ? 'translateY(100%)' : 'translateX(100%)'
          : 'none';
      });
      return Promise.resolve();
    } else {
      const settings = {
        slices: {
          targets: this.DOM.slices,
          duration: 800,
          delay: (_: unknown, i: number) => i * 80,
          easing: 'easeInOutQuint',
          translateX: this.options.orientation === 'vertical' ? '0%' : 
            !this.isCovered ? 
              this.options.slicesOrigin!.show === 'right' ? '100%' : '-100%' :
              this.options.slicesOrigin!.hide === 'right' ? ['100%', '0%'] : ['-100%', '0%'],
          translateY: this.options.orientation === 'vertical' ? 
            !this.isCovered ? 
              this.options.slicesOrigin!.show === 'bottom' ? '100%' : '-100%' :
              this.options.slicesOrigin!.hide === 'bottom' ? ['100%', '0%'] : ['-100%', '0%']
            : '0%'
        },
        image: {
          targets: this.DOM.img,
          ...((animationSettings.image || {}) as Record<string, unknown>)
        }
      };

      Object.assign(settings.slices, animationSettings.slices || {});

      anime.remove(this.DOM.slices);
      if (this.DOM.img) anime.remove(this.DOM.img);

      const promises = [anime(settings.slices).finished];
      if ((settings.image as Record<string, unknown>).duration) {
        promises.push(anime(settings.image).finished);
      }
      return Promise.all(promises);
    }
  }
}

// Simple Slideshow - exactly like Demo 1
class Slideshow {
  DOM: { el: HTMLElement; slides: HTMLElement[] };
  slidesTotal: number;
  current: number;
  uncoverItems: Uncover[];
  isAnimating: boolean;

  constructor(el: HTMLElement) {
    this.DOM = { el, slides: [] };
    this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
    this.slidesTotal = this.DOM.slides.length;
    this.current = 0;
    this.uncoverItems = [];
    this.isAnimating = false;

    // Demo 1 configuration - only the first one
    const uncoverOpts: UncoverOptions = {
      slicesTotal: 4,
      slicesColor: '#111',
      orientation: 'vertical',
      slicesOrigin: { show: 'top', hide: 'bottom' }
    };

    this.DOM.slides.forEach((slide) => {
      const img = slide.querySelector('.slide__img') as HTMLElement;
      this.uncoverItems.push(new Uncover(img, uncoverOpts));
    });

    this.init();
  }

  init() {
    this.isAnimating = true;
    this.DOM.slides[this.current].classList.add('slide--current');
    this.uncoverItems[this.current].show(true, {
      image: {
        duration: 800,
        delay: 350,
        easing: 'easeOutCirc',
        scale: [1.3, 1]
      }
    }).then(() => this.isAnimating = false);
  }

  navigate(pos: number) {
    if (this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1) return;
    this.isAnimating = true;

    this.uncoverItems[this.current].hide(true).then(() => {
      this.DOM.slides[this.current].classList.remove('slide--current');
      this.current = pos;

      const newItem = this.uncoverItems[this.current];
      newItem.hide();
      this.DOM.slides[this.current].classList.add('slide--current');
      newItem.show(true, {
        image: {
          duration: 800,
          delay: 350,
          easing: 'easeOutCirc',
          scale: [1.3, 1]
        }
      }).then(() => this.isAnimating = false);
    });
  }
}

export const HeroSection: React.FC = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const slidesRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideshowRef = useRef<Slideshow | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const heroImages = [
    '/imgs/hero01.jpg',
    '/imgs/hero-02.jpg',
    '/imgs/hero-03.jpg'
  ];

  useEffect(() => {
    if (!slidesRef.current) return;

    // Initialize slideshow
    slideshowRef.current = new Slideshow(slidesRef.current);

    // Progress bar animation
    let startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressPercent = (elapsed / 6000) * 100;
      setProgress(Math.min(progressPercent, 100));
      
      if (progressPercent < 100) {
        requestAnimationFrame(updateProgress);
      }
    };
    updateProgress();

    // Auto-advance every 6 seconds
    intervalRef.current = setInterval(() => {
      const slideshow = slideshowRef.current;
      if (slideshow && !slideshow.isAnimating) {
        const nextPos = (slideshow.current + 1) % heroImages.length;
        slideshow.navigate(nextPos);
        setCurrentSlide(nextPos);
        setProgress(0);
        startTime = Date.now();
        updateProgress();
      }
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [heroImages.length]);

  const handlePaginationClick = (pos: number) => {
    if (slideshowRef.current && slidesRef.current) {
      // Update slide--current class manually to match original demo
      const slides = slidesRef.current.querySelectorAll('.slide');
      slides.forEach((slide, index) => {
        if (index === pos) {
          slide.classList.add('slide--current');
        } else {
          slide.classList.remove('slide--current');
        }
      });
      
      slideshowRef.current.navigate(pos);
      setCurrentSlide(pos);
      setProgress(0);
      
      // Restart the progress animation
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        let startTime = Date.now();
        const updateProgress = () => {
          const elapsed = Date.now() - startTime;
          const progressPercent = (elapsed / 6000) * 100;
          setProgress(Math.min(progressPercent, 100));
          
          if (progressPercent < 100) {
            requestAnimationFrame(updateProgress);
          }
        };
        updateProgress();
        
        intervalRef.current = setInterval(() => {
          const slideshow = slideshowRef.current;
          if (slideshow && !slideshow.isAnimating && slidesRef.current) {
            const nextPos = (slideshow.current + 1) % heroImages.length;
            
            // Update slide--current class for auto-advance
            const slides = slidesRef.current.querySelectorAll('.slide');
            slides.forEach((slide, index) => {
              if (index === nextPos) {
                slide.classList.add('slide--current');
              } else {
                slide.classList.remove('slide--current');
              }
            });
            
            slideshow.navigate(nextPos);
            setCurrentSlide(nextPos);
            setProgress(0);
            startTime = Date.now();
            updateProgress();
          }
        }, 6000);
      }
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* CSS matching original demo structure */}
      <style jsx global>{`
        /* Slides structure matching original demo */
        .slides {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .slide {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          visibility: hidden;
        }
        .slide--current {
          opacity: 1;
          visibility: visible;
        }
        .slide__img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
        }
        
        /* Slice animation CSS */
        .uncover {
          overflow: hidden;
          background-image: none !important;
          position: relative;
        }
        .uncover__img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: 50% 50%;
        }
        .uncover__slices {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
        }
        .uncover__slices--vertical {
          flex-direction: row;
        }
        .uncover__slices--horizontal {
          flex-direction: column;
        }
        .uncover__slice {
          color: #fff;
          background-color: currentColor;
          flex: 1;
        }
        .uncover__slices--vertical .uncover__slice {
          box-shadow: 1px 0 0 currentColor;
        }
        .uncover__slices--horizontal .uncover__slice {
          box-shadow: 0 1px 0 currentColor;
        }
        
        /* RTL Support for progress bar */
        [dir="rtl"] .origin-right {
          transform-origin: right;
        }
        [dir="ltr"] .origin-left {
          transform-origin: left;
        }
      `}</style>

      {/* Background Slides - Following original demo structure exactly */}
      <div className="slides" ref={slidesRef}>
        {heroImages.map((image, index) => (
          <div 
            key={index} 
            className={`slide ${index === 0 ? 'slide--current' : ''}`}
          >
            <div 
              className="slide__img" 
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        ))}
      </div>

      {/* Hero Content Structure - Account for fixed navbar height */}
      <div className="absolute inset-0 z-10 flex flex-col">
        
        {/* Navbar spacing */}
        <div className="h-24"></div>
        
        {/* Main Content Container - Centered in remaining space */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className={cn(
            "space-y-6 w-full max-w-6xl",
            isRTL ? "text-right" : "text-left"
          )}>
            
            {/* Container 1: Headline */}
            <div>
              <h1 className={cn(
                "text-white font-medium leading-tight tracking-wide text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl break-words sm:whitespace-nowrap",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('title')}
              </h1>
            </div>

            {/* Container 2: Subheading */}
            <div className={cn(
              "flex",
              isRTL ? "justify-end" : "justify-start"
            )}>
              <p className={cn(
                "text-white/95 font-normal leading-tight text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-4xl px-4",
                isRTL ? "font-arabic text-right" : "font-inter text-left"
              )}>
                {t('subtitle')}
              </p>
            </div>
            
          </div>
        </div>

        {/* Container 3: Navigation (Pagination + Progress Bar) - Full Width */}
        <div className="pb-0 sm:pb-0lg:pb-0" dir={isRTL ? 'rtl' : 'ltr'}>
          
          {/* Pagination Dots - Centered with padding, RTL-aware */}
          <div className="flex items-center justify-center gap-3 mb-4 px-4 sm:px-6 lg:px-8">
            {(isRTL ? [...heroImages].reverse() : heroImages).map((_, originalIndex) => {
              const index = isRTL ? heroImages.length - 1 - originalIndex : originalIndex;
              return (
                <button
                  key={index}
                  onClick={() => handlePaginationClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out ${
                    index === currentSlide 
                      ? 'bg-white scale-150' 
                      : 'bg-white/40 hover:bg-white/70 hover:scale-125'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>

          {/* Progress Bar - True Full Width Edge to Edge, RTL-aware */}
          <div className={`flex w-full h-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {(isRTL ? [...heroImages].reverse() : heroImages).map((_, originalIndex) => {
              const index = isRTL ? heroImages.length - 1 - originalIndex : originalIndex;
              return (
                <div 
                  key={index}
                  className="flex-1 bg-white/20 relative overflow-hidden"
                >
                  <div 
                    className={`absolute inset-y-0 bg-white transition-none ${
                      isRTL ? 'right-0 origin-right' : 'left-0 origin-left'
                    }`}
                    style={{
                      width: '100%',
                      transform: index === currentSlide 
                        ? `scaleX(${progress / 100})` 
                        : index < currentSlide 
                          ? 'scaleX(1)' 
                          : 'scaleX(0)'
                    }}
                  />
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </main>
  );
}; 