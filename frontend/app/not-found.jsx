"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden grain"
      style={{ background: "var(--color-cream)", color: "var(--color-ink)" }}>

      {/* ── Grid background ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,150,62,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,150,62,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
          pointerEvents: "none",
        }}
      />

      {/* ── Radial glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(200,150,62,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Ghost 404 ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(160px, 28vw, 320px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(200,150,62,0.12)",
          letterSpacing: "-0.04em",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}>
        404
      </div>

      {/* ── Brand top-left ── */}
      <Link
        href="/"
        className="anim-up"
        style={{
          position: "absolute",
          top: 28,
          left: 32,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: "var(--color-ink)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L2 8l10 5 10-5-10-5z" fill="#c8963e" />
            <path
              d="M7 10.5v5a5 5 0 0010 0v-5"
              stroke="#c8963e"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            color: "var(--color-ink)",
          }}>
          IELTS<span style={{ color: "var(--color-gold)" }}>MILL</span>
        </span>
      </Link>

      {/* ── Main content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}>

        {/* Badge */}
        <div className="label-tag anim-up delay-1">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-gold)",
              display: "inline-block",
            }}
          />
          Error 404
        </div>

        {/* Ornament */}
        <div
          className="anim-up delay-2"
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 20,
          }}>
          <div
            style={{
              width: 56,
              height: 1,
              background: "linear-gradient(90deg, transparent, #c8963e)",
            }}
          />
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--color-gold)",
            }}
          />
          <div
            style={{
              width: 56,
              height: 1,
              background: "linear-gradient(90deg, #c8963e, transparent)",
            }}
          />
        </div>

        {/* Heading */}
        <h1
          className="font-display anim-up delay-2"
          style={{
            fontSize: "clamp(38px, 6vw, 62px)",
            fontWeight: 400,
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 18,
            color: "var(--color-ink)",
          }}>
          This path leads{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
            nowhere
          </em>
        </h1>

        {/* Gold divider */}
        <div
          className="divider-gold anim-up delay-3"
          style={{ margin: "0 auto 20px" }}
        />

        {/* Body */}
        <p
          className="anim-up delay-3"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            fontWeight: 400,
            color: "#5a6478",
            lineHeight: 1.75,
            maxWidth: 380,
            textAlign: "center",
            marginBottom: 40,
          }}>
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Head back and pick up where you left off.
        </p>

        {/* Buttons */}
        <div
          className="anim-up delay-4"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
          <button className="btn-gold" onClick={handleBack}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Go Back
          </button>

          <Link
            href="/"
            className="btn-ghost"
            style={{ color: "var(--color-ink)", borderColor: "rgba(8,16,30,0.22)" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            Home
          </Link>
        </div>

        {/* ── Quick nav ── */}
        <nav
          className="anim-up delay-5"
          aria-label="Quick navigation"
          style={{
            marginTop: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}>
          <div
            style={{
              width: 1,
              height: 32,
              background:
                "linear-gradient(180deg, transparent, rgba(200,150,62,0.4), transparent)",
            }}
          />
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9aa0ae",
              fontFamily: "var(--font-sans)",
            }}>
            Or jump to
          </p>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
            {[
              { label: "Dashboard", href: "/dashboard" }
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="nav-pill"
                style={{
                  padding: "7px 18px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#3a4256",
                  borderRadius: 99,
                  border: "1px solid transparent",
                  fontFamily: "var(--font-sans)",
                  textDecoration: "none",
                  transition: "all 0.18s ease",
                  display: "inline-block",
                }}>
                {label}
              </Link>
            ))}
          </div>              
        </nav>
      </div>

      {/* Nav pill hover via a small style block — avoids inline JS handlers */}
      <style>{`
        .nav-pill:hover {
          background: rgba(200,150,62,0.09) !important;
          border-color: rgba(200,150,62,0.3) !important;
          color: var(--color-gold) !important;
        }
        /* Tune btn-ghost for dark-on-cream context */
        .btn-ghost {
          color: var(--color-ink) !important;
          border-color: rgba(8,16,30,0.22) !important;
        }
        .btn-ghost:hover {
          background: rgba(8,16,30,0.05) !important;
          border-color: var(--color-gold) !important;
          color: var(--color-gold) !important;
        }
      `}</style>
    </div>
  );
}