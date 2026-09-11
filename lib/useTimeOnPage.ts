'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackTimeOnPage } from './analytics';

const INTERVAL_MILESTONES = [15, 30, 60, 120, 240];

/**
 * Custom React hook for tracking active engagement time on critical conversion routes
 */
export function useTimeOnPage() {
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());
  const firedIntervals = useRef<Set<number>>(new Set());

  useEffect(() => {
    startTime.current = Date.now();
    firedIntervals.current = new Set();

    // Check milestones every 5 seconds
    const intervalTimer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime.current) / 1000);
      for (const milestone of INTERVAL_MILESTONES) {
        if (elapsedSeconds >= milestone && !firedIntervals.current.has(milestone)) {
          firedIntervals.current.add(milestone);
          trackTimeOnPage({ pageUrl: pathname, seconds: milestone });
        }
      }
    }, 5000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const finalSeconds = Math.floor((Date.now() - startTime.current) / 1000);
        if (finalSeconds >= 5) {
          trackTimeOnPage({ pageUrl: pathname, seconds: finalSeconds });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      const finalSeconds = Math.floor((Date.now() - startTime.current) / 1000);
      if (finalSeconds >= 5) {
        trackTimeOnPage({ pageUrl: pathname, seconds: finalSeconds });
      }
    };
  }, [pathname]);
}
