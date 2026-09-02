"use client";

import React from "react";
import GalaSection from "@/components/GalaSection";

interface VenueViewProps {
  onNavigate: (view: string) => void;
}

export default function VenueView({ onNavigate }: VenueViewProps) {
  const hotels = [
    {
      name: "Hampton Inn Boca Raton",
      dist: "1.1 km to venue",
      image: "/assets/swimming-pool-4.avif",
      link: "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=BCTFLHX&arrivalDate=2026-09-23&departureDate=2026-09-24&room1NumAdults=2&inputModule=HOTEL_SEARCH&viewPackagesAndPromotionsRate=true&WT.mc_id=zLADA0US1HX2OLX3GGL4ADVMETA5LF6_BCTFLHX7_129231037_&adType=PD&dsclid=80584914812567552&hmGUID=d0cc4dac-9dd7-4bbf-b778-c82284ce845b",
    },
    {
      name: "Waterstone Resort & Marina Boca Raton",
      dist: "10 km to venue",
      image: "/assets/waterstone-resort.jpeg",
      link: "https://www.hilton.com/en/hotels/bctbuqq-waterstone-resort-and-marina-boca-raton/?WT.mc_id=zLADA0AA1QQ2PSH3GGL4AMPHTBRD_Oct5GNPLTPMWBRNLAB6BCTBUQQ7EN8i142435__z22150162559z__&gclsrc=aw.ds&&utm_campaign=%7Bcampaign%7D&utm_adgroup=%7Badgroup%7D&utm_keyword=waterstone%20resort%20%26%20marina%20boca%20raton%20curio%20collection%20by%20hilton&gad_source=1&gad_campaignid=22150162559&gbraid=0AAAAA-Q0XEbzEk5RoeOwx95koEJq-JLh_&gclid=EAIaIQobChMIqrPw7f-nlgMVuIDCCB10DwkMEAAYASAAEgJBevD_BwE",
    },
    {
      name: "The Embassy Suites",
      dist: "4.6 km to venue",
      image: "/assets/Embassy_Suites__Gulf_Shores__Alabama__0992_1.webp",
      link: "https://www.hilton.com/en/brands/embassy-suites/",
    },
    {
      name: "Boca Raton Marriott",
      dist: "6 km to venue",
      image: "/assets/1.jpeg",
      link: "https://www.marriott.com/en-us/hotels/pbibr-boca-raton-marriott-at-boca-center/overview/",
    },
    {
      name: "Hyatt Place Boca Raton",
      dist: "8 km to venue",
      image: "/assets/images (2).jpeg",
      link: "https://www.hyatt.com/hyatt-place/en-US/fllzb-hyatt-place-boca-raton-downtown",
    },
  ];

  return (
    <div className="pview on" id="pv-venue">
      {/* HERO */}
      <section className="vn-hero">
        <img
          className="hero-art"
          src="/assets/hero-art.webp"
          alt="Boca Raton Innovation Campus"
        />
        <div className="hero-scrim"></div>
        <div className="wrap vn-hero-inner">
          <h1>
            TRAVEL &amp;
            <br />
            <span className="gr">ACCOMMODATIONS</span>
          </h1>
          <p>
            Everything you need to plan your trip to THE Noble Mining Investment
            Conference in beautiful Boca Raton, Florida.
          </p>
        </div>
      </section>

      {/* FACT CARD */}
      <section className="vn-facts">
        <div className="wrap">
          <div className="vf-card">
            <div className="vf">
              <span className="vf-ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                >
                  <path d="M12 21s-6.5-5.3-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.7-6.5 10-6.5 10z" />
                  <circle cx="12" cy="11" r="2.3" />
                </svg>
              </span>
              <div>
                <b>CONFERENCE VENUE</b>
                <p>
                  Boca Raton Innovation Campus
                  <small>
                    5000 T-Rex Ave,
                    <br />
                    Boca Raton, Florida
                  </small>
                </p>
              </div>
            </div>
            <div className="vf">
              <span className="vf-ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                >
                  <rect x="4" y="5" width="16" height="15" rx="2" />
                  <path d="M4 9.5h16M8 3v4M16 3v4" />
                </svg>
              </span>
              <div>
                <b>CONFERENCE DATES</b>
                <p>February 17–18, 2027</p>
              </div>
            </div>
            <div className="vf">
              <span className="vf-ic">
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
              <div>
                <b>GALA NETWORKING EVENT – FEB 17</b>
                <p>
                  The Addison
                  <small>
                    2 E. Camino Real,
                    <br />
                    Boca Raton, Florida
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE VENUE */}
      <section className="aboutv">
        <div className="wrap aboutv-grid">
          <div>
            <div className="eyebrow">ABOUT THE&nbsp;VENUE</div>
            <h2>
              Boca Raton
              <br />
              Innovation&nbsp;Campus
            </h2>
            <p className="vp">
              Originally built by IBM in the late 1960s as its North American R&amp;D
              center, the Boca Raton Innovation Campus now features modern conference
              facilities surrounded by beautiful landscaped grounds and waterfront
              views.
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
                  <path d="M4 21h16M6 21V8l6-4 6 4v13M9.5 21v-5h5v5M9 11h.01M15 11h.01" />
                </svg>
              </span>
              Historic Landmark
            </div>
            <div className="vfeat">
              <span className="vi">
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
              State-of-the-Art
              <br />
              Conference Facilities
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
                  <path d="M4 14h2l1.5-4 2 8 2-10 2 12 2-7 1.5 1H20M3 19q3 2 6 0t6 0 6 0" />
                </svg>
              </span>
              Scenic Waterfront Setting
            </div>
          </div>
          <div className="vgrid">
            <div className="vshot big">
              <img
                src="/assets/011-exterior-bric_1200xx1772-1331-228-0.jpg"
                alt="Boca Raton Innovation Campus Main Building"
                style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }}
              />
            </div>
            <div className="vshot">
              <img
                src="/assets/Lakeside-Patio-700x380.jpg"
                alt="Lakeside Outdoor Terrace &amp; Patio"
                style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
              />
            </div>
            <div className="vshot">
              <img
                src="/assets/images (4).jpeg"
                alt="Boca Raton Innovation Campus Grounds"
                style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* GALA NETWORKING EVENT SECTION */}
      <GalaSection onNavigate={onNavigate} />

      {/* RECOMMENDED HOTELS */}
      <section className="hotels">
        <div className="wrap">
          <div className="hotels-head">
            <div className="eyebrow">ACCOMMODATIONS</div>
            <h2>Recommended Hotels Near the&nbsp;Venue</h2>
            <p>
              We are pleased to recommend the following hotels near the Boca Raton
              Innovation Campus.
            </p>
            <p className="hotels-note">
              Please contact the hotel directly to book your accommodations.
              <br />
              We do not have room blocks at any of the recommended hotels.
            </p>
          </div>
          <div className="hotel-grid" id="hotelGrid">
            {hotels.map((h, idx) => (
              <article key={idx} className="hotel">
                <div className="hotel-img">
                  <img src={h.image} alt={h.name} />
                  <span className="hotel-dist">{h.dist}</span>
                </div>
                <div className="hotel-body">
                  <b>{h.name}</b>
                  <a
                    className="btn-hotel"
                    href={h.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VISIT&nbsp;WEBSITE{" "}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 4h6v6M20 4l-8 8M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="hotels-foot">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5M12 8h.01" />
            </svg>
            Distances are approximate from the Boca Raton Innovation Campus.
          </div>
        </div>
      </section>

      {/* EXPERIENCE CTA */}
      <section className="experience">
        <div className="wrap exp-inner">
          <span className="exp-ic">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <rect x="4" y="5" width="16" height="15" rx="2" />
              <path d="M4 9.5h16M8 3v4M16 3v4M8 13.5h3M8 16.5h5" />
            </svg>
          </span>
          <div className="exp-copy">
            <b>BE PART OF THE EXPERIENCE</b>
            <p>
              Join industry leaders and investors for two days of high-impact
              presentations, meetings and networking in Boca Raton.
            </p>
          </div>
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
        </div>
      </section>
    </div>
  );
}
