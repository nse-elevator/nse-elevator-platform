'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackScrollDepth } from './analytics';

const MILESTONES: (25 | 50 | 75 | 100)[] = [25, 50, 75, 100];

/**
 * Custom React hook for tracking page scroll depth milestones (25%, 50%, 75%, 100%)
 * Ensures each milestone is fired at most once per page visit.
 */
export function useScrollDepth() {
  const pathname = usePathname();
  const firedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset milestones on route change
    firedMilestones.current = new Set();

    let ticking = false;

    const checkScrollDepth = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPos = window.scrollY;
      const scrollPct = Math.min(100, Math.round((scrollPos / docHeight) * 100));

      for (const milestone of MILESTONES) {
        if (scrollPct >= milestone && !firedMilestones.current.has(milestone)) {
          firedMilestones.current.add(milestone);
          trackScrollDepth(milestone, pathname);
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScrollDepth();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll deferred after paint to avoid forced reflow
    const idleTimer = setTimeout(() => {
      checkScrollDepth();
    }, 1000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);
}
