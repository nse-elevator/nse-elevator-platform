'use client';

import { useState, useEffect, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // in milliseconds
}

// In-memory high-speed cache store (0ms synchronous lookup)
const memoryCache = new Map<string, CacheEntry<any>>();

// In-flight promise registry to deduplicate simultaneous requests
const pendingRequests = new Map<string, Promise<any>>();

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes default freshness
const STORAGE_PREFIX = 'nse_swr_cache:';

/**
 * Retrieve data from memory cache or session storage (0ms sync)
 */
export function cacheGet<T>(key: string): T | null {
  // 1. Check in-memory first
  const memEntry = memoryCache.get(key);
  if (memEntry) {
    // Return data even if stale (Stale-While-Revalidate)
    return memEntry.data as T;
  }

  // 2. Check session storage
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${key}`);
      if (stored) {
        const parsed: CacheEntry<T> = JSON.parse(stored);
        memoryCache.set(key, parsed);
        return parsed.data;
      }
    } catch {
      // Storage unavailable or disabled
    }
  }

  return null;
}

/**
 * Check if a cached item is still within its fresh TTL
 */
export function isCacheFresh(key: string): boolean {
  const entry = memoryCache.get(key);
  if (!entry) return false;
  return Date.now() - entry.timestamp < entry.ttl;
}

/**
 * Set item into memory cache and persist to session storage
 */
export function cacheSet<T>(key: string, data: T, ttlMs: number = DEFAULT_TTL): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    ttl: ttlMs,
  };

  memoryCache.set(key, entry);

  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(entry));
    } catch {
      // Ignore quota exceeded or storage disabled
    }
  }
}

/**
 * Prefetch an API or JSON payload into the SWR cache ahead of click
 */
export async function prefetchPayload(url: string, ttlMs: number = DEFAULT_TTL): Promise<any> {
  if (isCacheFresh(url)) {
    return memoryCache.get(url)?.data;
  }

  if (pendingRequests.has(url)) {
    return pendingRequests.get(url);
  }

  const promise = (async () => {
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        cacheSet(url, data, ttlMs);
        return data;
      }
    } catch {
      // Fail silently on prefetch
    } finally {
      pendingRequests.delete(url);
    }
    return null;
  })();

  pendingRequests.set(url, promise);
  return promise;
}

/**
 * Lightweight custom Stale-While-Revalidate hook
 * Returns cached data immediately (0ms) while revalidating in background.
 */
export function useClientSwr<T>(
  key: string | null,
  fetcher: () => Promise<T>,
  fallbackData?: T,
  ttlMs: number = DEFAULT_TTL
): { data: T | undefined; isValidating: boolean; error: Error | null } {
  // Initialize with cached data for 0ms initial paint
  const [data, setData] = useState<T | undefined>(() => {
    if (!key) return fallbackData;
    const cached = cacheGet<T>(key);
    return cached !== null ? cached : fallbackData;
  });

  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!key) return;

    const cached = cacheGet<T>(key);
    if (cached !== null) {
      setData(cached);
    }

    // If cache is fresh, skip background revalidation
    if (isCacheFresh(key)) {
      return;
    }

    // Revalidate in background
    let isCancelled = false;
    setIsValidating(true);

    fetcher()
      .then((freshData) => {
        if (!isCancelled && mountedRef.current) {
          cacheSet(key, freshData, ttlMs);
          setData(freshData);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isCancelled && mountedRef.current) {
          setError(err as Error);
        }
      })
      .finally(() => {
        if (!isCancelled && mountedRef.current) {
          setIsValidating(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [key]);

  return { data, isValidating, error };
}
