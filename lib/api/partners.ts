/**
 * Strapi Media Partners / Sponsors API client.
 */

import {
  NOBLE_PUBLISH_TO,
  fetchAllStrapiPages,
  type StrapiResponse,
} from "./client";

const MEDIA_PARTNERS_ENDPOINT = "/api/media-partners";

export interface StrapiMediaLogo {
  id: number;
  documentId?: string;
  name: string;
  url: string;
  mime?: string;
  width?: number | null;
  height?: number | null;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
  } | null;
}

export interface MediaPartner {
  id: number;
  documentId: string;
  name: string;
  website: string | null;
  tier: string | null;
  Type: string | null;
  Year: string | null;
  displayOrder: number;
  publishTo: string | null;
  logo: StrapiMediaLogo | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/**
 * Fetches all Media Partners / Sponsors for Noble Mining Conference.
 */
export async function fetchNobleMediaPartners(): Promise<MediaPartner[]> {
  const baseParams: Record<string, string> = {
    "filters[publishTo][$eq]": NOBLE_PUBLISH_TO,
    populate: "*",
    "sort[0]": "displayOrder:asc",
    "sort[1]": "name:asc",
  };

  try {
    const partners = await fetchAllStrapiPages<MediaPartner>(
      MEDIA_PARTNERS_ENDPOINT,
      baseParams,
      100
    );
    return partners;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[partners] Failed to fetch media partners:", err);
    }
    return [];
  }
}
