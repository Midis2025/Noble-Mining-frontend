"use client";

import React, { useState } from "react";
import PartnerMarquee from "@/components/PartnerMarquee";
import {
  REGISTRATION_ERROR_MESSAGE,
  submitNobleCompanyRegistration,
  submitNobleInvestorRegistration,
} from "@/lib/api/registrations";

interface RegisterViewProps {
  onNavigate?: (view: string) => void;
  initialTab?: "investor" | "company";
  mode?: "tracks" | "form";
}

const INVESTOR_FORM_DEFAULTS = {
  firmName: "",
  firstName: "",
  lastName: "",
  title: "",
  city: "",
  country: "",
  email: "",
  phone: "",
  aum: "",
  investorType: "Institutional Investor",
  notes: "",
  updates: true,
};

const COMPANY_FORM_DEFAULTS = {
  companyName: "",
  ticker: "",
  firstName: "",
  lastName: "",
  title: "",
  city: "",
  country: "",
  email: "",
  phone: "",
  commodity: "",
  marketCap: "",
  overview: "",
  updates: true,
};

export default function RegisterView({
  onNavigate,
  initialTab = "investor",
  mode = "form",
}: RegisterViewProps) {
  const [activeTab, setActiveTab] = useState<"investor" | "company">(initialTab);
  const [submitted, setSubmitted] = useState(false);
  const [submittedType, setSubmittedType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Investor form state
  const [invForm, setInvForm] = useState(INVESTOR_FORM_DEFAULTS);

  // Company form state
  const [compForm, setCompForm] = useState(COMPANY_FORM_DEFAULTS);

  const handleOpenForm = (tab: "investor" | "company") => {
    setActiveTab(tab);
    setSubmitted(false);
    setErrorMsg("");
    if (onNavigate) {
      onNavigate(tab === "investor" ? "register-investor" : "register-company");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; // guard against double-clicks / duplicate submits
    setSubmitting(true);
    setErrorMsg("");

    try {
      await submitNobleInvestorRegistration(invForm);
      setInvForm(INVESTOR_FORM_DEFAULTS);
      setSubmittedType("Investor");
      setSubmitted(true);
    } catch {
      // Details are logged by the API client in development only.
      setErrorMsg(REGISTRATION_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; // guard against double-clicks / duplicate submits
    setSubmitting(true);
    setErrorMsg("");

    try {
      await submitNobleCompanyRegistration(compForm);
      setCompForm(COMPANY_FORM_DEFAULTS);
      setSubmittedType("Company");
      setSubmitted(true);
    } catch {
      // Details are logged by the API client in development only.
      setErrorMsg(REGISTRATION_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  };

  // MODE 1: TRACK SELECTION OVERVIEW PAGE
  if (mode === "tracks") {
    return (
      <div className="pview on" id="pv-register">
        {/* HERO */}
        <section className="reg-hero">
          <img
            className="hero-art"
            src="/assets/hero-art.webp"
            alt="Registration Background"
          />
          <div className="hero-scrim"></div>
          <div className="wrap reg-hero-inner">
            <div className="reg-hero-left">
              <span className="reg-badge">SAVE THE DATE — INVITATION&nbsp;ONLY</span>
              <h1>
                REGISTRATION <br />
                <span className="gr">PORTAL</span>
              </h1>
              <div className="reg-bar"></div>
            </div>
            <div className="reg-event-card">
              <div className="reg-card-loc">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Boca Raton Innovation Campus, Florida</span>
              </div>
              <div className="reg-card-date">February 17–18, 2027</div>
              <p className="reg-card-sub">
                THE Noble Mining Investment Conference: Invitation-only Tier 1 Conference for mining companies, accredited investors, family offices, institutions and funds.
              </p>
            </div>
          </div>
        </section>

        <PartnerMarquee />

        {/* TRACK SELECTION CARDS */}
        <section className="reg-tracks">
          <div className="wrap">
            <div className="reg-tracks-head">
              <span className="eyebrow">CHOOSE YOUR PARTICIPATION&nbsp;TRACK</span>
              <h2>Tailored Access for Investors &amp;&nbsp;Companies</h2>
              <div className="reg-div-line"></div>
            </div>
            <div className="reg-track-grid">
              {/* TRACK 1: INVESTOR */}
              <div className="reg-track-card active">
                <div className="reg-track-top">
                  <div className="reg-track-meta">
                    <span className="reg-tag">FOR INVESTORS</span>
                    <span className="reg-num">01</span>
                  </div>
                  <h3>Register as an Investor</h3>
                  <p>
                    Register as an accredited investor, family office, institution or fund to access privately arranged 1 on 1 meetings with leading mining companies.
                  </p>
                  <div className="reg-feats">
                    <div className="reg-feat-item">
                      <span className="check-ic">✓</span>
                      <span>1 on 1 Private Meetings</span>
                    </div>
                    <div className="reg-feat-item">
                      <span className="check-ic">✓</span>
                      <span>Access to Keynotes, Panels and Presentations</span>
                    </div>
                    <div className="reg-feat-item">
                      <span className="check-ic">✓</span>
                      <span>Networking Events and Gala Event, February 17</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-track btn-teal"
                  onClick={() => handleOpenForm("investor")}
                >
                  REGISTER AS AN&nbsp;INVESTOR
                </button>
              </div>

              {/* TRACK 2: COMPANY */}
              <div className="reg-track-card active">
                <div className="reg-track-top">
                  <div className="reg-track-meta">
                    <span className="reg-tag">FOR COMPANIES</span>
                    <span className="reg-num">02</span>
                  </div>
                  <h3>Register as a Company</h3>
                  <p>
                    Register your mining company to showcase your projects and connect with a curated audience of international investors, family offices and funds.
                  </p>
                  <div className="reg-feats">
                    <div className="reg-feat-item">
                      <span className="check-ic">✓</span>
                      <span>Corporate Project Showcase</span>
                    </div>
                    <div className="reg-feat-item">
                      <span className="check-ic">✓</span>
                      <span>Curated Accredited Investor Audience</span>
                    </div>
                    <div className="reg-feat-item">
                      <span className="check-ic">✓</span>
                      <span>Tier 1 Sponsorship Opportunities</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-track btn-ghost"
                  onClick={() => handleOpenForm("company")}
                >
                  REGISTER AS A&nbsp;COMPANY
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* IMPORTANT REGISTRATION NOTICE */}
        <section className="reg-notice-sec">
          <div className="wrap">
            <div className="notice-card">
              <div className="notice-main">
                <span className="notice-tag">REGISTRATION POLICIES &amp; REQUIREMENTS</span>
                <h3>Important Registration Notice</h3>
                <p>
                  Entry into THE Noble Mining Investment Conference is restricted strictly to registered participants.
                </p>
                <p>
                  You must register your attendance prior to the Event. You must receive an official invitation prior to the Event in order to receive your badge at the door. <strong>Walk-ins will not be accepted under any circumstances.</strong>
                </p>
              </div>
              <div className="notice-side">
                <div className="contact-head">Sponsorship Contact</div>
                <div className="contact-name">Jennifer Choi</div>
                <p className="contact-desc">
                  To discuss Tier 1 sponsorship packages or custom options:
                </p>
                <a href="mailto:jchoi@irinc.ca" className="contact-email">
                  jchoi@irinc.ca ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // MODE 2: DEDICATED REGISTRATION FORM PAGE
  return (
    <div className="pview on" id="pv-register-form">
      {/* REGISTRATION FORM SECTION */}
      <section className="reg-form-sec" id="registration-form-section">
        <div className="wrap max-form-wrap">
          {/* BACK LINK */}
          <div style={{ marginBottom: "20px" }}>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("register")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--teal-dark)",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              &larr; Back to Track Options
            </button>
          </div>

          {/* TAB TOGGLE SWITCH */}
          <div className="form-toggle-bar">
            <button
              type="button"
              className={`toggle-btn ${activeTab === "investor" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("investor");
                setSubmitted(false);
                setErrorMsg("");
                if (onNavigate) onNavigate("register-investor");
              }}
            >
              REGISTER AS AN INVESTOR
            </button>
            <button
              type="button"
              className={`toggle-btn ${activeTab === "company" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("company");
                setSubmitted(false);
                setErrorMsg("");
                if (onNavigate) onNavigate("register-company");
              }}
            >
              REGISTER AS A COMPANY
            </button>
          </div>

          {/* FORM CONTAINER CARD */}
          <div className="form-card">
            {submitted ? (
              <div className="form-success">
                <div className="success-ic">✓</div>
                <h3>{submittedType} Registration Received!</h3>
                <p>
                  Thank you for submitting your application for THE Noble Mining Investment Conference. Our delegate relations team will review your details and contact you shortly with confirmation and schedule access.
                </p>
                <div className="hero-btns" style={{ justifyContent: "center", marginTop: "24px" }}>
                  <button
                    type="button"
                    className="btn-teal"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Registration
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => onNavigate?.("home")}
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            ) : activeTab === "investor" ? (
              /* INVESTOR FORM */
              <div className="form-box">
                <div className="form-head">
                  <span className="eyebrow">ACCREDITED DELEGATE&nbsp;APPLICATION</span>
                  <h2>Register as an&nbsp;Investor</h2>
                  <div className="reg-div-line center"></div>
                </div>
                <form onSubmit={handleInvestorSubmit} className="reg-form">
                  <div className="field-group">
                    <label>
                      Company / Firm Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Capital Partners"
                      value={invForm.firmName}
                      onChange={(e) => setInvForm({ ...invForm, firmName: e.target.value })}
                    />
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label>
                        First Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah"
                        value={invForm.firstName}
                        onChange={(e) => setInvForm({ ...invForm, firstName: e.target.value })}
                      />
                    </div>
                    <div className="field-group">
                      <label>
                        Last Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jenkins"
                        value={invForm.lastName}
                        onChange={(e) => setInvForm({ ...invForm, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <label>Business Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Managing Director, Mining &amp; Resources"
                      value={invForm.title}
                      onChange={(e) => setInvForm({ ...invForm, title: e.target.value })}
                    />
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="e.g. Toronto"
                        value={invForm.city}
                        onChange={(e) => setInvForm({ ...invForm, city: e.target.value })}
                      />
                    </div>
                    <div className="field-group">
                      <label>Country</label>
                      <input
                        type="text"
                        placeholder="e.g. Canada"
                        value={invForm.country}
                        onChange={(e) => setInvForm({ ...invForm, country: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label>
                        Business Email <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@firm.com"
                        value={invForm.email}
                        onChange={(e) => setInvForm({ ...invForm, email: e.target.value })}
                      />
                    </div>
                    <div className="field-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 (514) 555-0192"
                        value={invForm.phone}
                        onChange={(e) => setInvForm({ ...invForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label>Assets Under Management (AUM)</label>
                      <select
                        value={invForm.aum}
                        onChange={(e) => setInvForm({ ...invForm, aum: e.target.value })}
                      >
                        <option value="">Select AUM Range</option>
                        <option value="Under $10M">Under $10 Million</option>
                        <option value="$10M - $50M">$10 Million – $50 Million</option>
                        <option value="$50M - $250M">$50 Million – $250 Million</option>
                        <option value="$250M - $1B">$250 Million – $1 Billion</option>
                        <option value="Over $1B">Over $1 Billion</option>
                        <option value="HNWI / Personal">HNWI / Personal Accredited Investor</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label>Investor Type</label>
                      <select
                        value={invForm.investorType}
                        onChange={(e) => setInvForm({ ...invForm, investorType: e.target.value })}
                      >
                        <option value="Institutional Investor">Institutional Investor</option>
                        <option value="Family Office">Family Office</option>
                        <option value="High Net Worth Individual (HNWI)">High Net Worth Individual (HNWI)</option>
                        <option value="Fund / Portfolio Manager">Fund / Portfolio Manager</option>
                        <option value="Sovereign Wealth Fund">Sovereign Wealth Fund</option>
                        <option value="Mining Analyst / Investment Banker">Mining Analyst / Investment Banker</option>
                        <option value="Retail / Accredited Investor">Retail / Accredited Investor</option>
                      </select>
                    </div>
                  </div>

                  <div className="field-group">
                    <label>Tell Us About Yourself &amp; Investment Focus</label>
                    <textarea
                      rows={4}
                      maxLength={5000}
                      placeholder="Briefly describe your investment focus or objectives..."
                      value={invForm.notes}
                      onChange={(e) => setInvForm({ ...invForm, notes: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="check-field">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={invForm.updates}
                        onChange={(e) => setInvForm({ ...invForm, updates: e.target.checked })}
                      />
                      <span>Sign up for news and event updates</span>
                    </label>
                  </div>

                  {errorMsg && (
                    <div className="form-error-msg" role="alert">
                      {errorMsg}
                    </div>
                  )}

                  <button type="submit" className="btn-teal submit-btn" disabled={submitting}>
                    <span>
                      {submitting ? "SUBMITTING…" : "COMPLETE INVESTOR REGISTRATION"}
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </form>
              </div>
            ) : (
              /* COMPANY FORM */
              <div className="form-box">
                <div className="form-head">
                  <span className="eyebrow">MINING COMPANY APPLICATION</span>
                  <h2>Register as a&nbsp;Company</h2>
                  <div className="reg-div-line center"></div>
                </div>
                <form onSubmit={handleCompanySubmit} className="reg-form">
                  <div className="field-row">
                    <div className="field-group">
                      <label>
                        Company Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Northern Gold Resources"
                        value={compForm.companyName}
                        onChange={(e) => setCompForm({ ...compForm, companyName: e.target.value })}
                      />
                    </div>
                    <div className="field-group">
                      <label>Ticker Symbol / Exchange</label>
                      <input
                        type="text"
                        placeholder="e.g. TSX: NGR / OTCQX: NGRFF"
                        value={compForm.ticker}
                        onChange={(e) => setCompForm({ ...compForm, ticker: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label>
                        First Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Michael"
                        value={compForm.firstName}
                        onChange={(e) => setCompForm({ ...compForm, firstName: e.target.value })}
                      />
                    </div>
                    <div className="field-group">
                      <label>
                        Last Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vance"
                        value={compForm.lastName}
                        onChange={(e) => setCompForm({ ...compForm, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <label>Executive Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Chief Executive Officer / VP Investor Relations"
                      value={compForm.title}
                      onChange={(e) => setCompForm({ ...compForm, title: e.target.value })}
                    />
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="e.g. Vancouver"
                        value={compForm.city}
                        onChange={(e) => setCompForm({ ...compForm, city: e.target.value })}
                      />
                    </div>
                    <div className="field-group">
                      <label>Country</label>
                      <input
                        type="text"
                        placeholder="e.g. Canada"
                        value={compForm.country}
                        onChange={(e) => setCompForm({ ...compForm, country: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label>
                        Business Email <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. mvance@northerngold.com"
                        value={compForm.email}
                        onChange={(e) => setCompForm({ ...compForm, email: e.target.value })}
                      />
                    </div>
                    <div className="field-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 (604) 555-0188"
                        value={compForm.phone}
                        onChange={(e) => setCompForm({ ...compForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label>Primary Commodity / Resource</label>
                      <select
                        value={compForm.commodity}
                        onChange={(e) => setCompForm({ ...compForm, commodity: e.target.value })}
                      >
                        <option value="">Select Primary Commodity</option>
                        <option value="Gold & Silver">Gold &amp; Silver / Precious Metals</option>
                        <option value="Copper / Base Metals">Copper / Base Metals</option>
                        <option value="Lithium / Energy Transition">Lithium / Energy Transition</option>
                        <option value="Uranium / Energy">Uranium / Energy</option>
                        <option value="Critical Minerals">Critical Minerals</option>
                        <option value="Other Mining & Exploration">Other Mining &amp; Exploration</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label>Market Cap Range</label>
                      <select
                        value={compForm.marketCap}
                        onChange={(e) => setCompForm({ ...compForm, marketCap: e.target.value })}
                      >
                        <option value="">Select Market Cap</option>
                        <option value="Under $50M">Under $50M</option>
                        <option value="$50M - $200M">$50M – $200M</option>
                        <option value="$200M - $500M">$200M – $500M</option>
                        <option value="$500M - $1B">$500M – $1B</option>
                        <option value="Over $1B">Over $1B</option>
                      </select>
                    </div>
                  </div>

                  <div className="field-group">
                    <label>Company Overview &amp; Presentation Goals</label>
                    <textarea
                      rows={4}
                      maxLength={5000}
                      placeholder="Briefly describe your mining assets and 1 on 1 meeting objectives..."
                      value={compForm.overview}
                      onChange={(e) => setCompForm({ ...compForm, overview: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="check-field">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={compForm.updates}
                        onChange={(e) => setCompForm({ ...compForm, updates: e.target.checked })}
                      />
                      <span>Sign up for news and event updates</span>
                    </label>
                  </div>

                  {errorMsg && (
                    <div className="form-error-msg" role="alert">
                      {errorMsg}
                    </div>
                  )}

                  <button type="submit" className="btn-teal submit-btn" disabled={submitting}>
                    <span>
                      {submitting ? "SUBMITTING…" : "SUBMIT COMPANY REGISTRATION"}
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <PartnerMarquee />

      {/* IMPORTANT REGISTRATION NOTICE */}
      <section className="reg-notice-sec">
        <div className="wrap">
          <div className="notice-card">
            <div className="notice-main">
              <span className="notice-tag">REGISTRATION POLICIES &amp; REQUIREMENTS</span>
              <h3>Important Registration Notice</h3>
              <p>
                Entry into THE Noble Mining Investment Conference is restricted strictly to registered participants.
              </p>
              <p>
                You must register your attendance prior to the Event. You must receive an official invitation prior to the Event in order to receive your badge at the door. <strong>Walk-ins will not be accepted under any circumstances.</strong>
              </p>
            </div>
            <div className="notice-side">
              <div className="contact-head">Sponsorship Contact</div>
              <div className="contact-name">Jennifer Choi</div>
              <p className="contact-desc">
                To discuss Tier 1 sponsorship packages or custom options:
              </p>
              <a href="mailto:jchoi@irinc.ca" className="contact-email">
                jchoi@irinc.ca &nearr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FOOTER CTA */}
      <section className="reg-contact-sec">
        <div className="wrap">
          <div className="reg-contact-box">
            <span className="eyebrow">HAVE A QUESTION?</span>
            <h2>Get in Touch</h2>
            <div className="reg-div-line"></div>
            <p>
              For more information about THE Noble Mining Investment Conference programming or registration, please contact{" "}
              <a href="mailto:jchoi@irinc.ca" className="email-link">
                jchoi@irinc.ca
              </a>{" "}
              or call{" "}
              <a href="tel:+19055153508" className="phone-link">
                +1-905-515-3508
              </a>
              .
            </p>
            <button
              type="button"
              className="btn-teal"
              onClick={() => handleOpenForm("investor")}
            >
              REGISTER HERE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
