'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

/** Direction constants */
const NEXT = 1;
const PREV = -1;

/**
 * Demo6 Slideshow Class - Based on the inspiration effect
 * Manages slideshow functionality with stretch/slide animation.
 */
class Demo6Slideshow {
  /**
   * Holds references to relevant DOM elements.
   */
  DOM: {
    el: HTMLElement;
    slides: HTMLElement[];
    slidesInner: HTMLElement[];
  };
  
  /**
   * Index of the current slide being displayed.
   */
  current = 0;
  
  /**
   * Total number of slides.
   */
  slidesTotal = 0;
  
  /**  
   * Flag to indicate if an animation is running.
   */
  isAnimating = false;

  /**
   * Slideshow constructor.
   * Initializes the slideshow and sets up the DOM elements.
   */
  constructor(DOM_el: HTMLElement) {
    // Initialize DOM elements
    this.DOM = {
      el: DOM_el,
      slides: [...DOM_el.querySelectorAll('.slide')] as HTMLElement[],
      slidesInner: []
    };
    
    this.DOM.slidesInner = this.DOM.slides.map(item => 
      item.querySelector('.slide__img') as HTMLElement
    );

    // Set initial slide as current
    this.DOM.slides[this.current].classList.add('slide--current');

    // Count total slides
    this.slidesTotal = this.DOM.slides.length;
  }

  /**
   * Navigate to the next slide.
   */
  next() {
    this.navigate(NEXT);
  }

  /**
   * Navigate to the previous slide.
   */
  prev() {
    this.navigate(PREV);
  }

  /**
   * Navigate to a specific slide position.
   */
  navigateToSlide(position: number) {
    if (this.isAnimating || this.current === position || position < 0 || position > this.slidesTotal - 1) {
      return false;
    }
    
    const direction = position > this.current ? NEXT : PREV;
    const previous = this.current;
    this.current = position;
    
    this.performAnimation(direction, previous);
    return true;
  }

  /**
   * Navigate through slides with direction.
   */
  navigate(direction: number) {
    // Check if animation is already running
    if (this.isAnimating) return false;
    
    // Update the current slide index based on direction
    const previous = this.current;
    this.current = direction === 1 ?
      this.current < this.slidesTotal - 1 ? ++this.current : 0 :
      this.current > 0 ? --this.current : this.slidesTotal - 1;

    this.performAnimation(direction, previous);
    return true;
  }

  /**
   * Perform the slide animation using GSAP
   */
  private performAnimation(direction: number, previous: number) {
    this.isAnimating = true;

    // Get the current and upcoming slides and their inner elements
    const currentSlide = this.DOM.slides[previous];
    const currentInner = this.DOM.slidesInner[previous];
    const upcomingSlide = this.DOM.slides[this.current];
    const upcomingInner = this.DOM.slidesInner[this.current];

    // Animation sequence using GSAP - Demo6 effect
    gsap
      .timeline({
        defaults: {
          duration: 1.6,
          ease: 'power3.inOut'
        },
        onStart: () => {
          // Add class to the upcoming slide to mark it as current
      this.DOM.slides[this.current].classList.add('slide--current');
        },
        onComplete: () => {
          // Remove class from the previous slide to unmark it as current
          this.DOM.slides[previous].classList.remove('slide--current');
          // Reset animation flag
          this.isAnimating = false;
        }
      })
      // Defining animation steps
      .addLabel('start', 0)
      .to(currentSlide, {
        xPercent: -direction * 100
      }, 'start')
      .to(currentInner, {
        transformOrigin: direction === NEXT ? '100% 50%' : '0% 50%',
        scaleX: 4
      }, 'start')
      .fromTo(upcomingSlide, {
        xPercent: direction * 100
      }, {
        xPercent: 0
      }, 'start')
      .fromTo(upcomingInner, {
        transformOrigin: direction === NEXT ? '0% 50%' : '100% 50%',
        xPercent: -direction * 100,
        scaleX: 4
      }, {
        xPercent: 0,
        scaleX: 1
      }, 'start');
  }
}

export const HeroSection: React.FC = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const slidesRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideshowRef = useRef<Demo6Slideshow | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const heroImages = [
    '/imgs/hero01.jpg',
    '/imgs/hero-02.jpg',
    '/imgs/hero-03.jpg',
    '/imgs/hero05.jpg',
    '/imgs/hero-06.jpg'
  ];

  useEffect(() => {
    if (!slidesRef.current) return;

    // Initialize Demo6 slideshow
    slideshowRef.current = new Demo6Slideshow(slidesRef.current);

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
        slideshow.next();
        setCurrentSlide(slideshow.current);
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
    if (slideshowRef.current) {
      const success = slideshowRef.current.navigateToSlide(pos);
      if (success) {
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
            if (slideshow && !slideshow.isAnimating) {
              slideshow.next();
              setCurrentSlide(slideshow.current);
              setProgress(0);
              startTime = Date.now();
              updateProgress();
            }
          }, 6000);
        }
      }
    }
  };

  const handlePrevSlide = () => {
    if (slideshowRef.current) {
      slideshowRef.current.prev();
      setCurrentSlide(slideshowRef.current.current);
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
          if (slideshow && !slideshow.isAnimating) {
            slideshow.next();
            setCurrentSlide(slideshow.current);
            setProgress(0);
            startTime = Date.now();
            updateProgress();
          }
        }, 6000);
      }
    }
  };

  const handleNextSlide = () => {
    if (slideshowRef.current) {
      slideshowRef.current.next();
      setCurrentSlide(slideshowRef.current.current);
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
          if (slideshow && !slideshow.isAnimating) {
            slideshow.next();
            setCurrentSlide(slideshow.current);
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
      {/* CSS for Demo6 slideshow effect */}
      <style jsx global>{`
        /* Demo6 Slides structure */
        .slides {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: grid;
          grid-template-rows: 100%;
          grid-template-columns: 100%;
          place-items: center;
        }

        .slide {
          width: 100%;
          height: 100%;
          grid-area: 1 / 1 / -1 / -1;
          pointer-events: none;
          opacity: 0;
          overflow: hidden;
          position: relative;
          display: grid;
          place-items: center;
          will-change: transform, opacity;
        }

        .slide--current {
          pointer-events: auto;
          opacity: 1;
        }

        .slide__img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          will-change: transform, opacity, filter;
        }
        
        /* Navigation arrows styling */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-size: 18px;
          font-weight: bold;
        }

        .nav-arrow:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }

        .nav-arrow--prev {
          left: 20px;
        }

        .nav-arrow--next {
          right: 20px;
        }

        /* Hide arrows on mobile to prevent text overlap */
        @media (max-width: 768px) {
          .nav-arrow {
            display: none;
          }
        }

        /* Touch support for mobile */
        @media (hover: none) and (pointer: coarse) {
          .nav-arrow:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-50%);
          }
        }
        
        /* RTL Support for progress bar */
        [dir="rtl"] .origin-right {
          transform-origin: right;
        }
        [dir="ltr"] .origin-left {
          transform-origin: left;
        }

        /* RTL Support for navigation arrows */
        [dir="rtl"] .nav-arrow--prev {
          right: 20px;
          left: auto;
        }

        [dir="rtl"] .nav-arrow--next {
          left: 20px;
          right: auto;
        }


      `}</style>

      {/* Background Slides - Demo6 structure */}
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

      {/* Navigation Arrows */}
      <button 
        className={cn(
          "nav-arrow nav-arrow--prev",
          isRTL && "rtl-prev"
        )}
        onClick={isRTL ? handleNextSlide : handlePrevSlide}
        aria-label={isRTL ? "Next slide" : "Previous slide"}
      >
        {isRTL ? "→" : "←"}
      </button>
      
      <button 
        className={cn(
          "nav-arrow nav-arrow--next", 
          isRTL && "rtl-next"
        )}
        onClick={isRTL ? handlePrevSlide : handleNextSlide}
        aria-label={isRTL ? "Previous slide" : "Next slide"}
      >
        {isRTL ? "←" : "→"}
      </button>

      {/* Hero Content Structure - Centered and properly aligned */}
      <div className="absolute inset-0 z-10 flex flex-col">
        
        {/* Navbar spacing */}
        <div className="h-20 md:h-24"></div>
        
        {/* Main Content Container - Perfectly centered */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-7xl w-full">
            
            {/* Headline - Center aligned */}
            <div className="mb-6 sm:mb-8">
              <h1 className={cn(
                "text-white font-medium leading-tight tracking-wide",
                "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
                "mx-auto text-center",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('title')}
              </h1>
            </div>

            {/* Subheading - Center aligned */}
            <div className="flex justify-center">
              <p className={cn(
                "text-white/95 font-normal leading-relaxed text-center",
                "text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
                "max-w-4xl mx-auto px-2 sm:px-4",
                isRTL ? "font-arabic" : "font-inter"
              )}>
                {t('subtitle')}
              </p>
            </div>
            
          </div>
        </div>

        {/* Navigation Container - Full Width at Bottom */}
        <div className="pb-6 sm:pb-8 lg:pb-10">
          
          {/* Pagination Dots - Centered */}
          <div className="flex items-center justify-center gap-3 mb-4 px-4 sm:px-6 lg:px-8">
            {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePaginationClick(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300 ease-in-out",
                    index === currentSlide 
                      ? 'bg-white scale-150' 
                      : 'bg-white/40 hover:bg-white/70 hover:scale-125'
                )}
                  aria-label={`Go to slide ${index + 1}`}
                />
            ))}
          </div>

          {/* Progress Bar - Full Width */}
          <div className={cn("flex w-full h-0.5", isRTL ? 'flex-row-reverse' : '')}>
            {(isRTL ? [...heroImages].reverse() : heroImages).map((_, originalIndex) => {
              const index = isRTL ? heroImages.length - 1 - originalIndex : originalIndex;
              return (
                <div 
                  key={index}
                  className="flex-1 bg-white/20 relative overflow-hidden"
                >
                  <div 
                    className={cn(
                      "absolute inset-y-0 bg-white transition-none",
                      isRTL ? 'right-0 origin-right' : 'left-0 origin-left'
                    )}
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