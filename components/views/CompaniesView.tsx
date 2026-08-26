"use client";

import React, { useState, useEffect, useCallback } from "react";
import PartnerMarquee from "@/components/PartnerMarquee";
import {
  fetchNobleCompanies,
  applyCompanyFilters,
  getDistinctCompanyTypes,
  getDistinctCompanyLocations,
  type ParticipatingCompany,
  type CompanyFilterOptions,
} from "@/lib/api/companies";

interface CompaniesViewProps {
  onNavigate: (view: string) => void;
}

export default function CompaniesView({ onNavigate }: CompaniesViewProps) {
  const [companies, setCompanies] = useState<ParticipatingCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  // Placeholder icons for "Coming Soon" cards
  const icons = [
    <path key="1" d="M4 21h16M6 21V8l4-3v16M14 21V10h4v11M9.5 9h.01M9.5 12h.01M9.5 15h.01" />,
    <path key="2" d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8z" />,
    <path key="3" d="M4 20h16M5 20V9h14v11M3 9l9-5 9 5M9 20v-6h6v6" />,
    <React.Fragment key="4">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20c.7-3.7 3.1-5.6 6.5-5.6s5.8 1.9 6.5 5.6" />
    </React.Fragment>,
  ];

  // Fetch Noble companies from Strapi on mount
  const loadCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const nobleCompanies = await fetchNobleCompanies();
      setCompanies(nobleCompanies);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[CompaniesView] Failed to fetch companies:", err);
      }
      setError(
        "Unable to load participating companies at this time. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  // Derive filter dropdown options from Noble companies
  const availableTypes = getDistinctCompanyTypes(companies);
  const availableLocations = getDistinctCompanyLocations(companies);

  // Apply user-selected filters
  const filterOptions: CompanyFilterOptions = {
    search: searchQuery,
    type: selectedType,
    location: selectedLocation,
  };
  const filteredCompanies = applyCompanyFilters(companies, filterOptions);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedLocation("all");
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedType !== "all" ||
    selectedLocation !== "all";

  // Determine if we have live companies to show
  const hasCompanies = companies.length > 0;

  return (
    <div className="pview on" id="pv-companies">
      {/* HERO */}
      <section className="pc-hero">
        <img
          className="hero-art"
          src="/assets/hero-art.webp"
          alt="Waterfront at sunset in Boca Raton, Florida"
        />
        <div className="hero-scrim"></div>
        <div className="wrap pc-hero-inner">
          <h1>
            PARTICIPATING COMPANIES
            <br />
            <span className="gr">&amp; SPONSORS</span>
          </h1>
          <p>
            Discover the mining companies presenting and the partners supporting THE
            Noble Mining Investment Conference.
          </p>
          <div className="hero-btns">
            <button
              className="btn-teal"
              type="button"
              onClick={() => onNavigate("register")}
            >
              REGISTER TO STAY&nbsp;UPDATED{" "}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <PartnerMarquee />

      {/* LOADING STATE */}
      {loading && (
        <section className="pc-roster">
          <div className="wrap">
            <div className="pc-roster-head">
              <div className="eyebrow">THE&nbsp;LINEUP</div>
              <h2>Companies &amp;&nbsp;Sponsors</h2>
            </div>
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: "40px",
                  height: "40px",
                  border: "3px solid rgba(79, 224, 187, 0.2)",
                  borderTopColor: "var(--teal)",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: "16px",
                }}
              />
              <p
                style={{
                  color: "var(--mut-l)",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                Loading participating companies...
              </p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        </section>
      )}

      {/* ERROR STATE */}
      {!loading && error && (
        <section className="pc-roster">
          <div className="wrap">
            <div className="pc-roster-head">
              <div className="eyebrow">THE&nbsp;LINEUP</div>
              <h2>Companies &amp;&nbsp;Sponsors</h2>
            </div>
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                background: "var(--panel)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 100, 100, 0.3)",
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e53e3e"
                strokeWidth="1.8"
                style={{ margin: "0 auto 16px", display: "block" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3
                style={{
                  fontSize: "18px",
                  color: "#fff",
                  marginBottom: "8px",
                }}
              >
                Unable to Load Companies
              </h3>
              <p
                style={{
                  color: "var(--mut-l)",
                  fontSize: "14px",
                  maxWidth: "460px",
                  margin: "0 auto 20px",
                }}
              >
                {error}
              </p>
              <button
                type="button"
                className="btn-teal"
                onClick={loadCompanies}
                style={{ display: "inline-flex", margin: "0 auto" }}
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      )}

      {/* EMPTY STATE — no Noble companies found but API succeeded */}
      {!loading && !error && !hasCompanies && (
        <>
          {/* COMING SOON CENTERPIECE — preserved from original */}
          <section className="pc-soon">
            <img
              className="pc-soon-bg"
              src="/assets/hero-art.webp"
              alt="Boca Raton Waterfront"
            />
            <div className="pc-soon-scrim"></div>
            <div className="pc-soon-inner">
              <span className="pc-soon-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4l3 2" />
                </svg>
                ANNOUNCEMENTS PENDING
              </span>
              <h2>
                Coming <span className="gr">Soon</span>
              </h2>
              <p>
                Our participating mining companies and sponsors will be announced here
                soon. Register your interest to be the first to know as the lineup is
                confirmed.
              </p>
              <div className="pc-soon-btns">
                <button
                  className="btn-teal"
                  type="button"
                  onClick={() => onNavigate("register")}
                >
                  REGISTER TO STAY&nbsp;UPDATED{" "}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                <button
                  className="btn-ghost"
                  type="button"
                  onClick={() => onNavigate("register-company")}
                >
                  CONTACT&nbsp;US
                </button>
              </div>
            </div>
          </section>

          {/* PLACEHOLDER ROSTER */}
          <section className="pc-roster">
            <div className="wrap">
              <div className="pc-roster-head">
                <div className="eyebrow">THE&nbsp;LINEUP</div>
                <h2>Companies &amp;&nbsp;Sponsors</h2>
              </div>
              <p className="pc-roster-note">
                Participating company and sponsor announcements will appear here as they
                are confirmed.
              </p>
              <div className="pc-roster-grid" id="pcRoster">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="pcr">
                    <span className="pcr-ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {icons[i % icons.length]}
                      </svg>
                    </span>
                    <span>COMING SOON</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* LIVE COMPANIES — when Noble companies exist */}
      {!loading && !error && hasCompanies && (
        <section className="pc-roster">
          <div className="wrap">
            <div className="pc-roster-head">
              <div className="eyebrow">THE&nbsp;LINEUP</div>
              <h2>Companies &amp;&nbsp;Sponsors</h2>
            </div>
            <p className="pc-roster-note">
              {companies.length} participating{" "}
              {companies.length === 1 ? "company" : "companies"} confirmed for
              THE Noble Mining Investment Conference.
            </p>

            {/* FILTER CONTROLS */}
            {(companies.length > 1 || hasActiveFilters) && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "28px",
                  padding: "16px",
                  background: "var(--panel)",
                  borderRadius: "12px",
                  border: "1px solid var(--line-d)",
                }}
              >
                {/* Search */}
                <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--line-d)",
                      fontSize: "14px",
                      outline: "none",
                      background: "var(--panel-2)",
                      color: "#fff",
                    }}
                  />
                </div>

                {/* Type filter */}
                {availableTypes.length > 0 && (
                  <div style={{ minWidth: "120px" }}>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid var(--line-d)",
                        fontSize: "14px",
                        background: "var(--panel-2)",
                        color: "#fff",
                      }}
                    >
                      <option value="all">All Types</option>
                      {availableTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Location filter */}
                {availableLocations.length > 0 && (
                  <div style={{ minWidth: "120px" }}>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid var(--line-d)",
                        fontSize: "14px",
                        background: "var(--panel-2)",
                        color: "#fff",
                      }}
                    >
                      <option value="all">All Locations</option>
                      {availableLocations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "1px solid var(--line-d)",
                      background: "transparent",
                      color: "var(--teal-hi)",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}

            {/* FILTERED RESULTS COUNT (when filters active) */}
            {hasActiveFilters && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "var(--mut-l)",
                  marginBottom: "20px",
                }}
              >
                Showing {filteredCompanies.length} of {companies.length}{" "}
                {companies.length === 1 ? "company" : "companies"}
              </p>
            )}

            {/* EMPTY FILTER RESULTS */}
            {filteredCompanies.length === 0 && hasActiveFilters && (
              <div
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  background: "var(--panel)",
                  borderRadius: "16px",
                  border: "1px solid var(--line-d)",
                  maxWidth: "480px",
                  margin: "0 auto",
                }}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--teal)"
                  strokeWidth="1.6"
                  style={{ margin: "0 auto 16px", display: "block", opacity: 0.7 }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h3
                  style={{
                    fontSize: "18px",
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  No Matching Companies
                </h3>
                <p
                  style={{
                    color: "var(--mut-l)",
                    fontSize: "14px",
                    margin: "0 auto 20px",
                  }}
                >
                  No companies match your selected filters.
                </p>
                <button
                  type="button"
                  className="btn-teal"
                  onClick={handleClearFilters}
                  style={{ display: "inline-flex", margin: "0 auto" }}
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* COMPANY CARDS GRID */}
            {filteredCompanies.length > 0 && (
              <div className="pc-roster-grid" id="pcRoster">
                {filteredCompanies.map((company) => (
                  <div
                    key={company.documentId || company.id}
                    className="pcr"
                    style={{
                      borderStyle: "solid",
                      cursor: company.website ? "pointer" : "default",
                      padding: "20px 16px",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      if (company.website) {
                        window.open(company.website, "_blank", "noopener,noreferrer");
                      }
                    }}
                  >
                    {/* Company Logo or Placeholder Icon */}
                    {company.logo?.url ? (
                      <span
                        className="pcr-ic"
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "10px",
                          overflow: "hidden",
                          padding: "4px",
                          background: "#fff",
                        }}
                      >
                        <img
                          src={
                            company.logo.formats?.thumbnail?.url ||
                            company.logo.url
                          }
                          alt={`${company.companyName} logo`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                          loading="lazy"
                        />
                      </span>
                    ) : (
                      <span className="pcr-ic">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 21h16M6 21V8l4-3v16M14 21V10h4v11M9.5 9h.01M9.5 12h.01M9.5 15h.01" />
                        </svg>
                      </span>
                    )}

                    {/* Company Name */}
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: ".06em",
                        color: "#fff",
                        lineHeight: 1.3,
                        display: "block",
                        marginTop: "4px",
                      }}
                    >
                      {company.companyName}
                    </span>

                    {/* Ticker */}
                    {company.ticker && (
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 600,
                          color: "var(--teal-hi)",
                          letterSpacing: ".04em",
                          display: "block",
                          marginTop: "3px",
                        }}
                      >
                        {company.ticker}
                      </span>
                    )}

                    {/* Type & Location */}
                    {(company.type || company.location) && (
                      <span
                        style={{
                          fontSize: "10px",
                          color: "var(--mut-l)",
                          display: "block",
                          marginTop: "4px",
                          lineHeight: 1.4,
                        }}
                      >
                        {[company.type, company.location]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    )}

                    {/* Commodities */}
                    {company.commodities &&
                      company.commodities.length > 0 && (
                        <span
                          style={{
                            fontSize: "9.5px",
                            color: "var(--mut-l)",
                            display: "block",
                            marginTop: "3px",
                            opacity: 0.8,
                          }}
                        >
                          {company.commodities.join(", ")}
                        </span>
                      )}

                    {/* Website indicator */}
                    {company.website && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "9.5px",
                          color: "var(--teal-hi)",
                          marginTop: "6px",
                          opacity: 0.7,
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Website
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pc-cta">
        <div className="pc-cta-band">
          <div className="pc-cta-copy">
            <div className="eyebrow">GET&nbsp;INVOLVED</div>
            <h2>Interested in Participating or&nbsp;Sponsoring?</h2>
            <p>
              Mining companies and prospective sponsors are welcome to get in touch.
              Register on this website or contact us directly for more information.
            </p>
          </div>
          <div className="pc-cta-side">
            <div className="pc-cta-row">
              <span className="ci">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </span>
              647-964-0292
            </div>
            <div className="pc-cta-row">
              <span className="ci">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinejoin="round">
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
              </span>
              <a href="mailto:jchoi@irinc.ca">jchoi@irinc.ca</a>
            </div>
            <button
              className="btn-ghost"
              type="button"
              onClick={() => onNavigate("register")}
            >
              REGISTER HERE{" "}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
