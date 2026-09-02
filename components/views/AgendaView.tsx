"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  fetchAgendas,
  filterNobleAgendas,
  applyAgendaFilters,
  getDistinctNobleYears,
  getDistinctNobleCities,
  type StrapiAgenda,
  type AgendaFilterOptions,
} from "@/lib/api/agendas";

interface AgendaViewProps {
  onNavigate: (view: string) => void;
}

const DEFAULT_PAGES = ["/assets/boca-agenda-page-1.png"];
const DEFAULT_PDF_URL = "/assets/BOCA%20-%20AGENDA%20(1).pdf";
const DEFAULT_PDF_FILENAME = "BOCA - AGENDA (1).pdf";

export default function AgendaView({ onNavigate }: AgendaViewProps) {
  const [agendas, setAgendas] = useState<StrapiAgenda[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedAgendaId, setSelectedAgendaId] = useState<string | null>(null);

  // PDF Viewer controls
  const [agPage, setAgPage] = useState(0);
  const [agZoom, setAgZoom] = useState(100);

  // 1. Fetch live agendas from Strapi on mount
  const loadAgendas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allAgendas = await fetchAgendas();
      setAgendas(allAgendas);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[AgendaView] Failed to fetch agendas:", err);
      }
      setError("Unable to load conference agendas at this time. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAgendas();
  }, [loadAgendas]);

  // 2. Fixed website filter: ONLY Noble Mining Conference
  const nobleAgendas = filterNobleAgendas(agendas);

  // 3. Derive filter dropdown options strictly from Noble agendas
  const availableYears = getDistinctNobleYears(nobleAgendas);
  const availableCities = getDistinctNobleCities(nobleAgendas);

  // 4. Apply user-selected filters to the Noble dataset
  const filterOptions: AgendaFilterOptions = {
    search: searchQuery,
    year: selectedYear,
    city: selectedCity,
  };
  const filteredAgendas = applyAgendaFilters(nobleAgendas, filterOptions);

  // Active selected agenda item
  const activeAgenda =
    (selectedAgendaId
      ? filteredAgendas.find((a) => a.documentId === selectedAgendaId || String(a.id) === selectedAgendaId)
      : null) ||
    filteredAgendas[0] ||
    nobleAgendas[0] ||
    null;

  // Resolved PDF URL & File Name
  const pdfFileUrl = activeAgenda?.pdfFile?.url || DEFAULT_PDF_URL;
  const pdfFileName = activeAgenda?.pdfFile?.name || DEFAULT_PDF_FILENAME;
  const pages = DEFAULT_PAGES;

  const handleDownload = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const a = document.createElement("a");
    a.href = pdfFileUrl;
    a.download = pdfFileName;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setSelectedCity("all");
    setSelectedAgendaId(null);
  };

  const handleZoomIn = () => {
    setAgZoom((prev) => Math.min(160, prev + 10));
  };

  const handleZoomOut = () => {
    setAgZoom((prev) => Math.max(60, prev - 10));
  };

  const handlePrev = () => {
    setAgPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setAgPage((prev) => Math.min(pages.length - 1, prev + 1));
  };

  // Safe formatting for event location without "null" strings
  const formatLocation = (agenda: StrapiAgenda) => {
    const parts = [agenda.venue, agenda.city, agenda.country].filter(Boolean);
    return parts.join(", ");
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) || selectedYear !== "all" || selectedCity !== "all";

  return (
    <div className="pview on" id="pv-agenda">
      {/* HERO */}
      <section className="ag-hero">
        <img
          className="hero-art"
          src="/assets/hero-art.webp"
          alt="Waterfront at sunset in Boca Raton, Florida"
        />
        <div className="hero-scrim"></div>
        <div className="wrap ag-hero-inner">
          <h1>
            THE <span className="gr">AGENDA</span>
          </h1>
          <p>
            {activeAgenda?.eventDate
              ? `Two days of high-impact presentations, one on one investor meetings and exceptional networking — ${activeAgenda.eventDate}.`
              : "Two days of high-impact presentations, one on one investor meetings and exceptional networking — February 17–18, 2027."}
          </p>
          <div className="hero-btns">
            <button
              className="btn-teal js-ag-dl"
              type="button"
              onClick={handleDownload}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4v11M7.5 11.5L12 16l4.5-4.5M5 19.5h14" />
              </svg>{" "}
              DOWNLOAD&nbsp;AGENDA
            </button>
            <button
              className="btn-ghost"
              type="button"
              onClick={() => onNavigate("register")}
            >
              REGISTER&nbsp;HERE{" "}
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

      {/* AGENDA SECTION */}
      <section className="ag-pdf" id="agPdf">
        <div className="wrap">
          <div className="agp-head">
            <div className="eyebrow">CONFERENCE&nbsp;SCHEDULE</div>
            <h2>{activeAgenda?.title || "Full Agenda"}</h2>
          </div>

          {activeAgenda && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                fontSize: "14px",
                color: "var(--teal-dark)",
              }}
            >
              {activeAgenda.eventDate && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(18, 77, 86, 0.08)",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontWeight: 500,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {activeAgenda.eventDate}
                </span>
              )}
              {formatLocation(activeAgenda) && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(18, 77, 86, 0.08)",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontWeight: 500,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {formatLocation(activeAgenda)}
                </span>
              )}
            </div>
          )}

          <p className="agp-note">
            Browse the preliminary conference schedule below. Sessions and timings are subject to change.
          </p>

          {/* FILTER CONTROLS (Rendered when multiple agendas or filters available) */}
          {(nobleAgendas.length > 1 || hasActiveFilters) && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "28px",
                padding: "16px",
                background: "#fff",
                borderRadius: "12px",
                border: "1px solid var(--line-l)",
                boxShadow: "0 4px 12px rgba(10, 40, 50, 0.04)",
              }}
            >
              <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
                <input
                  type="text"
                  placeholder="Search agenda..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--line-l)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {availableYears.length > 0 && (
                <div style={{ minWidth: "120px" }}>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--line-l)",
                      fontSize: "14px",
                      background: "#fff",
                    }}
                  >
                    <option value="all">All Years</option>
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {availableCities.length > 0 && (
                <div style={{ minWidth: "120px" }}>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--line-l)",
                      fontSize: "14px",
                      background: "#fff",
                    }}
                  >
                    <option value="all">All Locations</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid var(--line-l)",
                    background: "#f4f7f6",
                    color: "var(--ink)",
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

          {/* MULTIPLE NOBLE AGENDAS SELECTOR TABS */}
          {filteredAgendas.length > 1 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              {filteredAgendas.map((item) => {
                const isSelected = activeAgenda?.documentId === item.documentId || activeAgenda?.id === item.id;
                return (
                  <button
                    key={item.documentId || item.id}
                    type="button"
                    onClick={() => setSelectedAgendaId(item.documentId || String(item.id))}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: isSelected ? "2px solid var(--teal)" : "1px solid var(--line-l)",
                      background: isSelected ? "var(--teal)" : "#fff",
                      color: isSelected ? "#fff" : "var(--ink)",
                      fontSize: "13px",
                      fontWeight: isSelected ? 600 : 400,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {item.title} {item.eventDate ? `(${item.eventDate})` : ""}
                  </button>
                );
              })}
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid var(--line-l)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: "40px",
                  height: "40px",
                  border: "3px solid rgba(18, 77, 86, 0.2)",
                  borderTopColor: "var(--teal)",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: "16px",
                }}
              />
              <p style={{ color: "var(--body-d)", fontSize: "14px", margin: 0 }}>
                Loading agenda schedule...
              </p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #fed7d7",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e53e3e"
                strokeWidth="1.8"
                style={{ margin: "0 auto 16px" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3 style={{ fontSize: "18px", color: "var(--ink)", marginBottom: "8px" }}>
                Unable to Load Agenda
              </h3>
              <p style={{ color: "var(--body-d)", fontSize: "14px", maxWidth: "460px", margin: "0 auto 20px" }}>
                {error}
              </p>
              <button
                type="button"
                className="btn-teal"
                onClick={loadAgendas}
                style={{ display: "inline-flex", margin: "0 auto" }}
              >
                Retry
              </button>
            </div>
          )}

          {/* EMPTY STATE - NO NOBLE AGENDAS OR NO MATCHING FILTERS */}
          {!loading && !error && filteredAgendas.length === 0 && (
            <div
              style={{
                padding: "54px 24px",
                textAlign: "center",
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid var(--line-l)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--teal)"
                strokeWidth="1.6"
                style={{ margin: "0 auto 16px", opacity: 0.8 }}
              >
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M4 9.5h16M8 3v4M16 3v4" />
              </svg>
              <h3 style={{ fontSize: "19px", color: "var(--ink)", marginBottom: "8px" }}>
                {hasActiveFilters ? "No Matching Agendas" : "No Agendas Available"}
              </h3>
              <p style={{ color: "var(--body-d)", fontSize: "14px", maxWidth: "460px", margin: "0 auto 20px" }}>
                {hasActiveFilters
                  ? "No Noble Mining Conference agendas match your selected filters."
                  : "The official conference agenda schedule will be published soon. Please check back shortly."}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  className="btn-teal"
                  onClick={handleClearFilters}
                  style={{ display: "inline-flex", margin: "0 auto" }}
                >
                  Clear Filters
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={loadAgendas}
                  style={{ display: "inline-flex", margin: "0 auto" }}
                >
                  Refresh
                </button>
              )}
            </div>
          )}

          {/* PDF VIEWER (When agenda is loaded and active) */}
          {!loading && !error && activeAgenda && (
            <div className="pdfv">
              {pages.length > 1 && (
                <div className="pdfv-thumbs" id="agThumbs">
                  {pages.map((p, i) => (
                    <button
                      key={i}
                      className={`pdfv-thumb ${i === agPage ? "on" : ""}`}
                      onClick={() => setAgPage(i)}
                      aria-label={`Page ${i + 1}`}
                    >
                      <img src={p} alt="" loading="lazy" />
                      <span>{i + 1}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className="pdfv-main">
                <div className="pdfv-bar">
                  <button
                    className="pdfv-btn"
                    id="agPrev"
                    aria-label="Previous page"
                    onClick={handlePrev}
                    disabled={agPage === 0}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 6l-6 6 6 6" />
                    </svg>
                  </button>
                  <span className="lbl" id="agLbl">
                    {agPage + 1} / {pages.length}
                  </span>
                  <button
                    className="pdfv-btn"
                    id="agNext"
                    aria-label="Next page"
                    onClick={handleNext}
                    disabled={agPage === pages.length - 1}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 6l6 6-6 6" />
                    </svg>
                  </button>
                  <span className="grow"></span>
                  <button
                    className="pdfv-btn"
                    id="agZOut"
                    aria-label="Zoom out"
                    onClick={handleZoomOut}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M6 12h12" />
                    </svg>
                  </button>
                  <span className="lbl" id="agZLbl">
                    {agZoom}%
                  </span>
                  <button
                    className="pdfv-btn"
                    id="agZIn"
                    aria-label="Zoom in"
                    onClick={handleZoomIn}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M12 6v12M6 12h12" />
                    </svg>
                  </button>
                  <button className="pdfv-dl" id="agDl" onClick={handleDownload}>
                    DOWNLOAD&nbsp;PDF{" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 4v11M7.5 11.5L12 16l4.5-4.5M5 19.5h14" />
                    </svg>
                  </button>
                </div>
                <div className="pdfv-stage" id="agStage">
                  <img
                    src={pages[agPage]}
                    alt={`Agenda page ${agPage + 1}`}
                    style={{ transform: `scale(${agZoom / 100})` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PLAN BAND */}
      <section className="ag-plan">
        <div className="wrap">
          <div className="ag-plan-band">
            <div className="ag-plan-ic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M4 9.5h16M8 3v4M16 3v4M8 13.5h2M11 13.5h2M14 13.5h2M8 16.5h2M11 16.5h2" />
              </svg>
            </div>
            <div className="ag-plan-copy">
              <b>Plan Your Conference&nbsp;Experience</b>
              <p>
                Register to receive agenda updates and secure your spot at THE Noble
                Mining Investment Conference.
              </p>
            </div>
            <button
              className="btn-ghost"
              type="button"
              onClick={() => onNavigate("register")}
            >
              REGISTER&nbsp;HERE{" "}
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
