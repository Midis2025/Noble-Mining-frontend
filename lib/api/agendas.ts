/**
 * Strapi Agenda API client and filtering utilities for Noble Mining Conference.
 *
 * The Strapi backend is shared between several conference websites (e.g. Mining Investment Event,
 * Noble Mining Conference). All agenda queries must be filtered so only
 * `publishTo === "Noble Mining Conference"` records are processed and displayed.
 */

import { strapiGet, NOBLE_PUBLISH_TO, filterByPublishTo } from "./client";

export const AGENDAS_ENDPOINT = "/api/agendas?populate=*";

/** Canonical Strapi value for the Noble Mining Investment Conference website. */
export const NOBLE_AGENDA_PUBLISH_TO = NOBLE_PUBLISH_TO;

/** Media asset representation from Strapi v5 */
export interface StrapiMediaFile {
  id: number;
  documentId?: string;
  name: string;
  url: string;
  mime?: string;
  size?: number;
  ext?: string;
}

/** Agenda item schema from Strapi `/api/agendas` */
export interface StrapiAgenda {
  id: number;
  documentId: string;
  title: string;
  eventDate?: string | null;
  venue?: string | null;
  city?: string | null;
  country?: string | null;
  publishTo: string;
  pdfFile?: StrapiMediaFile | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/** User-selectable filter criteria */
export interface AgendaFilterOptions {
  search?: string;
  year?: string;
  city?: string;
}

/**
 * Fetches all agendas from Strapi.
 */
export async function fetchAgendas(): Promise<StrapiAgenda[]> {
  const response = await strapiGet<StrapiAgenda>(AGENDAS_ENDPOINT);
  return response.data || [];
}

/**
 * Enforces the fixed website source filter.
 * Ensures ONLY agendas for Noble Mining Conference are returned.
 */
export function filterNobleAgendas(agendas: StrapiAgenda[]): StrapiAgenda[] {
  return filterByPublishTo(agendas, NOBLE_AGENDA_PUBLISH_TO);
}

/**
 * Extracts distinct years available strictly from the Noble agendas.
 */
export function getDistinctNobleYears(nobleAgendas: StrapiAgenda[]): string[] {
  const years = new Set<string>();
  for (const agenda of nobleAgendas) {
    const text = `${agenda.title || ""} ${agenda.eventDate || ""}`;
    const matches = text.match(/\b(20\d\d)\b/g);
    if (matches) {
      matches.forEach((y) => years.add(y));
    }
  }
  return Array.from(years).sort().reverse();
}

/**
 * Extracts distinct cities available strictly from the Noble agendas.
 */
export function getDistinctNobleCities(nobleAgendas: StrapiAgenda[]): string[] {
  const cities = new Set<string>();
  for (const agenda of nobleAgendas) {
    if (agenda.city && agenda.city.trim()) {
      cities.add(agenda.city.trim());
    }
  }
  return Array.from(cities).sort();
}

/**
 * Applies user-selected filters against the already isolated Noble agenda dataset.
 */
export function applyAgendaFilters(
  nobleAgendas: StrapiAgenda[],
  filters: AgendaFilterOptions,
): StrapiAgenda[] {
  return nobleAgendas.filter((agenda) => {
    // Search query matching title, eventDate, venue, city, or country
    if (filters.search && filters.search.trim()) {
      const term = filters.search.toLowerCase().trim();
      const matchTitle = agenda.title?.toLowerCase().includes(term);
      const matchDate = agenda.eventDate?.toLowerCase().includes(term);
      const matchVenue = agenda.venue?.toLowerCase().includes(term);
      const matchCity = agenda.city?.toLowerCase().includes(term);
      const matchCountry = agenda.country?.toLowerCase().includes(term);
      if (!matchTitle && !matchDate && !matchVenue && !matchCity && !matchCountry) {
        return false;
      }
    }

    // Year filter matching title or eventDate
    if (filters.year && filters.year !== "all") {
      const targetYear = filters.year;
      const matchTitle = agenda.title?.includes(targetYear);
      const matchDate = agenda.eventDate?.includes(targetYear);
      if (!matchTitle && !matchDate) {
        return false;
      }
    }

    // City filter matching city
    if (filters.city && filters.city !== "all") {
      if (!agenda.city || agenda.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
    }

    return true;
  });
}
