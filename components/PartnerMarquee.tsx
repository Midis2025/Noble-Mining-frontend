"use client";

import React, { useState, useEffect } from "react";
import { fetchNobleMediaPartners, type MediaPartner } from "@/lib/api/partners";

export default function PartnerMarquee() {
  const [partners, setPartners] = useState<MediaPartner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    async function loadPartners() {
      try {
        const data = await fetchNobleMediaPartners();
        if (mounted && data.length > 0) {
          setPartners(data);
        }
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error("[PartnerMarquee] Error loading partners:", err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadPartners();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading || partners.length === 0) {
    return null;
  }

  // Duplicate items for seamless continuous looping
  const marqueeItems = [...partners, ...partners];

  return (
    <section className="partners-band" aria-label="Media and capital markets partners">
      <div className="wrap">
        <div
          style={{
            textAlign: "center",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.14em",
            color: "#64748b",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          MEDIA &amp; CAPITAL MARKETS PARTNERS
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {marqueeItems.map((partner, idx) => {
            const logoUrl =
              partner.logo?.formats?.small?.url ||
              partner.logo?.formats?.thumbnail?.url ||
              partner.logo?.url ||
              null;

            const content = (
              <div
                key={`${partner.documentId || partner.id}-${idx}`}
                className="partner-card"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 24px",
                  height: "70px",
                }}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={`${partner.name} logo`}
                    className="partner-logo-img"
                    style={{
                      maxHeight: "55px",
                      maxWidth: "180px",
                      objectFit: "contain",
                    }}
                    loading="lazy"
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 800,
                      color: "#1e293b",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {partner.name}
                  </span>
                )}
              </div>
            );

            if (partner.website) {
              return (
                <a
                  key={`${partner.documentId || partner.id}-${idx}`}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "inline-flex" }}
                >
                  {content}
                </a>
              );
            }

            return content;
          })}
        </div>
      </div>
    </section>
  );
}


