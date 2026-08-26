/**
 * Strapi Speakers API client and filtering utilities for Noble Mining Conference.
 *
 * All speaker queries must be filtered so only `publishTo === "Noble Mining Conference"`
 * records are processed and displayed.
 *
 * Uses the shared `filterByPublishTo` and `fetchAllStrapiPages` utilities to ensure
 * architectural consistency with Agenda and Participating Companies.
 */

import {
  NOBLE_PUBLISH_TO,
  filterByPublishTo,
  fetchAllStrapiPages,
} from "./client";
import type { StrapiCompanyLogo } from "./companies";

const SPEAKERS_ENDPOINT = "/api/speakers";

export const NOBLE_SPEAKER_PUBLISH_TO = NOBLE_PUBLISH_TO;

const isDev = process.env.NODE_ENV !== "production";

/** Speaker schema from Strapi `/api/speakers` */
export interface StrapiSpeaker {
  id: number;
  documentId: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  title?: string | null;
  position?: string | null;
  company?: string | null;
  organization?: string | null;
  bio?: string | null;
  image?: StrapiCompanyLogo | null;
  photo?: StrapiCompanyLogo | null;
  profileImage?: StrapiCompanyLogo | null;
  avatar?: StrapiCompanyLogo | null;
  publishTo?: string | null;
  website?: string | null;
  linkedin?: string | null;
  category?: string | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/** User-selectable filter criteria for speakers */
export interface SpeakerFilterOptions {
  search?: string;
  category?: string;
  company?: string;
}

/**
 * Resolves the full display name of a speaker.
 */
export function getSpeakerName(speaker: StrapiSpeaker): string {
  if (speaker.name && speaker.name.trim()) return speaker.name.trim();
  const parts = [speaker.firstName, speaker.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ").trim();
  return "Featured Speaker";
}

/**
 * Resolves the title / designation of a speaker.
 */
export function getSpeakerTitle(speaker: StrapiSpeaker): string {
  return (speaker.title || speaker.position || "").trim();
}

/**
 * Resolves the company / organization of a speaker.
 */
export function getSpeakerCompany(speaker: StrapiSpeaker): string {
  return (speaker.company || speaker.organization || "").trim();
}

/**
 * Resolves the image URL of a speaker.
 */
export function getSpeakerImage(speaker: StrapiSpeaker): string | null {
  const media = speaker.image || speaker.photo || speaker.profileImage || speaker.avatar;
  if (!media) return null;
  return media.formats?.thumbnail?.url || media.url || null;
}

/**
 * Fetches all Noble Mining Conference speakers from Strapi, handling pagination
 * dynamically and applying the shared Noble source filter.
 */
export async function fetchNobleSpeakers(): Promise<StrapiSpeaker[]> {
  const baseParams: Record<string, string> = {
    "filters[publishTo][$eq]": NOBLE_SPEAKER_PUBLISH_TO,
    populate: "*",
  };

  const allSpeakers = await fetchAllStrapiPages<StrapiSpeaker>(
    SPEAKERS_ENDPOINT,
    baseParams,
    25
  );

  // Apply the shared reusable filter for safety
  const nobleSpeakers = filterByPublishTo(allSpeakers, NOBLE_SPEAKER_PUBLISH_TO);

  if (isDev) {
    console.log(
      `[speakers] ${nobleSpeakers.length} Noble speakers loaded (${allSpeakers.length} total fetched)`
    );
  }

  return nobleSpeakers;
}

/**
 * Extracts distinct speaker categories strictly from Noble speakers.
 */
export function getDistinctSpeakerCategories(speakers: StrapiSpeaker[]): string[] {
  const categories = new Set<string>();
  for (const speaker of speakers) {
    if (speaker.category && speaker.category.trim()) {
      categories.add(speaker.category.trim());
    }
  }
  return Array.from(categories).sort();
}

/**
 * Extracts distinct companies strictly from Noble speakers.
 */
export function getDistinctSpeakerCompanies(speakers: StrapiSpeaker[]): string[] {
  const companies = new Set<string>();
  for (const speaker of speakers) {
    const comp = getSpeakerCompany(speaker);
    if (comp) {
      companies.add(comp);
    }
  }
  return Array.from(companies).sort();
}

/**
 * Applies user-selected search and filters against the Noble speaker dataset.
 */
export function applySpeakerFilters(
  speakers: StrapiSpeaker[],
  filters: SpeakerFilterOptions
): StrapiSpeaker[] {
  return speakers.filter((speaker) => {
    const name = getSpeakerName(speaker).toLowerCase();
    const title = getSpeakerTitle(speaker).toLowerCase();
    const company = getSpeakerCompany(speaker).toLowerCase();
    const bio = (speaker.bio || "").toLowerCase();
    const category = (speaker.category || "").toLowerCase();

    // Search query
    if (filters.search && filters.search.trim()) {
      const term = filters.search.toLowerCase().trim();
      const matchName = name.includes(term);
      const matchTitle = title.includes(term);
      const matchCompany = company.includes(term);
      const matchBio = bio.includes(term);
      const matchCategory = category.includes(term);
      if (!matchName && !matchTitle && !matchCompany && !matchBio && !matchCategory) {
        return false;
      }
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      if (category !== filters.category.toLowerCase()) {
        return false;
      }
    }

    // Company filter
    if (filters.company && filters.company !== "all") {
      if (company !== filters.company.toLowerCase()) {
        return false;
      }
    }

    return true;
  });
}
