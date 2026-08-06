import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface FetchResult<T> {
  status: number;
  response: T | null;
}

// We rely entirely on the standard RequestInit headers now
export type FetchOptions = RequestInit;

export const honoFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<FetchResult<T>> => {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const { headers: customHeaders, ...fetchOptions } = options;

  const fetchHeaders = new Headers();
  fetchHeaders.set("Content-Type", "application/json");

  // ✅ Merge headers passed from the outside (Cookies, Auth, etc.)
  if (customHeaders) {
    const incomingHeaders = new Headers(customHeaders as HeadersInit);
    incomingHeaders.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Filter out headers that could conflict with the fetch request
      if (!["host", "connection", "content-length"].includes(lowerKey)) {
        fetchHeaders.set(key, value);
      }
    });
  }

  let fetchResponse: Response;

  if (process.env.NODE_ENV === "development") {
    fetchResponse = await fetch(`http://localhost:8787${path}`, {
      ...fetchOptions,
      headers: fetchHeaders,
    });
  } else {
    // 🎯 Magic Logic: Are we in Cloudflare's real runtime or Next.js build time?
    const isCloudflareWorker =
      typeof navigator !== "undefined" &&
      navigator.userAgent === "Cloudflare-Workers";

    if (isCloudflareWorker) {
      try {
        const { env } = await getCloudflareContext({ async: true });
        fetchResponse = await env.HONO_API.fetch(
          new Request(`https://hono-api${path}`, {
            ...fetchOptions,
            headers: fetchHeaders,
          }),
        );
      } catch (error) {
        // Fallback if binding fails
        fetchResponse = await fetch(`https://festapi.jnuits.org.bd${path}`, {
          ...fetchOptions,
          headers: fetchHeaders,
        });
      }
    } else {
      // 🛑 Next.js Build Time: Directly fetch public API to prevent build crash
      fetchResponse = await fetch(`https://festapi.jnuits.org.bd${path}`, {
        ...fetchOptions,
        headers: fetchHeaders,
      });
    }
  }

  // if (fetchResponse.status >= 400 && fetchResponse.status !== 401) {
  //   return { status: fetchResponse.status, response: null };
  // }

  try {
    const result = (await fetchResponse.json()) as T;
    return { status: fetchResponse.status, response: result };
  } catch (error) {
    return { status: fetchResponse.status, response: null };
  }
};
