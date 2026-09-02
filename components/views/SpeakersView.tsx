"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  fetchNobleSpeakers,
  applySpeakerFilters,
  getDistinctSpeakerCategories,
  getDistinctSpeakerCompanies,
  getSpeakerName,
  getSpeakerTitle,
  getSpeakerCompany,
  getSpeakerImage,
  type StrapiSpeaker,
  type SpeakerFilterOptions,
} from "@/lib/api/speakers";

interface SpeakersViewProps {
  onNavigate: (view: string) => void;
}

export default function SpeakersView({ onNavigate }: SpeakersViewProps) {
  const [speakers, setSpeakers] = useState<StrapiSpeaker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");

  // Fetch Noble speakers on mount
  const loadSpeakers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const nobleSpeakers = await fetchNobleSpeakers();
      setSpeakers(nobleSpeakers);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[SpeakersView] Failed to fetch speakers:", err);
      }
      setError(
        "Unable to load speakers at this time. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSpeakers();
  }, [loadSpeakers]);

  // Derive filter dropdown options strictly from Noble speakers
  const availableCategories = getDistinctSpeakerCategories(speakers);
  const availableCompanies = getDistinctSpeakerCompanies(speakers);

  // Apply user-selected filters
  const filterOptions: SpeakerFilterOptions = {
    search: searchQuery,
    category: selectedCategory,
    company: selectedCompany,
  };
  const filteredSpeakers = applySpeakerFilters(speakers, filterOptions);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCompany("all");
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedCategory !== "all" ||
    selectedCompany !== "all";

  const hasSpeakers = speakers.length > 0;

  return (
    <div className="pview on" id="pv-speakers">
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
            SPEAKERS
            <br />
            <span className="gr">&amp; PRESENTERS</span>
          </h1>
          <p>
            Hear from the industry leaders, investors and visionaries shaping the
            future of mining at THE Noble Mining Investment Conference.
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

      {/* LOADING STATE */}
      {loading && (
        <section className="pc-roster">
          <div className="wrap">
            <div className="pc-roster-head">
              <div className="eyebrow">THE&nbsp;LINEUP</div>
              <h2>Featured&nbsp;Speakers</h2>
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
                Loading speakers and presenters...
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
              <h2>Featured&nbsp;Speakers</h2>
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
                Unable to Load Speakers
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
                onClick={loadSpeakers}
                style={{ display: "inline-flex", margin: "0 auto" }}
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      )}

      {/* EMPTY STATE — no Noble speakers found in Strapi yet */}
      {!loading && !error && !hasSpeakers && (
        <>
          {/* COMING SOON CENTERPIECE */}
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
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                LINEUP IN PROGRESS
              </span>
              <h2>
                <span style={{ whiteSpace: "nowrap" }}>
                  Speakers <span className="gr">Coming Soon</span>
                </span>
              </h2>
              <p>
                Our speaker and presenter lineup is being finalized.<br />
                Register your interest to be the first to know as keynotes and presenters are confirmed.
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

          {/* PLACEHOLDER SPEAKER ROSTER */}
          <section className="pc-roster">
            <div className="wrap">
              <div className="pc-roster-head">
                <div className="eyebrow">THE&nbsp;LINEUP</div>
                <h2>Featured&nbsp;Speakers</h2>
              </div>
              <p className="pc-roster-note">
                Speaker and presenter announcements will appear here as they are confirmed.
              </p>
              <div className="pc-roster-grid" id="spRoster">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="pcr sp">
                    <span className="pcr-ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      >
                        <circle cx="12" cy="8" r="3.6" />
                        <path d="M5 20c.8-4 3.4-6 7-6s6.2 2 7 6" />
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

      {/* LIVE NOBLE SPEAKERS */}
      {!loading && !error && hasSpeakers && (
        <section className="pc-roster">
          <div className="wrap">
            <div className="pc-roster-head">
              <div className="eyebrow">THE&nbsp;LINEUP</div>
              <h2>Featured&nbsp;Speakers</h2>
            </div>
            <p className="pc-roster-note">
              {speakers.length} confirmed{" "}
              {speakers.length === 1 ? "speaker & presenter" : "speakers & presenters"} for
              THE Noble Mining Investment Conference.
            </p>

            {/* FILTER CONTROLS */}
            {(speakers.length > 1 || hasActiveFilters) && (
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
                    placeholder="Search speakers or companies..."
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

                {/* Category filter */}
                {availableCategories.length > 0 && (
                  <div style={{ minWidth: "120px" }}>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
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
                      <option value="all">All Categories</option>
                      {availableCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Company filter */}
                {availableCompanies.length > 0 && (
                  <div style={{ minWidth: "120px" }}>
                    <select
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
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
                      <option value="all">All Companies</option>
                      {availableCompanies.map((comp) => (
                        <option key={comp} value={comp}>
                          {comp}
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

            {/* FILTERED RESULTS COUNT */}
            {hasActiveFilters && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "var(--mut-l)",
                  marginBottom: "20px",
                }}
              >
                Showing {filteredSpeakers.length} of {speakers.length}{" "}
                {speakers.length === 1 ? "speaker" : "speakers"}
              </p>
            )}

            {/* EMPTY FILTER RESULTS */}
            {filteredSpeakers.length === 0 && hasActiveFilters && (
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
                  No Matching Speakers
                </h3>
                <p
                  style={{
                    color: "var(--mut-l)",
                    fontSize: "14px",
                    margin: "0 auto 20px",
                  }}
                >
                  No speakers match your selected search or filter criteria.
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

            {/* SPEAKER CARDS GRID */}
            {filteredSpeakers.length > 0 && (
              <div className="pc-roster-grid" id="spRoster">
                {filteredSpeakers.map((speaker) => {
                  const imageUrl = getSpeakerImage(speaker);
                  const name = getSpeakerName(speaker);
                  const title = getSpeakerTitle(speaker);
                  const company = getSpeakerCompany(speaker);

                  return (
                    <div
                      key={speaker.documentId || speaker.id}
                      className="pcr sp"
                      style={{
                        borderStyle: "solid",
                        padding: "24px 16px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* Photo / Avatar */}
                      {imageUrl ? (
                        <span
                          className="pcr-ic"
                          style={{
                            width: "68px",
                            height: "68px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "2px solid var(--teal)",
                            padding: 0,
                            background: "var(--panel-2)",
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={`${name} photo`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            loading="lazy"
                          />
                        </span>
                      ) : (
                        <span className="pcr-ic">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          >
                            <circle cx="12" cy="8" r="3.6" />
                            <path d="M5 20c.8-4 3.4-6 7-6s6.2 2 7 6" />
                          </svg>
                        </span>
                      )}

                      {/* Speaker Name */}
                      <span
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 700,
                          letterSpacing: ".04em",
                          color: "#fff",
                          marginTop: "8px",
                          lineHeight: 1.3,
                        }}
                      >
                        {name}
                      </span>

                      {/* Title / Role */}
                      {title && (
                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--teal-hi)",
                            fontWeight: 600,
                            marginTop: "4px",
                            lineHeight: 1.35,
                          }}
                        >
                          {title}
                        </span>
                      )}

                      {/* Company / Organization */}
                      {company && (
                        <span
                          style={{
                            fontSize: "10.5px",
                            color: "var(--mut-l)",
                            marginTop: "3px",
                            lineHeight: 1.35,
                          }}
                        >
                          {company}
                        </span>
                      )}

                      {/* External links: LinkedIn or Website */}
                      {(speaker.linkedin || speaker.website) && (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "center",
                            marginTop: "8px",
                          }}
                        >
                          {speaker.linkedin && (
                            <a
                              href={speaker.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${name} LinkedIn`}
                              style={{
                                color: "var(--teal-hi)",
                                opacity: 0.8,
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                              </svg>
                            </a>
                          )}
                          {speaker.website && (
                            <a
                              href={speaker.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${name} Website`}
                              style={{
                                color: "var(--teal-hi)",
                                opacity: 0.8,
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
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
            <h2>Interested in&nbsp;Speaking?</h2>
            <p>
              If you&apos;d like to be considered as a speaker or presenter, or to learn more
              about the program, please get in touch.
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
