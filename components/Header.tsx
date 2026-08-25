"use client";

import React, { useState } from "react";

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export default function Header({ activeView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="site">
      <div className="wrap hdr">
        <a
          className="brand"
          href="#home"
          onClick={(e) => handleNavClick("home", e)}
        >
          <div className="brand-logos">
            <div className="noble-cm nav-nobel-brand">
              <img
                src="/assets/Asset 10@2x.png"
                alt="Noble Capital Markets"
                className="nav-nobel-logo"
              />
            </div>
            <div className="brand-divider" aria-hidden="true" />
            <img
              src="/assets/THE Event Global Logo.png"
              alt="Global Events - THE Mining Investment Event"
              className="nav-logo nav-circle-logo"
            />
          </div>
        </a>
        <nav className="main">
          <a
            href="#about"
            id="navAbout"
            className={activeView === "about" ? "active" : ""}
            onClick={(e) => handleNavClick("about", e)}
          >
            About
          </a>
          <a
            href="#venue"
            id="navVenue"
            className={activeView === "venue" ? "active" : ""}
            onClick={(e) => handleNavClick("venue", e)}
          >
            Venue
          </a>
          <a
            href="#agenda"
            id="navAgenda"
            className={activeView === "agenda" ? "active" : ""}
            onClick={(e) => handleNavClick("agenda", e)}
          >
            Agenda
          </a>
          <a
            href="#companies"
            id="navCompanies"
            className={activeView === "companies" ? "active" : ""}
            onClick={(e) => handleNavClick("companies", e)}
          >
            Companies &amp; Sponsors
          </a>
          <a
            href="#speakers"
            id="navSpeakers"
            className={activeView === "speakers" ? "active" : ""}
            onClick={(e) => handleNavClick("speakers", e)}
          >
            Speakers
          </a>
        </nav>
        <button
          className="btn-register"
          type="button"
          aria-label="Register for event"
          onClick={(e) => handleNavClick("register", e)}
        >
          <span>REGISTER</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <button
          className="burger"
          id="burger"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`} id="mobileMenu">
        <a href="#home" onClick={(e) => handleNavClick("home", e)}>
          Home
        </a>
        <a href="#about" onClick={(e) => handleNavClick("about", e)}>
          About
        </a>
        <a href="#venue" onClick={(e) => handleNavClick("venue", e)}>
          Venue
        </a>
        <a href="#agenda" onClick={(e) => handleNavClick("agenda", e)}>
          Agenda
        </a>
        <a href="#companies" onClick={(e) => handleNavClick("companies", e)}>
          Companies &amp; Sponsors
        </a>
        <a href="#speakers" onClick={(e) => handleNavClick("speakers", e)}>
          Speakers
        </a>
        <a href="#register" onClick={(e) => handleNavClick("register", e)}>
          Register
        </a>
      </div>
    </header>
  );
}
