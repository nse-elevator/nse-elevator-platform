'use client';

import { useScrollDepth } from '../lib/useScrollDepth';

export function ScrollDepthTracker() {
  useScrollDepth();
  return null;
}
