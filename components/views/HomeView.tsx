"use client";

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const handleNavClick = (view: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pview on" id="pv-home">
      {/* ================= HERO ================= */}
      <section className="hero" id="top">
        <img
          className="hero-art"
          src="/assets/hero-art.webp"
          alt="Waterfront at sunset in Boca Raton, Florida"
        />
        <svg
          className="hero-defs"
          aria-hidden="true"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <g id="resortScene">
            <defs>
              <linearGradient id="rsky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0b2a3e" />
                <stop offset=".42" stopColor="#1d4a63" />
                <stop offset=".62" stopColor="#8a6a6e" />
                <stop offset=".74" stopColor="#e8a06a" />
                <stop offset=".82" stopColor="#f2c081" />
                <stop offset="1" stopColor="#3a5a6a" />
              </linearGradient>
              <linearGradient id="rpool" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#12303c" />
                <stop offset="1" stopColor="#071a24" />
              </linearGradient>
            </defs>
            <rect width="900" height="620" fill="url(#rsky)" />
            <g fill="#e8eef8" opacity=".5">
              <circle cx="150" cy="60" r="1.4" />
              <circle cx="420" cy="40" r="1.3" />
              <circle cx="700" cy="70" r="1.4" />
              <circle cx="820" cy="45" r="1.2" />
            </g>
            <g fill="#25404e" opacity=".7">
              <ellipse cx="250" cy="200" rx="130" ry="18" />
              <ellipse cx="640" cy="170" rx="150" ry="20" />
            </g>
            <g>
              <rect x="240" y="330" width="440" height="120" fill="#2a2430" />
              <g fill="#3a3040">
                <rect x="220" y="318" width="480" height="16" rx="4" />
              </g>
              <rect x="420" y="258" width="84" height="76" fill="#332b3a" />
              <path d="M414 260 L462 226 L510 260 Z" fill="#241f2b" />
              <circle cx="462" cy="244" r="7" fill="#17131d" />
              <g fill="#f3c477">
                <path d="M260 380 q12-24 24 0 v70 h-24 z" />
                <path d="M300 380 q12-24 24 0 v70 h-24 z" />
                <path d="M340 380 q12-24 24 0 v70 h-24 z" />
                <path d="M380 380 q12-24 24 0 v70 h-24 z" />
                <path d="M420 380 q12-24 24 0 v70 h-24 z" />
                <path d="M460 380 q12-24 24 0 v70 h-24 z" />
                <path d="M500 380 q12-24 24 0 v70 h-24 z" />
                <path d="M540 380 q12-24 24 0 v70 h-24 z" />
                <path d="M580 380 q12-24 24 0 v70 h-24 z" />
                <path d="M620 380 q12-24 24 0 v70 h-24 z" />
              </g>
              <g fill="#f3c477" opacity=".85">
                <rect x="272" y="342" width="14" height="20" />
                <rect x="312" y="342" width="14" height="20" />
                <rect x="352" y="342" width="14" height="20" />
                <rect x="392" y="342" width="14" height="20" />
                <rect x="436" y="342" width="14" height="20" />
                <rect x="476" y="342" width="14" height="20" />
                <rect x="516" y="342" width="14" height="20" />
                <rect x="556" y="342" width="14" height="20" />
                <rect x="596" y="342" width="14" height="20" />
                <rect x="636" y="342" width="14" height="20" />
                <rect x="432" y="276" width="12" height="18" />
                <rect x="456" y="276" width="12" height="18" />
                <rect x="480" y="276" width="12" height="18" />
              </g>
            </g>
            <g fill="#0a1c22">
              <g transform="translate(160,250)">
                <rect x="-5" y="0" width="10" height="130" />
                <path d="M0 0 Q-50 -22 -78 4 Q-38 -2 0 10 Q38 -2 78 4 Q50 -22 0 0 M0 0 Q-22 -42 -48 -46 Q-16 -26 0 6 Q16 -26 48 -46 Q22 -42 0 0" />
              </g>
              <g transform="translate(760,240)">
                <rect x="-5" y="0" width="10" height="140" />
                <path d="M0 0 Q-52 -24 -80 4 Q-40 -2 0 10 Q40 -2 80 4 Q52 -24 0 0 M0 0 Q-24 -44 -50 -48 Q-17 -27 0 6 Q17 -27 50 -48 Q24 -44 0 0" />
              </g>
              <g transform="translate(560,200)">
                <rect x="-4" y="0" width="8" height="120" />
                <path d="M0 0 Q-42 -18 -66 4 Q-33 -2 0 8 Q33 -2 66 4 Q42 -18 0 0 M0 0 Q-18 -36 -40 -38 Q-13 -22 0 5 Q13 -22 40 -38 Q18 -36 0 0" />
              </g>
              <g transform="translate(330,215)">
                <rect x="-4" y="0" width="8" height="110" />
                <path d="M0 0 Q-40 -16 -62 4 Q-31 -2 0 8 Q31 -2 62 4 Q40 -16 0 0" />
              </g>
            </g>
            <rect y="450" width="900" height="170" fill="url(#rpool)" />
            <g opacity=".55">
              <g fill="#f3c477">
                <path d="M262 460 q10 16 20 0 v40 q-10 10 -20 0 z" opacity=".5" />
                <path d="M342 460 q10 16 20 0 v44 q-10 10 -20 0 z" opacity=".45" />
                <path d="M422 460 q10 16 20 0 v48 q-10 10 -20 0 z" opacity=".5" />
                <path d="M502 460 q10 16 20 0 v44 q-10 10 -20 0 z" opacity=".45" />
                <path d="M582 460 q10 16 20 0 v40 q-10 10 -20 0 z" opacity=".5" />
              </g>
              <g stroke="#e8b478" strokeWidth="1.6" opacity=".6">
                <path d="M180 480 h70M300 502 h90M470 490 h80M620 510 h90M240 540 h80M420 556 h100M560 580 h70" />
              </g>
            </g>
          </g>
        </svg>
        <div className="hero-scrim"></div>

        <div className="wrap hero-inner">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>THE Nexus for Resourceful Investors</span>
          </div>

          <h1 id="heroTitle">
            THE NOBLE
            <br />
            <span className="gr">MINING INVESTMENT</span>
            <br />
            CONFERENCE
          </h1>

          <div className="hero-meta">
            <div className="hm-card">
              <div className="hm-icon-wrap">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10z" />
                  <circle cx="12" cy="11" r="2.3" />
                </svg>
              </div>
              <div className="hm-content">
                <span className="hm-label">LOCATION & VENUE</span>
                <span className="hm-title">The Boca Raton Innovation Campus</span>
                <span className="hm-subtitle">Boca Raton, Florida</span>
              </div>
            </div>

            <div className="hm-card">
              <div className="hm-icon-wrap">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="5" width="16" height="15" rx="2" />
                  <path d="M4 9.5h16M8 3v4M16 3v4" />
                </svg>
              </div>
              <div className="hm-content">
                <span className="hm-label">EVENT DATES</span>
                <span className="hm-title">February 17–18, 2027</span>
                <span className="hm-badge-tag">2-Day Exclusive&nbsp;Conference</span>
              </div>
            </div>
          </div>

          <div className="hero-btns">
            <a
              className="btn-teal"
              href="#register"
              onClick={(e) => handleNavClick("register", e)}
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
            </a>
            <a
              className="btn-ghost"
              href="#agenda"
              onClick={(e) => handleNavClick("agenda", e)}
            >
              VIEW&nbsp;AGENDA
            </a>
          </div>

          <div className="partner-line">IN PARTNERSHIP WITH</div>
          <div className="hero-partners">
            <span className="noble-cm">
              <img src="/assets/Asset 10@2x.png" alt="Noble Capital Markets" />
            </span>

            <img
              className="hero-partner-logo global-events-hero-logo"
              src="/assets/THE Event Global Logo.png"
              alt="Global Events - THE Mining Investment Event"
            />
          </div>
        </div>
      </section>

      {/* ================= ABOUT THE CONFERENCE ================= */}
      <section className="aconf" id="aboutconf">
        <div className="wrap aconf-grid">
          <div>
            <h2>ABOUT THE&nbsp;CONFERENCE</h2>
            <p>
              THE Noble Mining Investment Conference is a collaboration between THE Mining Investment Event, which takes place annually in June in Quebec City, and Noble Capital Markets, a comprehensive SEC/FINRA-registered broker-dealer headquartered in Boca Raton, focused solely on serving public and private companies.
            </p>
            <p>
              THE Noble Mining Investment Conference will offer mining companies exclusive opportunities to connect with local and international family offices, high-net-worth individuals, funds, brokers, analysts, and buy-side representatives, including corporate development teams exploring international investments.
            </p>
            <a
              className="btn-ghost"
              href="#about"
              onClick={(e) => handleNavClick("about", e)}
              style={{ marginTop: "8px" }}
            >
              LEARN MORE ABOUT THE&nbsp;CONFERENCE{" "}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div className="aconf-photo">
            <img
              src="/assets/images (1).jpeg"
              alt="The Boca Raton Innovation Campus - Noble Conference Venue"
            />
          </div>
        </div>
      </section>

      {/* ================= WHY ATTEND ================= */}
      <section className="why" id="why">
        <div className="wrap">
          <div className="why-header">
            <span className="why-pill">
              <span className="pill-dot"></span>
              VALUE PROPOSITION
            </span>
            <h2 className="why-title">WHY ATTEND THE&nbsp;CONFERENCE</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="9" cy="8" r="3.2" />
                  <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6S13.9 16 14.5 19" />
                  <circle cx="16.5" cy="9" r="2.6" />
                  <path d="M16 14.6c2.4.1 4 1.6 4.5 4.4" />
                </svg>
              </div>
              <h3 className="why-card-title">NETWORK</h3>
              <p>Connect with institutional investors, fund managers &amp; C-suite mining executives.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M20 20l-4-4" />
                </svg>
              </div>
              <h3 className="why-card-title">DISCOVER</h3>
              <p>Uncover high-potential mining assets &amp; critical mineral market opportunities.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-4.5L21 9l-9 4.5z" />
                  <path d="M7 11.5V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5M21 9v5" />
                </svg>
              </div>
              <h3 className="why-card-title">LEARN</h3>
              <p>Gain actionable insights from macro strategists &amp; top industry visionaries.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                >
                  <path d="M7 4h10l4 5-9 11L3 9z" />
                  <path d="M3 9h18M9.5 4L8 9l4 11 4-11-1.5-5" />
                </svg>
              </div>
              <h3 className="why-card-title">INVEST</h3>
              <p>Engage in pre-scheduled 1 on 1 private meetings with corporate leaders.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="4" y="13" width="4" height="7" rx="1" />
                  <rect x="10" y="9" width="4" height="11" rx="1" />
                  <rect x="16" y="5" width="4" height="15" rx="1" />
                </svg>
              </div>
              <h3 className="why-card-title">GROW</h3>
              <p>Position your organization and capital portfolio for long-term market success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMING SOON ================= */}
      <section className="coming" id="coming">
        <img
          className="coming-bg"
          src="/assets/hero-art.webp"
          alt="Boca Raton Waterfront"
        />
        <div className="coming-scrim"></div>
        <div className="wrap coming-inner">
          <span className="coming-ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 20h16M5 20V9h14v11M3 9l9-5 9 5M9 20v-6h6v6M12 12h.01" />
            </svg>
          </span>
          <div className="coming-copy">
            <div className="eyebrow">PARTICIPATING COMPANIES &amp;&nbsp;SPONSORS</div>
            <h2>COMING&nbsp;SOON</h2>
            <p>Participating companies and sponsors will be announced soon. Stay&nbsp;tuned!</p>
            <button
              className="btn-ghost"
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

      {/* ================= INFO BAR ================= */}
      <section className="infobar" id="infobar">
        <div className="wrap info-grid">
          <div className="info">
            <span className="info-ic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M4 9.5h16M8 3v4M16 3v4M8 13.5h2M11 13.5h2M14 13.5h2M8 16.5h2M11 16.5h2" />
              </svg>
            </span>
            <div>
              <b>DATES</b>
              <p>
                February 17–18, 2027
                <br />
                Gala Networking Event – To Be Announced
              </p>
            </div>
          </div>
          <div className="info">
            <span className="info-ic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10z" />
                <circle cx="12" cy="11" r="2.3" />
              </svg>
            </span>
            <div>
              <b>VENUE</b>
              <p>
                Boca Raton Innovation Campus
                <br />
                5000 T-Rex Ave,
                <br />
                Boca Raton, Florida
              </p>
            </div>
          </div>
          <div className="info">
            <span className="info-ic">
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
            <div>
              <b>AUDIENCE</b>
              <p>
                Family Offices, HNWIs, Funds, Brokers, Analysts and Corporate
                Development Teams
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
