import "server-only";
import type * as https from "node:https";

const TMDB_BASE_URL = "https://api.themoviedb.org";

// CloudFront fallback IPs for environments with local ISP DNS blocks
const CLOUDFRONT_IPS = [
  "13.224.245.47",
  "13.224.245.63",
  "13.224.245.92",
  "13.224.245.44",
  "3.175.86.50",
  "3.175.86.67",
];

let ipIdx = 0;
function getNextCloudFrontIp() {
  const ip = CLOUDFRONT_IPS[ipIdx % CLOUDFRONT_IPS.length];
  ipIdx++;
  return ip;
}

interface FetchTmdbOptions {
  params?: Record<string, string | number | boolean | undefined | null>;
  revalidate?: number | false;
  tags?: string[];
}

/**
 * Robust server-side TMDB API request with DNS resiliency and revalidation
 */
export async function tmdbFetch<T>(
  endpoint: string,
  options: FetchTmdbOptions = {}
): Promise<T | null> {
  const token = process.env.TMDB_ACCESS_TOKEN;
  if (!token) {
    console.error(
      "[TMDB Client] Missing TMDB_ACCESS_TOKEN environment variable. Please check your configuration."
    );
    return null;
  }

  // Construct URL with query parameters
  const url = new URL(
    endpoint.startsWith("http") ? endpoint : `${TMDB_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`
  );

  if (options.params) {
    for (const [key, val] of Object.entries(options.params)) {
      if (val !== undefined && val !== null && val !== "") {
        url.searchParams.set(key, String(val));
      }
    }
  }

  // Standard fetch headers
  const headers = {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  };

  const revalidateOption =
    options.revalidate !== undefined ? options.revalidate : 3600; // default 1 hour cache

  // Attempt standard fetch first (Standard on Vercel and production hosting)
  try {
    const fetchInit: RequestInit = {
      method: "GET",
      headers,
    };

    if (typeof revalidateOption === "number") {
      fetchInit.next = {
        revalidate: revalidateOption,
        tags: options.tags,
      };
    } else if (revalidateOption === false) {
      fetchInit.cache = "no-store";
    }

    // Set a 4-second timeout for the initial standard attempt
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    fetchInit.signal = controller.signal;

    const res = await fetch(url.toString(), fetchInit);
    clearTimeout(timeoutId);

    if (res.ok) {
      return (await res.json()) as T;
    }

    if (res.status === 404) {
      return null;
    }

    if (res.status === 401 || res.status === 403) {
      console.error(`[TMDB Client] Authentication failure with status ${res.status}`);
      return null;
    }

    if (res.status === 429) {
      console.warn("[TMDB Client] Rate limit exceeded on TMDB API");
      return null;
    }
  } catch {
    // If standard fetch failed (e.g. due to ISP DNS timeout/hijacking in dev),
    // proceed to the DNS-resilient fallback below
  }

  // Fallback: Node.js https with public DNS resolver (1.1.1.1 / 8.8.8.8) and CloudFront routing
  try {
    const https = await import("node:https");
    const dns = await import("node:dns");

    const resolver = new dns.Resolver();
    resolver.setServers(["1.1.1.1", "8.8.8.8", "1.0.0.1"]);

    return await new Promise<T | null>((resolve) => {
      const fullPath = `${url.pathname}${url.search}`;

      const customLookup = (
        hostname: string,
        opts: unknown,
        cb: (err: Error | null, address: unknown, family?: number) => void
      ) => {
        const callback = (typeof opts === "function" ? opts : cb) as (
          err: Error | null,
          address: unknown,
          family?: number
        ) => void;
        const isAll = typeof opts === "object" && opts !== null && (opts as { all?: boolean }).all;

        if (hostname === "api.themoviedb.org") {
          resolver.resolve4("api.themoviedb.org", (err, addresses) => {
            if (!err && addresses && addresses.length > 0) {
              const target = addresses[0];
              if (isAll) return callback(null, [{ address: target, family: 4 }]);
              return callback(null, target, 4);
            }
            const fallback = getNextCloudFrontIp();
            if (isAll) return callback(null, [{ address: fallback, family: 4 }]);
            return callback(null, fallback, 4);
          });
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (dns as any).lookup(hostname, opts, callback);
      };

      const reqOptions: https.RequestOptions = {
        hostname: "api.themoviedb.org",
        port: 443,
        path: fullPath,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          host: "api.themoviedb.org",
        },
        lookup: customLookup as https.RequestOptions["lookup"],
        timeout: 8000,
      };

      const req = https.request(reqOptions, (res) => {
        let rawData = "";
        res.on("data", (chunk: Buffer | string) => {
          rawData += chunk;
        });
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const parsed = JSON.parse(rawData) as T;
              resolve(parsed);
            } catch {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        });
      });

      req.on("timeout", () => {
        req.destroy();
        resolve(null);
      });

      req.on("error", () => {
        resolve(null);
      });

      req.end();
    });
  } catch {
    return null;
  }
}
