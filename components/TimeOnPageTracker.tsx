'use client';

import { useTimeOnPage } from '../lib/useTimeOnPage';

export function TimeOnPageTracker() {
  useTimeOnPage();
  return null;
}
