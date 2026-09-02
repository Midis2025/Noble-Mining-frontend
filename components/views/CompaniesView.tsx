"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchNobleCompanies,
  applyCompanyFilters,
  type ParticipatingCompany,
  type CompanyFilterOptions,
} from "@/lib/api/companies";
import {
  fetchNobleMediaPartners,
  type MediaPartner,
} from "@/lib/api/partners";

interface CompaniesViewProps {
  onNavigate: (view: string) => void;
}

export default function CompaniesView({ onNavigate }: CompaniesViewProps) {
  // Companies state
  const [companies, setCompanies] = useState<ParticipatingCompany[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState<boolean>(true);
  const [errorCompanies, setErrorCompanies] = useState<string | null>(null);

  // Partners state
  const [partners, setPartners] = useState<MediaPartner[]>([]);
  const [loadingPartners, setLoadingPartners] = useState<boolean>(true);
  const [errorPartners, setErrorPartners] = useState<string | null>(null);

  // Company Filters state
  const [selectedEdition, setSelectedEdition] = useState<string>("2027 Participating Companies");
  const [companySearchQuery, setCompanySearchQuery] = useState<string>("");

  // Partner Filters state
  const [partnerSearchQuery, setPartnerSearchQuery] = useState<string>("");

  // Fetch Companies
  const loadCompanies = useCallback(async () => {
    setLoadingCompanies(true);
    setErrorCompanies(null);
    try {
      const allCompanies = await fetchNobleCompanies();
      setCompanies(allCompanies);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[CompaniesView] Failed to fetch companies:", err);
      }
      setErrorCompanies(
        "Unable to load participating companies at this time. Please try again later."
      );
    } finally {
      setLoadingCompanies(false);
    }
  }, []);

  // Fetch Partners
  const loadPartners = useCallback(async () => {
    setLoadingPartners(true);
    setErrorPartners(null);
    try {
      const allPartners = await fetchNobleMediaPartners();
      setPartners(allPartners);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[CompaniesView] Failed to fetch media partners:", err);
      }
      setErrorPartners(
        "Unable to load media partners at this time. Please try again later."
      );
    } finally {
      setLoadingPartners(false);
    }
  }, []);

  useEffect(() => {
    loadCompanies();
    loadPartners();
  }, [loadCompanies, loadPartners]);

  // Clean company search query
  const effectiveCompanySearch = companySearchQuery.trim();

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    const filterOptions: CompanyFilterOptions = {
      search: effectiveCompanySearch,
    };
    return applyCompanyFilters(companies, filterOptions);
  }, [companies, effectiveCompanySearch]);

  // Filtered partners
  const filteredPartners = useMemo(() => {
    let result = partners;
    if (partnerSearchQuery.trim()) {
      const q = partnerSearchQuery.toLowerCase().trim();
      result = partners.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.Type?.toLowerCase().includes(q) ||
          p.tier?.toLowerCase().includes(q) ||
          p.Year?.toLowerCase().includes(q)
      );
    }
    return [...result].sort((a, b) =>
      (a.name || "").localeCompare(b.name || "", undefined, { sensitivity: "base" })
    );
  }, [partners, partnerSearchQuery]);

  // Type badge helper for Companies
  const renderCompanyTypeBadge = (type: string | null) => {
    if (!type) return <span style={{ color: "#94a3b8" }}>—</span>;
    const upper = type.toUpperCase().trim();

    let style: React.CSSProperties = {
      display: "inline-block",
      borderRadius: "20px",
      padding: "4px 12px",
      fontSize: "10.5px",
      fontWeight: 800,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    };

    if (upper.includes("EXPLORER")) {
      style = {
        ...style,
        color: "#d97706",
        background: "#fffbeb",
        border: "1px solid #fde68a",
      };
    } else if (upper.includes("DEVELOPER")) {
      style = {
        ...style,
        color: "#0284c7",
        background: "#f0f9ff",
        border: "1px solid #bae6fd",
      };
    } else if (upper.includes("PRODUCER")) {
      style = {
        ...style,
        color: "#059669",
        background: "#ecfdf5",
        border: "1px solid #a7f3d0",
      };
    } else {
      style = {
        ...style,
        color: "#475569",
        background: "#f1f5f9",
        border: "1px solid #e2e8f0",
      };
    }

    return <span style={style}>{upper}</span>;
  };

  // Type badge helper for Media Partners
  const renderPartnerTypeBadge = (type: string | null) => {
    if (!type) return <span style={{ color: "#94a3b8" }}>—</span>;
    const upper = type.toUpperCase().trim();

    let style: React.CSSProperties = {
      display: "inline-block",
      borderRadius: "20px",
      padding: "4px 12px",
      fontSize: "10.5px",
      fontWeight: 800,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    };

    if (upper === "PLATINUM" || upper.includes("PLATINUM")) {
      style = {
        ...style,
        color: "#6366f1",
        background: "#eef2ff",
        border: "1px solid #c7d2fe",
      };
    } else if (upper === "GOLD" || upper.includes("GOLD")) {
      style = {
        ...style,
        color: "#b45309",
        background: "#fef3c7",
        border: "1px solid #fde68a",
      };
    } else if (upper === "SILVER" || upper.includes("SILVER")) {
      style = {
        ...style,
        color: "#475569",
        background: "#f1f5f9",
        border: "1px solid #cbd5e1",
      };
    } else if (upper === "COPPER" || upper.includes("COPPER")) {
      style = {
        ...style,
        color: "#c2410c",
        background: "#fff7ed",
        border: "1px solid #fed7aa",
      };
    } else {
      style = {
        ...style,
        color: "#0f766e",
        background: "#f0fdfa",
        border: "1px solid #99f6e4",
      };
    }

    return <span style={style}>{type}</span>;
  };

  return (
    <div className="pview on" id="pv-companies">
      {/* ================= HERO ================= */}
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

      {/* ================= SECTION 1: PARTICIPATING COMPANIES 2027 ================= */}
      <section
        style={{
          background: "#f8fafc",
          padding: "50px 0 60px",
          color: "#0f172a",
        }}
      >
        <div className="wrap" style={{ maxWidth: "1200px" }}>
          {/* SECTION HEADER */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                fontSize: "11.5px",
                fontWeight: 800,
                letterSpacing: "0.16em",
                color: "var(--teal)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              THE LINEUP
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Companies &amp; Sponsors — Participating Companies 2027
            </h2>
          </div>

          {/* TOP CARD: EDITION FILTER & SEARCH */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px 30px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              border: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "22px",
            }}
          >
            {/* Left: Edition Filter */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: "#64748b",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#a30014",
                  }}
                />
                EDITION FILTER:
              </div>

              <div style={{ position: "relative", minWidth: "290px" }}>
                <select
                  value={selectedEdition}
                  onChange={(e) => setSelectedEdition(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 40px 10px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #d1d5db",
                    background: "#ffffff",
                    color: "#0f172a",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    appearance: "none",
                    outline: "none",
                  }}
                >
                  <option value="2027 Participating Companies">
                    2027 Participating Companies
                  </option>
                </select>
                <svg
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    width: "16px",
                    height: "16px",
                    color: "#64748b",
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* Right: Search Input */}
            <div style={{ position: "relative", flex: "1 1 340px", maxWidth: "440px" }}>
              <svg
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "#94a3b8",
                  pointerEvents: "none",
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search company, ticker, location, commodity..."
                value={companySearchQuery}
                onChange={(e) => setCompanySearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 16px 11px 40px",
                  borderRadius: "10px",
                  border: "1.5px solid #e2e8f0",
                  background: "#ffffff",
                  color: "#0f172a",
                  fontSize: "13.5px",
                  outline: "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#a30014";
                  e.target.style.boxShadow = "0 0 0 3px rgba(163, 0, 20, 0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
              {effectiveCompanySearch && (
                <button
                  type="button"
                  onClick={() => setCompanySearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* COUNT STATUS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13.5px",
              fontWeight: 500,
              color: "#475569",
              marginBottom: "16px",
              paddingLeft: "4px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10b981",
              }}
            />
            <span>
              Showing <strong style={{ color: "#0f172a", fontWeight: 800 }}>{filteredCompanies.length}</strong> of{" "}
              <strong style={{ color: "#0f172a", fontWeight: 800 }}>{companies.length}</strong> companies
            </span>
          </div>

          {/* LOADING STATE */}
          {loadingCompanies && (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "70px 20px",
                textAlign: "center",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: "40px",
                  height: "40px",
                  border: "3.5px solid rgba(163, 0, 20, 0.15)",
                  borderTopColor: "#a30014",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: "16px",
                }}
              />
              <p style={{ color: "#64748b", fontSize: "14px", fontWeight: 600, margin: 0 }}>
                Loading participating companies...
              </p>
            </div>
          )}

          {/* ERROR STATE */}
          {!loadingCompanies && errorCompanies && (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "48px 24px",
                textAlign: "center",
                border: "1px solid #fecaca",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                maxWidth: "540px",
                margin: "0 auto",
              }}
            >
              <h3 style={{ fontSize: "18px", color: "#111827", fontWeight: 700, marginBottom: "8px" }}>
                Unable to Load Companies
              </h3>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "0 auto 20px" }}>{errorCompanies}</p>
              <button
                type="button"
                className="btn-teal"
                onClick={loadCompanies}
                style={{ display: "inline-flex", margin: "0 auto" }}
              >
                Retry
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loadingCompanies && !errorCompanies && filteredCompanies.length === 0 && (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "60px 24px",
                textAlign: "center",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
            >
              <h3 style={{ fontSize: "18px", color: "#0f172a", fontWeight: 700, marginBottom: "8px" }}>
                No Matching Companies
              </h3>
              <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
                No companies match your search criteria.
              </p>
              <button
                type="button"
                onClick={() => setCompanySearchQuery("")}
                style={{
                  background: "#a30014",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "9px 20px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Clear Search
              </button>
            </div>
          )}

          {/* COMPANIES TABLE */}
          {!loadingCompanies && !errorCompanies && filteredCompanies.length > 0 && (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 25px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div style={{ overflowX: "auto", width: "100%" }}>
                <div style={{ minWidth: "920px" }}>
                  {/* TABLE HEADER */}
                  <div
                    style={{
                      background: "#0a0d14",
                      color: "#ffffff",
                      display: "grid",
                      gridTemplateColumns: "minmax(240px, 1.8fr) 1fr 1fr 1.3fr 1fr 130px",
                      alignItems: "center",
                      padding: "16px 24px",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    <div>COMPANY NAME</div>
                    <div>TICKER</div>
                    <div>TYPE</div>
                    <div>LOCATION</div>
                    <div>COMMODITIES</div>
                    <div style={{ textAlign: "right" }}>WEBSITE</div>
                  </div>

                  {/* TABLE BODY */}
                  <div>
                    {filteredCompanies.map((company, index) => {
                      const logoUrl =
                        company.logo?.formats?.thumbnail?.url ||
                        company.logo?.url ||
                        null;

                      return (
                        <div
                          key={company.documentId || company.id || index}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(240px, 1.8fr) 1fr 1fr 1.3fr 1fr 130px",
                            alignItems: "center",
                            padding: "16px 24px",
                            borderBottom:
                              index < filteredCompanies.length - 1
                                ? "1px solid #f1f5f9"
                                : "none",
                            background: "#ffffff",
                            transition: "background-color 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#ffffff";
                          }}
                        >
                          {/* 1. COMPANY NAME + LOGO */}
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <div
                              style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                border: "1px solid #e2e8f0",
                                background: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                flexShrink: 0,
                                padding: "4px",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                              }}
                            >
                              {logoUrl ? (
                                <img
                                  src={logoUrl}
                                  alt={`${company.companyName} logo`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                  loading="lazy"
                                />
                              ) : (
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: 800,
                                    color: "#a30014",
                                  }}
                                >
                                  {company.companyName?.charAt(0) || "M"}
                                </span>
                              )}
                            </div>

                            <div
                              style={{
                                fontSize: "13px",
                                fontWeight: 800,
                                color: "#0f172a",
                                letterSpacing: "0.02em",
                                textTransform: "uppercase",
                                lineHeight: 1.35,
                              }}
                            >
                              {company.companyName}
                            </div>
                          </div>

                          {/* 2. TICKER */}
                          <div>
                            {company.ticker ? (
                              <span
                                style={{
                                  display: "inline-block",
                                  background: "#f8fafc",
                                  border: "1px solid #e2e8f0",
                                  borderRadius: "6px",
                                  padding: "4px 10px",
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  color: "#334155",
                                  letterSpacing: "0.03em",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {company.ticker}
                              </span>
                            ) : (
                              <span style={{ color: "#94a3b8" }}>—</span>
                            )}
                          </div>

                          {/* 3. TYPE */}
                          <div>{renderCompanyTypeBadge(company.type)}</div>

                          {/* 4. LOCATION */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              fontSize: "11.5px",
                              fontWeight: 700,
                              color: "#475569",
                              letterSpacing: "0.03em",
                              textTransform: "uppercase",
                            }}
                          >
                            {company.location ? (
                              <>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#94a3b8"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  style={{ flexShrink: 0 }}
                                >
                                  <circle cx="12" cy="10" r="3" />
                                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                                </svg>
                                <span>{company.location}</span>
                              </>
                            ) : (
                              <span style={{ color: "#94a3b8" }}>—</span>
                            )}
                          </div>

                          {/* 5. COMMODITIES */}
                          <div>
                            {company.commodities && company.commodities.length > 0 ? (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                                {company.commodities.map((cmd, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      background: "#f1f5f9",
                                      border: "1px solid #e2e8f0",
                                      borderRadius: "4px",
                                      padding: "2px 6px",
                                      fontSize: "10.5px",
                                      fontWeight: 700,
                                      color: "#475569",
                                      minWidth: "22px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {cmd}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span style={{ color: "#94a3b8" }}>—</span>
                            )}
                          </div>

                          {/* 6. WEBSITE */}
                          <div style={{ textAlign: "right" }}>
                            {company.website ? (
                              <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  background: "#2fbf9c",
                                  color: "#071a24",
                                  borderRadius: "8px",
                                  padding: "8px 16px",
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  textDecoration: "none",
                                  transition: "background-color 0.15s ease",
                                  whiteSpace: "nowrap",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "#1e8f77";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#2fbf9c";
                                }}
                              >
                                Visit Website
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                              </a>
                            ) : (
                              <span style={{ color: "#94a3b8", fontSize: "12px" }}>—</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= SECTION 2: MEDIA & PARTNERS 2027 ================= */}
      <section
        style={{
          background: "#ffffff",
          padding: "60px 0 80px",
          borderTop: "1px solid #e2e8f0",
          color: "#0f172a",
        }}
      >
        <div className="wrap" style={{ maxWidth: "1200px" }}>
          {/* SECTION HEADER */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                fontSize: "11.5px",
                fontWeight: 800,
                letterSpacing: "0.16em",
                color: "var(--teal)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              OFFICIAL PARTNERS
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Media &amp; Partners 2027
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                maxWidth: "600px",
                margin: "10px auto 0",
              }}
            >
              Discover the media partners and capital markets sponsors supporting THE
              Noble Mining Investment Conference.
            </p>
          </div>

          {/* TOP CARD: SEARCH & FILTER FOR PARTNERS */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "16px",
              padding: "20px 28px",
              border: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {/* Left Tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "#0f172a",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              />
              Showing <strong>{filteredPartners.length}</strong> of <strong>{partners.length}</strong> media &amp; partners
            </div>

            {/* Right Search Input */}
            <div style={{ position: "relative", flex: "1 1 280px", maxWidth: "380px" }}>
              <svg
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "15px",
                  height: "15px",
                  color: "#94a3b8",
                  pointerEvents: "none",
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search media &amp; partners..."
                value={partnerSearchQuery}
                onChange={(e) => setPartnerSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 38px",
                  borderRadius: "10px",
                  border: "1.5px solid #d1d5db",
                  background: "#ffffff",
                  color: "#0f172a",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              {partnerSearchQuery && (
                <button
                  type="button"
                  onClick={() => setPartnerSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* LOADING PARTNERS */}
          {loadingPartners && (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "#64748b", fontSize: "14px" }}>Loading media partners...</p>
            </div>
          )}

          {/* PARTNERS TABLE */}
          {!loadingPartners && !errorPartners && filteredPartners.length > 0 && (
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 25px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div style={{ overflowX: "auto", width: "100%" }}>
                <div style={{ minWidth: "780px" }}>
                  {/* HEADER */}
                  <div
                    style={{
                      background: "#0a0d14",
                      color: "#ffffff",
                      display: "grid",
                      gridTemplateColumns: "minmax(240px, 2fr) 1.2fr 1.2fr 1.2fr 130px",
                      alignItems: "center",
                      padding: "16px 24px",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    <div>PARTNER NAME</div>
                    <div>CATEGORY</div>
                    <div>TYPE / TIER</div>
                    <div>EDITION</div>
                    <div style={{ textAlign: "right" }}>WEBSITE</div>
                  </div>

                  {/* BODY */}
                  <div>
                    {filteredPartners.map((partner, index) => {
                      const logoUrl =
                        partner.logo?.formats?.thumbnail?.url ||
                        partner.logo?.url ||
                        null;

                      return (
                        <div
                          key={partner.documentId || partner.id || index}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(240px, 2fr) 1.2fr 1.2fr 1.2fr 130px",
                            alignItems: "center",
                            padding: "16px 24px",
                            borderBottom:
                              index < filteredPartners.length - 1
                                ? "1px solid #f1f5f9"
                                : "none",
                            background: "#ffffff",
                            transition: "background-color 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#ffffff";
                          }}
                        >
                          {/* 1. Partner Name & Logo */}
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <div
                              style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                border: "1px solid #e2e8f0",
                                background: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                flexShrink: 0,
                                padding: "4px",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                              }}
                            >
                              {logoUrl ? (
                                <img
                                  src={logoUrl}
                                  alt={`${partner.name} logo`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                  loading="lazy"
                                />
                              ) : (
                                <span
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: 800,
                                    color: "#a30014",
                                  }}
                                >
                                  {partner.name?.charAt(0) || "P"}
                                </span>
                              )}
                            </div>

                            <div
                              style={{
                                fontSize: "13px",
                                fontWeight: 800,
                                color: "#0f172a",
                                letterSpacing: "0.02em",
                                textTransform: "uppercase",
                                lineHeight: 1.35,
                              }}
                            >
                              {partner.name}
                            </div>
                          </div>

                          {/* 2. Category / Tier */}
                          <div>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#475569",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                              }}
                            >
                              {partner.tier || "Media & Partners"}
                            </span>
                          </div>

                          {/* 3. Type */}
                          <div>{renderPartnerTypeBadge(partner.Type)}</div>

                          {/* 4. Edition */}
                          <div>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "#64748b",
                              }}
                            >
                              {partner.Year || "Media & Partners 2027"}
                            </span>
                          </div>

                          {/* 5. Website */}
                          <div style={{ textAlign: "right" }}>
                            {partner.website ? (
                              <a
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  background: "#2fbf9c",
                                  color: "#071a24",
                                  borderRadius: "8px",
                                  padding: "8px 16px",
                                  fontSize: "11.5px",
                                  fontWeight: 700,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  textDecoration: "none",
                                  transition: "background-color 0.15s ease",
                                  whiteSpace: "nowrap",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "#1e8f77";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#2fbf9c";
                                }}
                              >
                                Visit Website
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                              </a>
                            ) : (
                              <span style={{ color: "#94a3b8", fontSize: "12px" }}>—</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
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
