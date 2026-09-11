'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ElevatorControlPanel = dynamic(
  () => import('./ElevatorControlPanel').then((mod) => mod.ElevatorControlPanel),
  { ssr: true }
);

interface ElevatorCabLayoutProps {
  children: React.ReactNode;
}

export function ElevatorCabLayout({ children }: ElevatorCabLayoutProps) {
  const [currentFloor, setCurrentFloor] = useState('floor-g');

  useEffect(() => {
    const sectionIds = [
      'hero',
      'services',
      'industries',
      'service-areas',
      'case-studies',
      'about',
      'contact',
    ];

    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }

    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentFloor(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToFloor = (sectionId: string) => {
    setCurrentFloor(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', sectionId === 'hero' ? '/' : `#${sectionId}`);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 selection:bg-brand-orange selection:text-white font-sans antialiased">
      {/* 1. Elevator Control Operating Panel (COP) Sidebar Header */}
      <ElevatorControlPanel
        currentFloor={currentFloor}
        onSelectFloor={scrollToFloor}
        direction="idle"
      />

      {/* 2. Elevator Door Jamb Reveal Line (Desktop) */}
      <div
        className="pointer-events-none fixed inset-y-0 left-[var(--cop-width,300px)] z-[5] hidden w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent lg:block"
        aria-hidden="true"
      />

      {/* 3. Main Elevator Cab Viewport */}
      <div className="pl-0 lg:pl-[var(--cop-width,300px)]">
        {children}
      </div>
    </div>
  );
}
