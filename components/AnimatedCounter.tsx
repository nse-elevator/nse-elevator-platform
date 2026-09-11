'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number; // duration in ms, default 800ms
  decimals?: number; // number of decimal places, default 0
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 800,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>(() => {
    return `${prefix}0${decimals > 0 ? '.' + '0'.repeat(decimals) : ''}${suffix}`;
  });
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Immediate fallback if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(`${prefix}${target.toFixed(decimals)}${suffix}`);
      hasAnimated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now();
          const startVal = 0;

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic curve for physical mechanical deceleration
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = startVal + (target - startVal) * easedProgress;

            setDisplayValue(`${prefix}${currentNumber.toFixed(decimals)}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(`${prefix}${target.toFixed(decimals)}${suffix}`);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, decimals, prefix, suffix]);

  return (
    <span ref={elementRef} className={className} aria-label={`${prefix}${target}${suffix}`}>
      {displayValue}
    </span>
  );
}
