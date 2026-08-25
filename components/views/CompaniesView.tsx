"use client";

import React from "react";
import PartnerMarquee from "@/components/PartnerMarquee";

interface CompaniesViewProps {
  onNavigate: (view: string) => void;
}

export default function CompaniesView({ onNavigate }: CompaniesViewProps) {
  const icons = [
    <path key="1" d="M4 21h16M6 21V8l4-3v16M14 21V10h4v11M9.5 9h.01M9.5 12h.01M9.5 15h.01" />,
    <path key="2" d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8z" />,
    <path key="3" d="M4 20h16M5 20V9h14v11M3 9l9-5 9 5M9 20v-6h6v6" />,
    <React.Fragment key="4">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20c.7-3.7 3.1-5.6 6.5-5.6s5.8 1.9 6.5 5.6" />
    </React.Fragment>,
  ];

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
            Participating company and sponsor announcements will appear here as they are
            confirmed.
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
