"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { adminTestList } from "../../action/admin";

// ── Mini stat card ──────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, accent, sub }) => (
  <div
    className="rounded-2xl p-5 relative overflow-hidden"
    style={{ background: "white", border: "1px solid #e5e7eb" }}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-black text-slate-900 mt-1">{value ?? "—"}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ background: `${accent}18` }}
      >
        {icon}
      </div>
    </div>
    {/* Decorative accent line */}
    <div
      className="absolute bottom-0 left-0 h-0.5 w-full"
      style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
    />
  </div>
);

// ── Recent test row ─────────────────────────────────────────────────────────
const RecentRow = ({ test, type }) => {
  const colorMap = {
    listening: { bg: "#3b82f6", label: "Listening" },
    reading: { bg: "#10b981", label: "Reading" },
    writing: { bg: "#f97316", label: "Writing" },
    "full-test": { bg: "#ef4444", label: "Full Test" },
  };
  const c = colorMap[type] || { bg: "#6b7280", label: type };

  return (
    <div className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0"
        style={{ background: c.bg }}
      >
        {test.testNumber}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{test.title}</p>
        <p className="text-[11px] text-slate-400">{c.label} · {test.difficulty || "—"}</p>
      </div>
      <span
        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
        style={
          test.isPublished
            ? { background: "#d1fae5", color: "#065f46" }
            : { background: "#f1f5f9", color: "#64748b" }
        }
      >
        {test.isPublished ? "Live" : "Draft"}
      </span>
    </div>
  );
};

const TYPES = ["listening", "reading", "writing", "full-test"];

const QUICK_LINKS = [
  { href: "/admin/tests", label: "Manage Tests", icon: "📋", color: "#3b82f6" },
  { href: "/admin/self-practice", label: "Self Practice", icon: "📚", color: "#10b981" },
  { href: "/admin/tests?type=listening", label: "Add Listening Test", icon: "🎧", color: "#8b5cf6" },
  { href: "/admin/tests?type=reading", label: "Add Reading Test", icon: "📖", color: "#f59e0b" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const results = await Promise.allSettled(
          TYPES.map((t) => adminTestList(t, 1))
        );

        const countMap = {};
        const recentAll = [];

        results.forEach((res, i) => {
          const type = TYPES[i];
          if (res.status === "fulfilled") {
            const data = res.value?.data;
            countMap[type] = data?.pagination?.total || data?.data?.length || 0;
            const items = (data?.data || []).slice(0, 3);
            items.forEach((item) => recentAll.push({ ...item, type }));
          } else {
            countMap[type] = 0;
          }
        });

        setCounts(countMap);
        setRecent(recentAll.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const totalTests = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page header ── */}
      <div
        className="relative overflow-hidden px-8 py-10"
        style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle,#ef4444,transparent)" }} />
        <div className="absolute top-4 right-32 w-24 h-24 rounded-full opacity-5" style={{ background: "radial-gradient(circle,#f97316,transparent)" }} />

        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-semibold">Admin Dashboard</p>
        <h1 className="text-2xl font-black text-white mb-1">Welcome back 👋</h1>
        <p className="text-sm text-slate-400">Here&apos;s what&apos;s happening with your IELTS platform today.</p>
      </div>

      <div className="px-8 py-8 max-w-6xl mx-auto space-y-8">
        {/* ── Stats grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-white animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Tests" value={totalTests} icon="🏆" accent="#ef4444" sub="across all types" />
            <StatCard label="Listening" value={counts.listening} icon="🎧" accent="#3b82f6" sub="tests created" />
            <StatCard label="Reading" value={counts.reading} icon="📖" accent="#10b981" sub="tests created" />
            <StatCard label="Writing" value={counts.writing} icon="✍️" accent="#f97316" sub="tests created" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Recent tests ── */}
          <div
            className="lg:col-span-2 rounded-2xl bg-white p-6"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-black text-slate-900 text-base">Recent Tests</h2>
                <p className="text-xs text-slate-400 mt-0.5">Latest across all categories</p>
              </div>
              <Link
                href="/admin/tests"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{ background: "#fef2f2", color: "#ef4444" }}
              >
                View All →
              </Link>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 rounded-xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            ) : recent.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-3xl mb-2">📭</p>
                <p className="text-sm text-slate-400">No tests created yet</p>
                <Link href="/admin/tests" className="text-xs text-red-500 font-semibold mt-2 inline-block">
                  Create your first test →
                </Link>
              </div>
            ) : (
              <div>
                {recent.map((t) => (
                  <RecentRow key={t._id} test={t} type={t.type} />
                ))}
              </div>
            )}
          </div>

          {/* ── Quick links ── */}
          <div
            className="rounded-2xl bg-white p-6 space-y-3"
            style={{ border: "1px solid #e5e7eb" }}
          >
            <h2 className="font-black text-slate-900 text-base mb-1">Quick Actions</h2>
            <p className="text-xs text-slate-400 mb-4">Jump to any section</p>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                style={{
                  background: `${link.color}0d`,
                  border: `1px solid ${link.color}22`,
                }}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm font-semibold" style={{ color: link.color }}>
                  {link.label}
                </span>
                <svg className="w-4 h-4 ml-auto opacity-50" style={{ color: link.color }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}

            {/* Type breakdown */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">Breakdown</p>
              {[
                { label: "Full Mock Tests", key: "full-test", color: "#ef4444" },
                { label: "Listening", key: "listening", color: "#3b82f6" },
                { label: "Reading", key: "reading", color: "#10b981" },
                { label: "Writing", key: "writing", color: "#f97316" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-xs font-black text-slate-800">{counts[item.key] ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}