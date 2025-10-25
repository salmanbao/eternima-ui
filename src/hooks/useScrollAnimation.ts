import { useEffect, useRef, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  animationClass?: string;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param options Configuration options for the animation
 * @returns Ref to attach to the element to be animated
 */
export const useScrollAnimation = <T extends HTMLElement>({
  threshold = 0.1,
  animationClass = 'animate-fade-in',
  delay = 0,
  stagger = false,
  staggerDelay = 100,
}: UseScrollAnimationOptions = {}): RefObject<T> => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (stagger) {
              // Stagger animation for child elements
              const children = entry.target.querySelectorAll('[data-stagger]');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add(animationClass);
                }, delay + index * staggerDelay);
              });
            } else {
              // Single element animation
              setTimeout(() => {
                entry.target.classList.add(animationClass);
              }, delay);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, animationClass, delay, stagger, staggerDelay]);

  return elementRef;
};

/**
 * Hook to check if user prefers reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
export const usePrefersReducedMotion = (): boolean => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  return prefersReducedMotion.matches;
};

/**
 * Hook to detect if device is mobile
 * @returns boolean indicating if device is mobile
 */
export const useIsMobile = (): boolean => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return isMobile;
};
