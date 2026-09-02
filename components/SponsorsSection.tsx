"use client";

import React from "react";
import type { MediaPartner } from "@/lib/api/partners";

interface SponsorsSectionProps {
  partners: MediaPartner[];
  loading: boolean;
  /** Optional anchor id (the home page links to #sponsors). */
  id?: string;
}

/**
 * Sponsors band — shared by the home page and the companies page so both
 * render the exact same section (brand colors + auto-scrolling logo marquee).
 */
export default function SponsorsSection({
  partners,
  loading,
  id,
}: SponsorsSectionProps) {
  return (
    <section
      id={id}
      aria-label="Official sponsors"
      style={{
        background: "var(--lt-bg2)",
        padding: "70px 0 80px",
      }}
    >
      <style>{`
        @keyframes sponsorMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .sponsors-track {
          display: flex;
          width: max-content;
          animation: sponsorMarquee var(--sponsor-speed, 34s) linear infinite;
        }
        .sponsors-viewport:hover .sponsors-track {
          animation-play-state: paused;
        }
        .sponsors-card {
          flex-shrink: 0;
          width: 200px;
          height: 110px;
          background: #ffffff;
          border: 1px solid var(--line-l);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 10px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(16, 38, 44, .05);
          transition: all .3s ease;
        }
        .sponsors-card:hover {
          border-color: var(--teal);
          box-shadow: 0 8px 26px rgba(47, 191, 156, .18);
          transform: translateY(-4px);
        }
        .sponsors-card img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: grayscale(40%);
          opacity: .85;
          transition: all .3s ease;
        }
        .sponsors-card:hover img {
          filter: grayscale(0%);
          opacity: 1;
        }
        .sponsors-initial {
          font-size: 24px;
          font-weight: 800;
          color: var(--teal-dark);
          opacity: .75;
          transition: opacity .3s ease;
        }
        .sponsors-card:hover .sponsors-initial {
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .sponsors-track { animation: none; }
        }
      `}</style>

      <div className="wrap" style={{ maxWidth: "1200px" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              fontSize: "11.5px",
              fontWeight: 800,
              letterSpacing: "0.16em",
              color: "var(--teal)",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            OFFICIAL PARTNERS
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 36px)",
              fontWeight: 700,
              color: "var(--ink)",
              margin: 0,
            }}
          >
            Sponsors 2027
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "var(--body-d)",
              maxWidth: "600px",
              margin: "10px auto 0",
            }}
          >
            Proudly supported by our sponsors and media partners powering THE
            Noble Mining Investment Conference.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: "center", padding: "30px" }}>
            <p style={{ color: "var(--body-d)", fontSize: "14px" }}>
              Loading sponsors...
            </p>
          </div>
        )}

        {/* Auto-scrolling logo marquee */}
        {!loading && partners.length > 0 && (
          <div
            className="sponsors-viewport"
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "10px 0",
            }}
          >
            {/* Fade edges */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "90px",
                background:
                  "linear-gradient(to right, var(--lt-bg2), transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "90px",
                background:
                  "linear-gradient(to left, var(--lt-bg2), transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            {/* Track — logos duplicated for a seamless loop */}
            <div
              className="sponsors-track"
              style={
                {
                  "--sponsor-speed": `${Math.max(20, partners.length * 5)}s`,
                } as React.CSSProperties
              }
            >
              {[...partners, ...partners].map((partner, index) => {
                const logoUrl =
                  partner.logo?.formats?.thumbnail?.url ||
                  partner.logo?.url ||
                  null;

                const isClone = index >= partners.length;

                const card = (
                  <div className="sponsors-card">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${partner.name} logo`}
                        loading="lazy"
                      />
                    ) : (
                      <span className="sponsors-initial">
                        {partner.name?.charAt(0) || "S"}
                      </span>
                    )}
                  </div>
                );

                return partner.website ? (
                  <a
                    key={`sponsor-${partner.documentId || partner.name}-${index}`}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-hidden={isClone}
                    tabIndex={isClone ? -1 : undefined}
                    style={{ textDecoration: "none", flexShrink: 0 }}
                  >
                    {card}
                  </a>
                ) : (
                  <div
                    key={`sponsor-${partner.documentId || partner.name}-${index}`}
                    aria-hidden={isClone}
                    style={{ flexShrink: 0 }}
                  >
                    {card}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
