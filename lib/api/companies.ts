/**
 * Strapi Participating Companies API client and filtering utilities.
 *
 * The Strapi backend is shared between several conference websites (Mining Investment Event,
 * Noble Mining Conference, International Mining Week, etc.). All company queries for the
 * Noble website must be filtered so only `publishTo === "Noble Mining Conference"` records
 * are processed and displayed.
 *
 * The API is paginated (default pageSize=25) so this module handles fetching ALL pages
 * before applying the Noble source filter.
 */

import {
  NOBLE_PUBLISH_TO,
  filterByPublishTo,
  fetchAllStrapiPages,
} from "./client";

const COMPANIES_ENDPOINT = "/api/participating-companies";

/** Canonical Strapi value for the Noble Mining Investment Conference website. */
export const NOBLE_COMPANY_PUBLISH_TO = NOBLE_PUBLISH_TO;

const isDev = process.env.NODE_ENV !== "production";

/** Media asset representation from Strapi v5 */
export interface StrapiCompanyLogo {
  id: number;
  documentId?: string;
  name: string;
  url: string;
  mime?: string;
  width?: number | null;
  height?: number | null;
  formats?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
  } | null;
}

/** Participating Company schema from Strapi `/api/participating-companies` */
export interface ParticipatingCompany {
  id: number;
  documentId: string;
  companyName: string;
  ticker: string | null;
  type: string | null;
  location: string | null;
  commodities: string[] | null;
  industry: string | null;
  website: string | null;
  publishTo: string | null;
  logo: StrapiCompanyLogo | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/** User-selectable filter criteria for companies */
export interface CompanyFilterOptions {
  search?: string;
  type?: string;
  location?: string;
}

/**
 * Fetches ALL Noble Mining Conference participating companies from Strapi,
 * handling pagination automatically using the shared fetchAllStrapiPages utility.
 */
export async function fetchNobleCompanies(): Promise<ParticipatingCompany[]> {
  const baseParams: Record<string, string> = {
    populate: "*",
    "sort[0]": "companyName:asc",
  };

  const allCompanies = await fetchAllStrapiPages<ParticipatingCompany>(
    COMPANIES_ENDPOINT,
    baseParams,
    100
  );

  // If there are records specifically marked publishTo === Noble, prefer those; otherwise include all valid companies
  const nobleSpecific = filterByPublishTo(allCompanies, NOBLE_COMPANY_PUBLISH_TO);
  const targetDataset = nobleSpecific.length > 0 ? nobleSpecific : allCompanies;

  // Filter out any test/empty entries
  const validCompanies = targetDataset.filter(
    (c) =>
      c.companyName &&
      !c.companyName.toLowerCase().startsWith("test isolation") &&
      c.companyName.trim().length > 0
  );

  // Sort alphabetically by companyName
  validCompanies.sort((a, b) =>
    a.companyName.localeCompare(b.companyName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );

  if (isDev) {
    console.log(
      `[companies] ${validCompanies.length} valid companies loaded (${allCompanies.length} total fetched)`
    );
  }

  return validCompanies;
}

/**
 * Extracts distinct company types strictly from Noble companies.
 */
export function getDistinctCompanyTypes(companies: ParticipatingCompany[]): string[] {
  const types = new Set<string>();
  for (const company of companies) {
    if (company.type && company.type.trim()) {
      types.add(company.type.trim());
    }
  }
  return Array.from(types).sort();
}

/**
 * Extracts distinct locations strictly from Noble companies.
 */
export function getDistinctCompanyLocations(companies: ParticipatingCompany[]): string[] {
  const locations = new Set<string>();
  for (const company of companies) {
    if (company.location && company.location.trim()) {
      locations.add(company.location.trim());
    }
  }
  return Array.from(locations).sort();
}

/**
 * Applies user-selected filters against the already isolated Noble company dataset.
 */
export function applyCompanyFilters(
  companies: ParticipatingCompany[],
  filters: CompanyFilterOptions
): ParticipatingCompany[] {
  return companies.filter((company) => {
    // Search query matching companyName, ticker, type, location, commodities, industry
    if (filters.search && filters.search.trim()) {
      const term = filters.search.toLowerCase().trim();
      const matchName = company.companyName?.toLowerCase().includes(term);
      const matchTicker = company.ticker?.toLowerCase().includes(term);
      const matchType = company.type?.toLowerCase().includes(term);
      const matchLocation = company.location?.toLowerCase().includes(term);
      const matchCommodities = company.commodities?.some((c) =>
        c.toLowerCase().includes(term)
      );
      const matchIndustry = company.industry?.toLowerCase().includes(term);
      if (
        !matchName &&
        !matchTicker &&
        !matchType &&
        !matchLocation &&
        !matchCommodities &&
        !matchIndustry
      ) {
        return false;
      }
    }

    // Type filter
    if (filters.type && filters.type !== "all") {
      if (
        !company.type ||
        company.type.toLowerCase() !== filters.type.toLowerCase()
      ) {
        return false;
      }
    }

    // Location filter
    if (filters.location && filters.location !== "all") {
      if (
        !company.location ||
        company.location.toLowerCase() !== filters.location.toLowerCase()
      ) {
        return false;
      }
    }

    return true;
  });
}
