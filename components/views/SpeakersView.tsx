"use client";

import React from "react";
import PartnerMarquee from "@/components/PartnerMarquee";

interface SpeakersViewProps {
  onNavigate: (view: string) => void;
}

export default function SpeakersView({ onNavigate }: SpeakersViewProps) {
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
