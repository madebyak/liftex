// Scroll utilities for easy Lenis integration

/**
 * Scroll to top of page with smooth animation
 */
export function scrollToTop(duration = 1.5) {
  if (typeof window === 'undefined') return;
  
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(0, { duration });
  }
}

/**
 * Scroll to a specific element with smooth animation
 * @param target - CSS selector, element, or element ID
 * @param offset - Optional offset in pixels
 * @param duration - Animation duration in seconds
 */
export function scrollToElement(target: string | HTMLElement, offset = 0, duration = 1.2) {
  if (typeof window === 'undefined') return;
  
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration });
  }
}

/**
 * Scroll to a specific pixel position
 * @param position - Y position in pixels
 * @param duration - Animation duration in seconds
 */
export function scrollToPosition(position: number, duration = 1.2) {
  if (typeof window === 'undefined') return;
  
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(position, { duration });
  }
}

/**
 * Temporarily stop smooth scrolling (useful for overlays, modals)
 */
export function stopScroll() {
  if (typeof window === 'undefined') return;
  
  const lenis = window.__lenis;
  if (lenis) {
    lenis.stop();
  }
}

/**
 * Resume smooth scrolling
 */
export function startScroll() {
  if (typeof window === 'undefined') return;
  
  const lenis = window.__lenis;
  if (lenis) {
    lenis.start();
  }
}

/**
 * Get current scroll progress (0-1)
 */
export function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0;
  
  const lenis = window.__lenis;
  if (lenis) {
    return lenis.progress || 0;
  }
  return 0;
} 