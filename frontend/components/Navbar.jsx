"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/features/Useauthstore";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Mock Tests", href: "/full-test" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(8,16,30,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(200,150,62,0.15)"
          : "1px solid transparent",
      }}>
      {/* Top strip */}
      <div
        style={{
          background: "linear-gradient(90deg,#c8963e,#e8b96a)",
          padding: "6px 0",
        }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#08101e",
              letterSpacing: "0.5px",
            }}>
            🇧🇩 Narsingdi&apos;s #1 IELTS & Study Abroad Institute
          </span>
          <Link
            href="https://www.facebook.com/macron.narsingdi/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#08101e",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
            📘 Follow on Facebook
          </Link>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            textDecoration: "none",
          }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg,#c8963e,#e8b96a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(200,150,62,0.4)",
            }}>
            <span
              style={{
                fontFamily: "DM Serif Display,serif",
                fontWeight: 900,
                fontSize: 20,
                color: "#08101e",
              }}>
              M
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "DM Serif Display,serif",
                fontSize: 18,
                fontWeight: 700,
                color: "white",
                lineHeight: 1.1,
              }}>
              Macron Worldwide
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#c8963e",
              }}>
              Narsingdi
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 4 }}
          className="hidden-mobile">
          {navLinks.map((link) => (
            <div
              key={link.label}
              style={{ position: "relative" }}
              onMouseEnter={() => link.sub && setDropdown(link.label)}
              onMouseLeave={() => setDropdown(null)}>
              <Link
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#c8963e";
                  e.currentTarget.style.background = "rgba(200,150,62,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  e.currentTarget.style.background = "transparent";
                }}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
          className="hidden-mobile">
          <Link
            href="tel:+8801303-255116"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
            }}>
            <Phone size={14} style={{ color: "#c8963e" }} /> +880 1303-255116
          </Link>

          {user ? (
            <Link
              href="/dashboard"
              className="btn-gold"
              style={{ padding: "10px 22px", fontSize: 13 }}>
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="btn-gold"
              style={{ padding: "10px 22px", fontSize: 13 }}>
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "white",
            padding: 8,
          }}
          className="mobile-only">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "#08101e",
            borderTop: "1px solid rgba(200,150,62,0.2)",
            padding: "16px 24px 24px",
          }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
              {link.label}
            </Link>
          ))}

          {user ? (
            <Link
              href="/dashboard"
              className="btn-gold"
              style={{
                marginTop: 20,
                justifyContent: "center",
                width: "100%",
              }}>
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="btn-gold"
              style={{
                marginTop: 20,
                justifyContent: "center",
                width: "100%",
              }}>
              Login
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 1023px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 1024px) { .mobile-only { display: none !important; } }
      `}</style>
    </nav>
  );
}
