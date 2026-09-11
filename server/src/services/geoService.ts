/**
 * Server-Side IP Geolocation Service
 * Performs silent city-level approximate geolocation lookups with in-memory caching.
 * Zero browser permission prompts; compliant with DPDP Act 2023.
 */

export interface ApproxLocation {
  city: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  source: 'ip';
}

interface CacheEntry {
  data: ApproxLocation;
  expiresAt: number;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const cache = new Map<string, CacheEntry>();

// Regional fallback for local development / private IP ranges
const DEFAULT_REGIONAL_LOCATION: ApproxLocation = {
  city: 'Navi Mumbai',
  region: 'Maharashtra',
  country: 'India',
  lat: 19.1557,
  lng: 72.9986,
  source: 'ip',
};

function isPrivateIp(ip: string): boolean {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') return true;
  if (ip.startsWith('10.') || ip.startsWith('192.168.')) return true;
  if (ip.startsWith('172.')) {
    const secondOctet = parseInt(ip.split('.')[1], 10);
    if (secondOctet >= 16 && secondOctet <= 31) return true;
  }
  if (ip.startsWith('fc') || ip.startsWith('fe80')) return true;
  return false;
}

export async function lookupIpLocation(clientIp: string): Promise<ApproxLocation> {
  const cleanIp = (clientIp || '').split(',')[0].trim();

  // Check in-memory cache
  const cached = cache.get(cleanIp);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  // Handle local / private loopbacks in development
  if (isPrivateIp(cleanIp)) {
    return DEFAULT_REGIONAL_LOCATION;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(
      `http://ip-api.com/json/${cleanIp}?fields=status,message,country,regionName,city,lat,lon`,
      {
        signal: controller.signal,
        headers: {
          'User-Agent': 'NSE-Elevator-Platform/1.0',
        },
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        const result: ApproxLocation = {
          city: data.city || 'Unknown City',
          region: data.regionName || 'Maharashtra',
          country: data.country || 'India',
          lat: Number(data.lat) || DEFAULT_REGIONAL_LOCATION.lat,
          lng: Number(data.lon) || DEFAULT_REGIONAL_LOCATION.lng,
          source: 'ip',
        };

        // Cache valid lookup
        cache.set(cleanIp, {
          data: result,
          expiresAt: Date.now() + CACHE_TTL_MS,
        });

        return result;
      }
    }
  } catch (err) {
    // Network timeout or error - fail silently to default
  }

  return DEFAULT_REGIONAL_LOCATION;
}
