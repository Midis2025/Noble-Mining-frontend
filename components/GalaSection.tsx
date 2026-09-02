"use client";

import React from "react";

interface GalaSectionProps {
  onNavigate: (view: string) => void;
}

export default function GalaSection({ onNavigate }: GalaSectionProps) {
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate("register");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="aboutv gala-section" id="gala-networking-event" style={{ borderTop: "1px solid var(--line-d)" }}>
      <div className="wrap aboutv-grid">
        <div>
          <div className="eyebrow">GALA NETWORKING EVENT – FEB 17</div>
          <h2>
            The Addison
            <br />
            Boca Raton
          </h2>
          <p className="vp">
            Join fellow investors, mining executives, industry leaders and conference attendees for an exclusive evening of networking at The Addison in Boca Raton.
          </p>

          <div className="vfeat">
            <span className="vi">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10z" />
                <circle cx="12" cy="11" r="2.3" />
              </svg>
            </span>
            <div>
              <strong style={{ color: "#ffffff", display: "block" }}>THE ADDISON</strong>
              <span style={{ fontSize: "13px", color: "#c5d6d3" }}>
                2 E. Camino Real, Boca Raton, Florida
              </span>
            </div>
          </div>

          <div className="vfeat">
            <span className="vi">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M4 9.5h16M8 3v4M16 3v4" />
              </svg>
            </span>
            <div>
              <strong style={{ color: "#ffffff", display: "block" }}>Wednesday, February 17, 2027</strong>
              <span style={{ fontSize: "13px", color: "#c5d6d3" }}>
                An Evening of Meaningful Connections
              </span>
            </div>
          </div>

          <div style={{ marginTop: "28px" }}>
            <button
              type="button"
              className="btn-teal"
              onClick={handleRegisterClick}
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

        <div className="vgrid">
          <div className="vshot big">
            <img
              src="/assets/gala-addison-exterior.jpg"
              alt="The Addison Main Entrance and Historic Banyan Tree"
              style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }}
            />
          </div>
          <div className="vshot big">
            <img
              src="/assets/gala-addison-courtyard.jpg"
              alt="The Addison Historic Courtyard and Fountain"
              style={{ width: "100%", height: "240px", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
