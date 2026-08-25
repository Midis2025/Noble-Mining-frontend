"use client";

import React, { useState } from "react";
import PartnerMarquee from "@/components/PartnerMarquee";

interface AgendaViewProps {
  onNavigate: (view: string) => void;
}

export default function AgendaView({ onNavigate }: AgendaViewProps) {
  const [agPage, setAgPage] = useState(0);
  const [agZoom, setAgZoom] = useState(100);

  const pages = ["/assets/boca-agenda-page-1.png"];
  const pdfFileUrl = "/assets/BOCA%20-%20AGENDA%20(1).pdf";
  const pdfFileName = "BOCA - AGENDA (1).pdf";

  const handleDownload = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const a = document.createElement("a");
    a.href = pdfFileUrl;
    a.download = pdfFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
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
            Two days of high-impact presentations, one on one investor meetings and
            exceptional networking — February 17–18, 2027.
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

      <PartnerMarquee />

      {/* PDF VIEWER */}
      <section className="ag-pdf" id="agPdf">
        <div className="wrap">
          <div className="agp-head">
            <div className="eyebrow">CONFERENCE&nbsp;SCHEDULE</div>
            <h2>Full&nbsp;Agenda</h2>
          </div>
          <p className="agp-note">
            Browse the preliminary two-day conference schedule below. Sessions and
            timings are subject to change.
          </p>
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
