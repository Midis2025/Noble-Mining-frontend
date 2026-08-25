import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "80px 20px", textAlign: "center", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "16px" }}>404 — Page Not Found</h1>
      <p style={{ marginBottom: "24px", color: "var(--mut-l)" }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: "var(--teal)",
          color: "#071a24",
          fontWeight: 700,
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
