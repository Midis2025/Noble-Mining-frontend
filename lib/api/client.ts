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
