"use client";

import React from "react";
import PartnerMarquee from "@/components/PartnerMarquee";

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const handleNavClick = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pview on" id="pv-about">
      {/* ABOUT HERO */}
      <section className="ab-hero">
        <img
          className="hero-art"
          src="/assets/hero-art.webp"
          alt="Waterfront at sunset in Boca Raton, Florida"
        />
        <div className="hero-scrim"></div>
        <div className="wrap ab-hero-inner">
          <h1>
            ABOUT
            <br />
            <span className="gr">THE CONFERENCE</span>
          </h1>
          <p className="dek">
            Connecting leading resource companies with accredited investors, analysts, and institutional funds in Boca Raton, Florida — February 17–18, 2027.
          </p>
          <div className="hero-btns">
            <button
              className="btn-teal"
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
            <a
              className="btn-ghost"
              href="#agenda"
              onClick={(e) => handleNavClick("agenda", e)}
            >
              VIEW&nbsp;AGENDA{" "}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.9"
                strokeLinecap="round"
              >
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M4 9.5h16M8 3v4M16 3v4" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <PartnerMarquee />

      {/* COLLABORATION */}
      <section className="collab">
        <div className="wrap collab-grid">
          <div className="collab-photo">
            <img
              src="/assets/images (1).jpeg"
              alt="Noble Mining Conference Collaboration"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div>
            <div className="eyebrow">ABOUT THE&nbsp;CONFERENCE</div>
            <h2>
              A Collaboration Built
              <br />
              for&nbsp;Impact
            </h2>
            <p>
              THE Noble Mining Investment Conference is a collaboration between{" "}
              <a
                href="https://www.themininginvestmentevent.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                THE Mining Investment Event
              </a>
              , which takes place annually in June in Quebec City, and{" "}
              <a
                href="https://www.noblecon.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ whiteSpace: "nowrap" }}
              >
                Noble Capital Markets
              </a>
              , a comprehensive SEC/FINRA-registered broker-dealer headquartered in Boca Raton, focused solely on serving public and private companies.
            </p>
            <p>
              THE Noble Mining Investment Conference will offer mining companies exclusive opportunities to connect with local and international family offices, high-net-worth individuals, funds, brokers, analysts, and buy-side representatives, including corporate development teams exploring international investments.
            </p>
            <div className="feat-list">
              <div className="feat-li">
                <span className="fi">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  >
                    <circle cx="9" cy="8" r="3.2" />
                    <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6S13.9 16 14.5 19" />
                    <circle cx="16.5" cy="9" r="2.6" />
                    <path d="M16 14.6c2.4.1 4 1.6 4.5 4.4" />
                  </svg>
                </span>
                One on one investor meetings
              </div>
              <div className="feat-li">
                <span className="fi">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="5" width="16" height="12" rx="2" />
                    <path d="M9 20h6M12 17v3M8 12l2.5-3 2 2 3-4" />
                  </svg>
                </span>
                Company presentations &amp; keynotes
              </div>
              <div className="feat-li">
                <span className="fi">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="6" r="2.6" />
                    <circle cx="6" cy="17" r="2.6" />
                    <circle cx="18" cy="17" r="2.6" />
                    <path d="M10.5 8l-3 6.5M13.5 8l3 6.5M8.6 17h6.8" />
                  </svg>
                </span>
                Exclusive networking events
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO SHOULD ATTEND */}
      <section className="aud">
        <div className="wrap">
          <div className="aud-head">
            <div className="eyebrow">WHO SHOULD&nbsp;ATTEND</div>
            <h2>Connect with the Right&nbsp;Audience</h2>
          </div>
          <div className="aud-grid">
            <div className="aud-card">
              <span className="aud-ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <circle cx="9" cy="8" r="3.2" />
                  <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6S13.9 16 14.5 19" />
                  <circle cx="16.5" cy="9" r="2.6" />
                  <path d="M16 14.6c2.4.1 4 1.6 4.5 4.4" />
                </svg>
              </span>
              <b>Investors</b>
              <p>Funds, family offices, HNWIs and institutional investors.</p>
            </div>
            <div className="aud-card">
              <span className="aud-ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="6.5" r="2.8" />
                  <path d="M12 9.5v3M8 21l1.5-8h5L16 21M9.5 13l-2 3M14.5 13l2 3" />
                </svg>
              </span>
              <b>Industry Leaders</b>
              <p>Mining executives and corporate development teams.</p>
            </div>
            <div className="aud-card">
              <span className="aud-ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="13" rx="2" />
                  <path d="M8 20h8M12 17v3M7.5 13l2.5-3.5 2 2 3.5-4.5M15 7h1.5v1.5" />
                </svg>
              </span>
              <b>Analysts &amp; Brokers</b>
              <p>Equity research analysts and sell-side professionals.</p>
            </div>
            <div className="aud-card">
              <span className="aud-ic">
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
              <b>Mining Companies</b>
              <p>Looking for opportunities to connect with international industry professionals.</p>
            </div>
            <div className="aud-card">
              <span className="aud-ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
                </svg>
              </span>
              <b>Global Network</b>
              <p>Build connections across international markets.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
