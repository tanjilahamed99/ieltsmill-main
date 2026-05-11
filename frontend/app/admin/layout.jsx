"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

const NAV = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    accent: "#ef4444",
    desc: "Overview & stats",
  },
  {
    href: "/admin/tests",
    label: "Tests",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-5 h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
        />
      </svg>
    ),
    accent: "#3b82f6",
    desc: "Listening · Reading · Writing · Full",
  },
  {
    href: "/admin/self-practice",
    label: "Self Practice",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-5 h-5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    accent: "#10b981",
    desc: "Reading & Writing practice",
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on ESC
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const SidebarContent = ({ isMobile = false }) => (
    <>
      {/* Logo row */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link href={"/"}>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
            style={{ background: "linear-gradient(135deg,#ef4444,#f97316)" }}>
            <span className="text-white font-black text-sm">I</span>
          </div>
        </Link>

        {(isMobile || !collapsed) && (
          <div className="overflow-hidden">
            <p className="font-black text-white text-sm leading-tight tracking-tight">
              IELTSMILL
            </p>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              Admin
            </p>
          </div>
        )}

        {/* Desktop collapse toggle */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="ml-auto text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
            aria-label="Toggle sidebar">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4">
              {collapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 5l-7 7 7 7"
                />
              )}
            </svg>
          </button>
        )}

        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
            aria-label="Close menu">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={!isMobile && collapsed ? item.label : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative"
              style={
                active
                  ? {
                      background: `linear-gradient(135deg, ${item.accent}22, ${item.accent}11)`,
                      border: `1px solid ${item.accent}33`,
                    }
                  : { border: "1px solid transparent" }
              }>
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                  style={{ background: item.accent }}
                />
              )}
              <span
                className="shrink-0 transition-colors"
                style={{ color: active ? item.accent : "#64748b" }}>
                {item.icon}
              </span>
              {(isMobile || !collapsed) && (
                <div className="overflow-hidden">
                  <p
                    className="text-sm font-semibold leading-tight"
                    style={{ color: active ? "white" : "#94a3b8" }}>
                    {item.label}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {item.desc}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User chip */}
      <div
        className="px-3 py-4 border-t shrink-0"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black text-white"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}>
            A
          </div>
          {(isMobile || !collapsed) && (
            <div>
              <p className="text-xs font-semibold text-white">Admin</p>
              <p className="text-[10px] text-slate-500">Super Admin</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div
      className="min-h-screen flex"
      style={{
        fontFamily: "'Plus Jakarta Sans', 'DM Sans', ui-sans-serif, sans-serif",
        background: "#0f172a",
      }}>
      {/* ══ DESKTOP SIDEBAR (md+) ══ */}
      <aside
        className="hidden md:flex sticky top-0 h-screen flex-col transition-all duration-300 shrink-0 z-40"
        style={{
          width: collapsed ? 72 : 240,
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}>
        <SidebarContent isMobile={false} />
      </aside>

      {/* ══ MOBILE DRAWER (<md) ══ */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className="md:hidden fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      />
      {/* Drawer */}
      <aside
        className="md:hidden fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300"
        style={{
          width: 260,
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}>
        <SidebarContent isMobile={true} />
      </aside>

      {/* ══ CONTENT AREA ══ */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile topbar */}
        <header
          className="md:hidden flex items-center gap-3 px-4 h-14 shrink-0 sticky top-0 z-30 border-b"
          style={{
            background: "#1e293b",
            borderColor: "rgba(255,255,255,0.06)",
          }}>
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-400 hover:text-white transition-colors p-1.5 -ml-1 rounded-lg hover:bg-white/5"
            aria-label="Open menu">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#ef4444,#f97316)" }}>
            <span className="text-white font-black text-xs">I</span>
          </div>
          <span className="font-black text-white text-sm tracking-tight">
            IELTSMILL
          </span>

          {/* Active page chip */}
          <div className="ml-auto flex items-center gap-1.5">
            {(() => {
              const active = NAV.find(
                (n) =>
                  n.href === pathname ||
                  (n.href !== "/admin" && pathname?.startsWith(n.href)),
              );
              return active ? (
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${active.accent}22`,
                    color: active.accent,
                  }}>
                  {active.label}
                </span>
              ) : null;
            })()}
          </div>
        </header>

        {/* Page content — extra bottom padding on mobile for the tab bar */}
        <main className="flex-1 bg-slate-50 overflow-auto pb-16 md:pb-0">
          {children}
        </main>

        {/* ══ MOBILE BOTTOM TAB BAR ══ */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex border-t"
          style={{
            background: "#1e293b",
            borderColor: "rgba(255,255,255,0.08)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}>
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 relative transition-all">
                {/* Top accent line when active */}
                {active && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                    style={{ background: item.accent }}
                  />
                )}
                <span
                  className="transition-transform duration-200"
                  style={{
                    color: active ? item.accent : "#475569",
                    transform: active ? "scale(1.1)" : "scale(1)",
                  }}>
                  {item.icon}
                </span>
                <span
                  className="text-[10px] font-semibold transition-colors"
                  style={{ color: active ? item.accent : "#475569" }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
