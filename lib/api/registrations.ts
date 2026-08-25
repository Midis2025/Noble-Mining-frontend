/**
 * Noble Mining Investment Conference registration submissions.
 *
 * The Strapi backend is shared between several conference websites, so every
 * submission is tagged with `sourceWebsite`. Strapi enumerations also cannot
 * start with a digit, which is why the AUM and market-cap dropdown values are
 * translated here instead of changing the labels shown in the UI.
 */

import { strapiPost, type StrapiResponse } from "./client";

const INVESTOR_ENDPOINT = "/api/noble-investor-registrations";
const COMPANY_ENDPOINT = "/api/noble-company-registrations";

/** Shared Strapi backend — identifies which site the registration came from. */
export const NOBLE_SOURCE_WEBSITE = "Noble Mining Investment Conference";

const isDev = process.env.NODE_ENV !== "production";

/* ---------------------------------------------------------------- helpers */

/** Normalises en/em dashes and whitespace so lookups survive label tweaks. */
function normalise(value: string): string {
  return value.replace(/[\u2012-\u2015]/g, "-").replace(/\s+/g, " ").trim();
}

/**
 * Resolves a dropdown value to its Strapi enumeration value.
 *
 * Returns `undefined` for an empty selection or an unrecognised value so the
 * key is simply omitted — an unexpected option can never 400 the whole
 * registration. Required-field enforcement stays in the form itself.
 */
function toStrapiEnum(
  value: string | undefined,
  map: Record<string, string>,
  field: string,
): string | undefined {
  const raw = normalise(value ?? "");
  if (!raw) return undefined;

  const mapped = map[raw];
  if (mapped) return mapped;

  // Already a Strapi value (e.g. the investor-type dropdown, which matches 1:1).
  const allowed = Object.values(map);
  if (allowed.includes(raw)) return raw;

  if (isDev) console.warn(`[registrations] unmapped ${field} value: "${raw}" — omitted from payload`);
  return undefined;
}

/** Trims a free-text field, omitting it when blank. */
function text(value: string | undefined): string | undefined {
  const trimmed = (value ?? "").trim();
  return trimmed ? trimmed : undefined;
}

/** Drops undefined entries so optional blanks are omitted rather than nulled. */
function compact(payload: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== undefined));
}

/* --------------------------------------------------------------- mappings */

/** Investor AUM dropdown value → Strapi enumeration value. */
export const AUM_TO_STRAPI: Record<string, string> = {
  "Under $10M": "Under $10 Million",
  "$10M - $50M": "Between $10 Million and $50 Million",
  "$50M - $250M": "Between $50 Million and $250 Million",
  "$250M - $1B": "Between $250 Million and $1 Billion",
  "Over $1B": "Over $1 Billion",
  "HNWI / Personal": "HNWI / Personal Accredited Investor",
};

/** Investor type dropdown value → Strapi enumeration value (1:1 today). */
export const INVESTOR_TYPE_TO_STRAPI: Record<string, string> = {
  "Institutional Investor": "Institutional Investor",
  "Family Office": "Family Office",
  "High Net Worth Individual (HNWI)": "High Net Worth Individual (HNWI)",
  "Fund / Portfolio Manager": "Fund / Portfolio Manager",
  "Sovereign Wealth Fund": "Sovereign Wealth Fund",
  "Mining Analyst / Investment Banker": "Mining Analyst / Investment Banker",
  "Retail / Accredited Investor": "Retail / Accredited Investor",
};

/** Primary commodity dropdown value → Strapi enumeration value. */
export const COMMODITY_TO_STRAPI: Record<string, string> = {
  "Gold & Silver": "Gold & Silver / Precious Metals",
  "Copper / Base Metals": "Copper / Base Metals",
  "Lithium / Energy Transition": "Lithium / Energy Transition",
  "Uranium / Energy": "Uranium / Energy",
  "Critical Minerals": "Critical Minerals",
  "Other Mining & Exploration": "Other Mining & Exploration",
};

/** Market cap dropdown value → Strapi enumeration value. */
export const MARKET_CAP_TO_STRAPI: Record<string, string> = {
  "Under $50M": "Under $50M",
  "$50M - $200M": "Between $50M and $200M",
  "$200M - $500M": "Between $200M and $500M",
  "$500M - $1B": "Between $500M and $1B",
  "Over $1B": "Over $1B",
};

/* --------------------------------------------------------------- investor */

/** Investor form state as held by `RegisterView`. */
export interface InvestorRegistrationInput {
  firmName: string;
  firstName: string;
  lastName: string;
  title: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  aum: string;
  investorType: string;
  notes: string;
  updates: boolean;
}

export function buildInvestorPayload(form: InvestorRegistrationInput) {
  return compact({
    companyName: form.firmName.trim(),
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    businessTitle: text(form.title),
    city: text(form.city),
    country: text(form.country),
    email: form.email.trim(),
    phone: text(form.phone),
    assetsUnderManagement: toStrapiEnum(form.aum, AUM_TO_STRAPI, "assetsUnderManagement"),
    investorType: toStrapiEnum(form.investorType, INVESTOR_TYPE_TO_STRAPI, "investorType"),
    investmentFocus: text(form.notes),
    newsletterOptIn: Boolean(form.updates),
    sourceWebsite: NOBLE_SOURCE_WEBSITE,
  });
}

export function submitNobleInvestorRegistration(
  form: InvestorRegistrationInput,
): Promise<StrapiResponse<Record<string, unknown>>> {
  return strapiPost(INVESTOR_ENDPOINT, buildInvestorPayload(form));
}

/* ---------------------------------------------------------------- company */

/** Company form state as held by `RegisterView`. */
export interface CompanyRegistrationInput {
  companyName: string;
  ticker: string;
  firstName: string;
  lastName: string;
  title: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  commodity: string;
  marketCap: string;
  overview: string;
  updates: boolean;
}

export function buildCompanyPayload(form: CompanyRegistrationInput) {
  return compact({
    companyName: form.companyName.trim(),
    tickerSymbolExchange: text(form.ticker),
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    executiveTitle: text(form.title),
    city: text(form.city),
    country: text(form.country),
    email: form.email.trim(),
    phone: text(form.phone),
    primaryCommodityResource: toStrapiEnum(
      form.commodity,
      COMMODITY_TO_STRAPI,
      "primaryCommodityResource",
    ),
    marketCapRange: toStrapiEnum(form.marketCap, MARKET_CAP_TO_STRAPI, "marketCapRange"),
    companyOverviewPresentationGoals: text(form.overview),
    newsletterOptIn: Boolean(form.updates),
    sourceWebsite: NOBLE_SOURCE_WEBSITE,
  });
}

export function submitNobleCompanyRegistration(
  form: CompanyRegistrationInput,
): Promise<StrapiResponse<Record<string, unknown>>> {
  return strapiPost(COMPANY_ENDPOINT, buildCompanyPayload(form));
}

/** Single user-facing failure message — never leaks Strapi internals. */
export const REGISTRATION_ERROR_MESSAGE =
  "Unable to submit your registration. Please try again.";
