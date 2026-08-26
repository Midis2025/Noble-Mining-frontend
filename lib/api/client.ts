/**
 * Minimal Strapi REST client for the public Noble registration endpoints.
 *
 * These are public, unauthenticated endpoints — no API keys, admin tokens or
 * other credentials are used or should ever be added here.
 */

const DEFAULT_STRAPI_URL = "https://typical-butterfly-3f86e59200.strapiapp.com";

export const STRAPI_BASE_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL || DEFAULT_STRAPI_URL
).replace(/\/+$/, "");

const isDev = process.env.NODE_ENV !== "production";

/** Shape of a Strapi v5 single-entry REST response. */
export interface StrapiResponse<T> {
  data: T & { id: number; documentId: string };
  meta?: Record<string, unknown>;
}

/** Shape of a Strapi v5 collection REST response. */
export interface StrapiCollectionResponse<T> {
  data: (T & { id: number; documentId: string })[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Internal error type — never surfaced verbatim to the user. */
export class StrapiRequestError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "StrapiRequestError";
    this.status = status;
    this.body = body;
  }
}

type StrapiPayload = Record<string, unknown>;

/**
 * Strapi rejects the whole request with `400 Invalid key <name>` when the
 * payload contains a field the content type does not define yet. When that
 * happens we drop the offending key and retry, so a backend schema that is
 * still catching up can never block a real registration.
 */
function unknownKeyFrom(body: unknown): string | null {
  const error = (body as { error?: { name?: string; message?: string; details?: { key?: string } } })
    ?.error;
  if (!error || error.name !== "ValidationError") return null;
  if (!error.message?.startsWith("Invalid key")) return null;
  const key = error.details?.key ?? error.message.replace("Invalid key", "").trim();
  return key || null;
}

/**
 * POST `{ data: payload }` to a Strapi collection endpoint.
 *
 * @param path      Collection path, e.g. `/api/noble-investor-registrations`
 * @param payload   Attribute map — wrapped in the required `data` envelope
 */
export async function strapiPost<T>(
  path: string,
  payload: StrapiPayload,
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  let body = payload;
  const droppedKeys: string[] = [];

  // At most one retry per unsupported key, bounded by the payload size.
  for (let attempt = 0; attempt <= Object.keys(payload).length; attempt += 1) {
    let res: Response;

    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: body }),
      });
    } catch (cause) {
      // Network failure, DNS failure or a blocked CORS preflight.
      if (isDev) console.error(`[strapi] network/CORS failure on POST ${url}`, cause);
      throw new StrapiRequestError("Network request failed", 0, cause);
    }

    const raw = await res.text();
    let parsed: unknown = null;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = raw;
    }

    if (res.ok) {
      if (isDev && droppedKeys.length) {
        console.warn(
          `[strapi] POST ${path} succeeded after dropping field(s) not present in the Strapi schema: ${droppedKeys.join(", ")}`,
        );
      }
      return parsed as StrapiResponse<T>;
    }

    const unknownKey = res.status === 400 ? unknownKeyFrom(parsed) : null;
    if (unknownKey && unknownKey in body) {
      droppedKeys.push(unknownKey);
      body = Object.fromEntries(Object.entries(body).filter(([k]) => k !== unknownKey));
      continue;
    }

    if (isDev) console.error(`[strapi] POST ${url} failed (${res.status})`, parsed);
    throw new StrapiRequestError(`Strapi responded with ${res.status}`, res.status, parsed);
  }

  throw new StrapiRequestError("Strapi rejected every field in the payload", 400, null);
}

/**
 * GET collection or single resource from a Strapi endpoint.
 *
 * @param path Endpoint path, e.g. `/api/agendas?populate=*`
 */
export async function strapiGet<T>(
  path: string,
): Promise<StrapiCollectionResponse<T>> {
  const url = `${STRAPI_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  let res: Response;

  try {
    res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });
  } catch (cause) {
    if (isDev) console.error(`[strapi] network/CORS failure on GET ${url}`, cause);
    throw new StrapiRequestError("Network request failed", 0, cause);
  }

  const raw = await res.text();
  let parsed: unknown = null;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    parsed = raw;
  }

  if (res.ok) {
    return parsed as StrapiCollectionResponse<T>;
  }

  if (isDev) console.error(`[strapi] GET ${url} failed (${res.status})`, parsed);
  throw new StrapiRequestError(`Strapi responded with ${res.status}`, res.status, parsed);
}

/** Canonical Strapi value for the Noble Mining Investment Conference website across all entities. */
export const NOBLE_PUBLISH_TO = "Noble Mining Conference";

/**
 * Generic reusable filter enforcing website source isolation for any Strapi record with a `publishTo` property.
 *
 * Used across Agenda, Participating Companies, Speakers, etc.
 */
export function filterByPublishTo<T extends { publishTo?: string | null }>(
  items: T[],
  targetPublishTo: string = NOBLE_PUBLISH_TO
): T[] {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => item.publishTo === targetPublishTo);
}

/**
 * Fetches all pages for a Strapi collection endpoint using dynamic pagination metadata.
 */
export async function fetchAllStrapiPages<T>(
  endpoint: string,
  baseParams: Record<string, string> = {},
  pageSize: number = 25
): Promise<(T & { id: number; documentId: string })[]> {
  const params = new URLSearchParams(baseParams);
  params.set("pagination[page]", "1");
  params.set("pagination[pageSize]", String(pageSize));

  const firstPath = `${endpoint}?${params.toString()}`;
  const firstResponse = await strapiGet<T>(firstPath);

  const allItems: (T & { id: number; documentId: string })[] = [...(firstResponse.data || [])];
  const pageCount = firstResponse.meta?.pagination?.pageCount ?? 1;

  if (pageCount > 1) {
    const remainingPages = Array.from({ length: pageCount - 1 }, (_, i) => i + 2);
    const remainingResults = await Promise.all(
      remainingPages.map(async (page) => {
        const pageParams = new URLSearchParams(baseParams);
        pageParams.set("pagination[page]", String(page));
        pageParams.set("pagination[pageSize]", String(pageSize));
        try {
          const res = await strapiGet<T>(`${endpoint}?${pageParams.toString()}`);
          return res.data || [];
        } catch (err) {
          if (isDev) console.error(`[strapi] Failed to fetch page ${page} of ${endpoint}:`, err);
          return [];
        }
      })
    );

    for (const pageItems of remainingResults) {
      allItems.push(...pageItems);
    }
  }

  return allItems;
}

