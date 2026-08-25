"use client";

import React, { useState } from "react";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleNavClick = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };





  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      setEmail("");
    }
  };

  return (
    <footer className="site">
      <div className="wrap ft">
        <div className="ft-brand">
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
                className="nav-logo"
              />
            </div>
          </a>
          <p>
            Connecting resource companies with institutional investors, analysts
            and high-net-worth individuals.
          </p>
          <div className="ft-social">
            <a href="#" aria-label="X / Twitter" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l11.7 16h4.3L8.3 4H4zM4 20l6.7-7.7M13.3 11.7L20 4" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round">
                <path d="M22.5 6.8c-.2-.8-.9-1.5-1.7-1.7C19.3 4.6 12 4.6 12 4.6s-7.3 0-8.8.5c-.8.2-1.5.9-1.7 1.7C1 8.3 1 12 1 12s0 3.7.5 5.2c.2.8.9 1.5 1.7 1.7 1.5.5 8.8.5 8.8.5s7.3 0 8.8-.5c.8-.2 1.5-.9 1.7-1.7.5-1.5.5-5.2.5-5.2s0-3.7-.5-5.2z" />
                <path d="M9.8 15.5l5.7-3.5-5.7-3.5v7z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4>NAVIGATION</h4>
          <a
            className="lnk"
            href="#home"
            onClick={(e) => handleNavClick("home", e)}
          >
            Home
          </a>
          <a
            className="lnk"
            href="#about"
            onClick={(e) => handleNavClick("about", e)}
          >
            About Conference
          </a>
          <a
            className="lnk"
            href="#venue"
            onClick={(e) => handleNavClick("venue", e)}
          >
            Venue &amp; Accommodations
          </a>
          <a
            className="lnk"
            href="#agenda"
            onClick={(e) => handleNavClick("agenda", e)}
          >
            Agenda
          </a>
          <a
            className="lnk"
            href="#companies"
            onClick={(e) => handleNavClick("companies", e)}
          >
            Companies &amp; Sponsors
          </a>
          <a
            className="lnk"
            href="#speakers"
            onClick={(e) => handleNavClick("speakers", e)}
          >
            Speakers
          </a>
          <a
            className="lnk"
            href="#register"
            onClick={(e) => handleNavClick("register", e)}
          >
            Registration Portal
          </a>
        </div>
        <div>
          <h4>CONTACT</h4>
          <ul className="ft-contact">
            <li>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Jenny Choi</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <a href="mailto:jchoi@irinc.ca">jchoi@irinc.ca</a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Boca Raton, Florida</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="ft-bottom">
        <div className="wrap ft-bottom-inner">
          <div>&copy; 2027 Noble Capital Markets, Inc. All rights reserved.</div>
          <div className="ft-legal">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <span className="sep">&middot;</span>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Terms of Use
            </a>
            <span className="sep">&middot;</span>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Noble Capital Markets
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
