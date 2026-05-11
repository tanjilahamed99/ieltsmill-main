"use client";

import { useState, useEffect, useMemo, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { adminTestList } from "../../action/admin";
import { UserRoute } from "../../Providers/PrivateRoute";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const ITEMS_PER_PAGE = 10;

// ─── Icon Components ─────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="#BBC0CC"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
);
const FilterIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const SortIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 6h18M7 12h10M11 18h2"
    />
  </svg>
);
const ChevronDown = () => (
  <svg
    className="w-5 h-5 transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg
    className="w-4 h-4 text-gray-300 absolute top-4 right-3"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
  </svg>
);
const UserIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
    />
    <circle cx="9" cy="7" r="4" />
  </svg>
);
const ClockIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);
const ChecklistIcon = () => (
  <svg
    className="w-3 h-3"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
    />
    <rect x="9" y="3" width="6" height="4" rx="1" ry="1" />
  </svg>
);
const BellIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17H20L18.595 15.595A1 1 0 0118 14.82V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.82a1 1 0 01-.293.707L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);
const CheckIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const BarIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="9" width="3" height="6" rx="0.5" fill="#F59E0B" />
    <rect x="6" y="5" width="3" height="10" rx="0.5" fill="#F59E0B" />
    <rect x="11" y="2" width="3" height="13" rx="0.5" fill="#F59E0B" />
  </svg>
);
const ListeningIcon = ({ size = "w-3.5 h-3.5" }) => (
  <svg
    className={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 18v-6a9 9 0 0118 0v6"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"
    />
  </svg>
);
const ReadingIcon = ({ size = "w-3.5 h-3.5" }) => (
  <svg
    className={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);
const WritingIcon = ({ size = "w-3.5 h-3.5" }) => (
  <svg
    className={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);
const SpeakingIcon = ({ size = "w-3.5 h-3.5" }) => (
  <svg
    className={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

// ─── Constants ───────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    key: "full-test",
    label: "Full Test",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="4" height="4" rx="0.5" />
        <rect x="3" y="10" width="4" height="4" rx="0.5" />
        <rect x="3" y="17" width="4" height="4" rx="0.5" />
        <rect x="10" y="3" width="11" height="2" rx="0.5" />
        <rect x="10" y="11" width="11" height="2" rx="0.5" />
        <rect x="10" y="18" width="11" height="2" rx="0.5" />
      </svg>
    ),
  },
  { key: "listening", label: "Listening", icon: <ListeningIcon /> },
  { key: "reading", label: "Reading", icon: <ReadingIcon /> },
  { key: "writing", label: "Writing", icon: <WritingIcon /> },
  { key: "speaking", label: "Speaking", icon: <SpeakingIcon /> },
];

const SECTION_META = {
  "full-test": "IELTS Full Test",
  listening: "Listening Practice Tests",
  reading: "Reading Practice Tests",
  writing: "Writing Practice Tests",
  speaking: "Speaking Practice Tests",
};

const DEFAULT_SECTIONS = [
  {
    id: "listening",
    title: "Listening",
    duration: "30 min",
    status: "available",
  },
  { id: "reading", title: "Reading", duration: "60 min", status: "locked" },
  { id: "writing", title: "Writing", duration: "60 min", status: "locked" },
  { id: "speaking", title: "Speaking", duration: "13 min", status: "locked" },
];

// ─── getSectionIcon ──────────────────────────────────────────────────────────
const getSectionIcon = (sectionId) => {
  switch (sectionId) {
    case "listening":
      return <ListeningIcon />;
    case "reading":
      return <ReadingIcon />;
    case "writing":
      return <WritingIcon />;
    case "speaking":
      return <SpeakingIcon />;
    default:
      return null;
  }
};

// ─── Series Thumbnail ────────────────────────────────────────────────────────
const SeriesThumbnail = ({ num }) => (
  <div
    className="w-14 h-14 rounded-xl shrink-0 flex flex-col items-center justify-center text-white font-bold"
    style={{ background: "linear-gradient(135deg,#7f0000,#C8102E)" }}>
    <span className="text-[7px] opacity-70 tracking-wide leading-none">
      ILTSMILL
    </span>
    <span className="text-[8px] leading-tight">Series</span>
    <span className="text-lg font-bold leading-none">
      {String(num).padStart(2, "0")}
    </span>
  </div>
);

// ─── Coming Soon Screen ───────────────────────────────────────────────────────
const ComingSoon = () => {
  const [notified, setNotified] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      {/* Badge */}
      <span
        className="text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border"
        style={{
          background: "#FFF0F2",
          color: "#C8102E",
          borderColor: "#FFD6DC",
          fontFamily: "'Sora',sans-serif",
        }}>
        Coming Soon
      </span>

      {/* Icon box */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border-2"
        style={{
          background: "linear-gradient(135deg,#fff0f2,#ffe0e5)",
          borderColor: "#FFD6DC",
        }}>
        <SpeakingIcon size="w-9 h-9" />
      </div>

      <h2
        className="text-xl font-bold mb-3"
        style={{
          color: "#0F0F13",
          fontFamily: "'Sora',sans-serif",
          letterSpacing: "-0.3px",
        }}>
        Speaking Tests Coming Soon
      </h2>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-7">
        We&apos;re building an AI-powered speaking evaluation system. Get
        notified when it&apos;s ready — be the first to practise.
      </p>

      {/* Notify button */}
      <button
        onClick={() => setNotified(true)}
        disabled={notified}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
        style={{
          background: notified ? "#10B981" : "#C8102E",
          fontFamily: "'Sora',sans-serif",
          boxShadow: notified
            ? "0 3px 10px rgba(16,185,129,0.3)"
            : "0 3px 10px rgba(200,16,46,0.3)",
        }}>
        {notified ? (
          <>
            <CheckIcon /> You&apos;ll be notified!
          </>
        ) : (
          <>
            <BellIcon /> Notify me when ready
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 mt-4">
        Expected launch:{" "}
        <span className="font-semibold" style={{ color: "#C8102E" }}>
          July 2025
        </span>
      </p>
    </div>
  );
};

// ─── Full Test Card ───────────────────────────────────────────────────────────
const FullTestCard = ({ test }) => {
  const router = useRouter();
  const [sections] = useState(test.sections || DEFAULT_SECTIONS);

  const handleStartSection = useCallback(
    (idx) => {
      if (sections[idx].status === "available") {
        router.push(`/take-test/full-test/${test.id}/${sections[idx].id}`);
      }
    },
    [sections, test.id, router],
  );

  const completedCount = useMemo(
    () => sections.filter((s) => s.status === "completed").length,
    [sections],
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-red-300 hover:shadow-md transition-all relative group">
      {test.freeScoring && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <span
            className="bg-blue-500 text-white text-[9.5px] font-bold px-3 py-0.5 rounded-b-lg"
            style={{ fontFamily: "'Sora',sans-serif" }}>
            Free Scoring
          </span>
        </div>
      )}

      <ChevronRight />

      <div className="mt-1 pr-5">
        <p
          className="text-sm font-bold mb-3"
          style={{ color: "#1A1A2E", fontFamily: "'Sora',sans-serif" }}>
          {test.name || test.title}
        </p>
        {test.scored === false && (
          <span className="text-[10px] font-semibold text-orange-500 block -mt-2 mb-2">
            Not Scored
          </span>
        )}

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
            <span>Progress</span>
            <span>
              {completedCount}/{sections.length} done
            </span>
          </div>
          <div className="flex gap-1">
            {sections.map((s) => (
              <div
                key={s.id}
                className="flex-1 h-1 rounded-full transition-all"
                style={{
                  background:
                    s.status === "completed"
                      ? "#10B981"
                      : s.status === "available"
                        ? "#3B82F6"
                        : "#E5E7EB",
                }}
              />
            ))}
          </div>
        </div>

        {/* Section rows */}
        <div className="space-y-1.5 mb-3">
          {sections.map((s, idx) => (
            <div
              key={s.id}
              className="flex items-center justify-between px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                {getSectionIcon(s.id)}
                {s.title}
                <span className="text-[10px] text-gray-400">
                  ({s.duration})
                </span>
              </div>
              {s.status === "completed" && (
                <span className="text-[11px] font-semibold text-green-500">
                  ✓ Done
                </span>
              )}
              {s.status === "available" && (
                <button
                  onClick={() => handleStartSection(idx)}
                  className="text-[11px] font-semibold text-blue-500 hover:text-blue-600 transition">
                  Start →
                </button>
              )}
              {s.status === "locked" && (
                <span className="text-[11px] text-gray-300">Locked</span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 flex-wrap text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <BarIcon /> {test.difficulty || "Medium"}
          </span>
          <span className="flex items-center gap-1">
            <UserIcon /> {(test.participants || 0).toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon /> {test.duration || "2h 45m"}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Individual Test Card ────────────────────────────────────────────────────
const IndividualTestCard = ({ test, sectionType }) => {
  const getPracticePath = useCallback(() => {
    const paths = {
      listening: `/practice/listening/${test._id}`,
      reading: `/practice/reading/${test._id}`,
      writing: `/practice/writing/${test._id}`,
      speaking: `/practice/speaking/${test._id}`,
    };
    return paths[sectionType] || `/practice/${test._id}`;
  }, [sectionType, test._id]);

  return (
    <Link href={getPracticePath()} className="block group">
      <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-red-300 hover:shadow-md transition-all relative">
        {test.freeScoring && (
          <div className="absolute -top-px left-1/2 -translate-x-1/2">
            <span
              className="bg-blue-500 text-white text-[9.5px] font-bold px-3 py-0.5 rounded-b-lg"
              style={{ fontFamily: "'Sora',sans-serif" }}>
              Free Scoring
            </span>
          </div>
        )}

        <ChevronRight />

        <div className="mt-1 pr-5">
          <p
            className="text-sm font-bold mb-3 group-hover:text-red-600 transition"
            style={{ color: "#1A1A2E", fontFamily: "'Sora',sans-serif" }}>
            {test.name || test.title}
          </p>
          {test.scored === false && (
            <span className="text-[10px] font-semibold text-orange-500 block -mt-2 mb-2">
              Not Scored
            </span>
          )}

          <div className="mb-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-semibold"
              style={{ fontFamily: "'Sora',sans-serif" }}>
              <ClockIcon /> {test.duration || "60 min"} · Single Test
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <BarIcon /> {test.difficulty || "Medium"}
            </span>
            <span className="flex items-center gap-1">
              <UserIcon /> {(test.participants || 0).toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon /> {test.duration || "1h"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Mock Test Series Row ────────────────────────────────────────────────────
const MockTestSeriesRow = ({ series, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 hover:shadow-sm transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left">
        <SeriesThumbnail num={series.id} />
        <div className="flex-1 min-w-0">
          <h3
            className="text-sm font-bold truncate"
            style={{ color: "#1A1A2E", fontFamily: "'Sora',sans-serif" }}>
            {series.name}
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-[11.5px] text-gray-400">
              <UserIcon /> {series.participants.toLocaleString()} participants
            </span>
            <span className="flex items-center gap-1 text-[11.5px] text-gray-400">
              <ChecklistIcon /> {series.completedOf} of {series.totalTests}{" "}
              completed
            </span>
          </div>
        </div>
        <div
          className={`text-gray-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <ChevronDown />
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {series.tests.map((test) => (
              <FullTestCard key={test.id} test={test} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Individual Tests Grid ───────────────────────────────────────────────────
const IndividualTestsGrid = ({ tests, sectionType }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {tests.map((test) => (
      <IndividualTestCard
        key={test._id || test.id}
        test={test}
        sectionType={sectionType}
      />
    ))}
  </div>
);

// ─── Empty State ─────────────────────────────────────────────────────────────
const EmptyState = ({ search, sectionType, onClear }) => (
  <div className="text-center py-20 text-gray-400">
    <svg
      className="w-10 h-10 mx-auto mb-3 opacity-30"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
      />
    </svg>
    <p className="text-sm font-medium text-gray-500">
      No {SECTION_META[sectionType]?.toLowerCase()} found{" "}
      {search && `for "${search}"`}
    </p>
    {search && (
      <button
        onClick={onClear}
        className="mt-3 text-xs font-semibold underline"
        style={{ color: "#C8102E" }}>
        Clear search
      </button>
    )}
  </div>
);

// ─── Pagination ──────────────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = useMemo(() => {
    return Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
      if (totalPages <= 5) return i + 1;
      if (currentPage <= 3) return i + 1;
      if (currentPage >= totalPages - 2) return totalPages - 4 + i;
      return currentPage - 2 + i;
    });
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback(
    (page) => {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [onPageChange],
  );

  const btnBase =
    "w-9 h-9 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all";

  return (
    <div className="flex items-center justify-center gap-1.5 py-10">
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`${btnBase} border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed`}>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 18l-6-6 6-6"
          />
        </svg>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={btnBase}
          style={
            p === currentPage
              ? {
                  background: "#C8102E",
                  color: "#fff",
                  borderColor: "transparent",
                  boxShadow: "0 3px 10px rgba(200,16,46,0.3)",
                }
              : { borderColor: "#E5E7EB", color: "#374151" }
          }
          aria-current={p === currentPage ? "page" : undefined}>
          {p}
        </button>
      ))}

      {totalPages > 5 && currentPage < totalPages - 2 && (
        <>
          <span className="text-gray-300">…</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`${btnBase} border-gray-200 text-gray-700 hover:border-red-300`}>
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`${btnBase} border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed`}>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 18l6-6-6-6"
          />
        </svg>
      </button>
    </div>
  );
};

// ─── Section Tabs ─────────────────────────────────────────────────────────────
const SectionTabs = ({ activeSection, onSectionChange }) => (
  <div className="bg-white rounded-2xl border border-gray-200 mb-5 overflow-hidden p-1.5">
    <div
      className="flex items-stretch overflow-x-auto"
      style={{ scrollbarWidth: "none" }}>
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.key;
        return (
          <button
            key={sec.key}
            onClick={() => onSectionChange(sec.key)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0"
            style={{
              fontFamily: "'Sora',sans-serif",
              ...(isActive
                ? {
                    background: "#C8102E",
                    color: "#fff",
                    boxShadow: "0 3px 10px rgba(200,16,46,0.3)",
                  }
                : { color: "#9CA3AF" }),
            }}
            aria-current={isActive ? "true" : "false"}>
            <span style={{ color: isActive ? "#fff" : "#BBC0CC" }}>
              {sec.icon}
            </span>
            {sec.label}
          </button>
        );
      })}
    </div>
  </div>
);

// ─── Search Bar ───────────────────────────────────────────────────────────────
const SearchBar = ({ search, onSearchChange, onFilterClick, onSortClick }) => (
  <div className="flex gap-2 mb-4">
    <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-50 transition-all">
      <SearchIcon />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search test title..."
        className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
        aria-label="Search tests"
      />
    </div>
    <button
      onClick={onFilterClick}
      className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-500 hover:border-red-300 hover:text-red-500 transition-all shrink-0"
      style={{ fontFamily: "'Sora',sans-serif" }}>
      <FilterIcon /> <span className="hidden sm:inline">Filters</span>
    </button>
    <button
      onClick={onSortClick}
      className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-gray-500 hover:border-red-300 hover:text-red-500 transition-all shrink-0"
      style={{ fontFamily: "'Sora',sans-serif" }}>
      <SortIcon /> <span className="hidden sm:inline">Sort By</span>
    </button>
  </div>
);

// ─── Results Counter ──────────────────────────────────────────────────────────
const ResultsCounter = ({ activeSection, count }) => (
  <p className="text-[11.5px] text-gray-400 mb-4 px-1">
    {activeSection === "full-test"
      ? `Showing ${count} series of ${SECTION_META[activeSection]}`
      : `Showing ${count} ${SECTION_META[activeSection]}`}
  </p>
);

// ─── Main Content ─────────────────────────────────────────────────────────────
function MockTestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("full-test");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Init from URL
  useEffect(() => {
    const typeParam = searchParams?.get("type");
    const valid = ["full-test", "listening", "reading", "writing", "speaking"];
    setActiveSection(
      typeParam && valid.includes(typeParam) ? typeParam : "full-test",
    );
  }, [searchParams]);

  // Load tests — skip API call for Speaking (coming soon)
  useEffect(() => {
    if (activeSection === "speaking") return;

    const loadTests = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await adminTestList(activeSection, currentPage);
        setTests(res?.data?.data || []);
      } catch (err) {
        setError("Failed to load tests. Please try again.");
        console.error("Error loading tests:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, [activeSection, currentPage]);

  // Transform flat list → series groups
  const transformToSeries = useCallback((testsData) => {
    const map = new Map();
    testsData.forEach((test, i) => {
      const sid = Math.ceil((i + 1) / 3);
      if (!map.has(sid)) {
        map.set(sid, {
          id: sid,
          _id: `series_${sid}`,
          name: `ILTSMILL Series — ${String(sid).padStart(2, "0")}`,
          participants:
            test.participants || Math.floor(Math.random() * 5000 + 500),
          completedOf: 0,
          totalTests: 3,
          tests: [],
        });
      }
      map.get(sid).tests.push(test);
    });
    return [...map.values()];
  }, []);

  const filteredTests = useMemo(() => {
    if (!search.trim()) return tests;
    return tests.filter((t) =>
      (t.name || t.title)?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tests, search]);

  const mockTestSeries = useMemo(
    () =>
      activeSection === "full-test" ? transformToSeries(filteredTests) : [],
    [filteredTests, activeSection, transformToSeries],
  );

  const totalPages = useMemo(() => {
    const count =
      activeSection === "full-test"
        ? mockTestSeries.length
        : filteredTests.length;
    return Math.ceil(count / ITEMS_PER_PAGE) || 1;
  }, [activeSection, mockTestSeries, filteredTests]);

  const paginatedSeries = useMemo(
    () =>
      activeSection === "full-test"
        ? mockTestSeries.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE,
          )
        : [],
    [activeSection, mockTestSeries, currentPage],
  );

  const paginatedTests = useMemo(
    () =>
      activeSection !== "full-test"
        ? filteredTests.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE,
          )
        : [],
    [activeSection, filteredTests, currentPage],
  );

  const handleSectionChange = useCallback(
    (section) => {
      setActiveSection(section);
      setCurrentPage(1);
      setSearch("");

      const params = new URLSearchParams(searchParams?.toString() || "");
      if (section === "full-test") params.delete("type");
      else params.set("type", section);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const handlePageChange = useCallback((page) => setCurrentPage(page), []);
  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    setCurrentPage(1);
  }, []);
  const handleClearSearch = useCallback(() => {
    setSearch("");
    setCurrentPage(1);
  }, []);

  // ── Loading ──
  if (loading && activeSection !== "speaking") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div
          className="animate-spin w-8 h-8 rounded-full border-4 border-t-transparent"
          style={{ borderColor: "#C8102E", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition"
            style={{ background: "#C8102E" }}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F7F8FC" }}>
      {/* Sora font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');`}</style>

      <main className="max-w-5xl mx-auto px-3 sm:px-5 py-6 sm:py-8">
        {/* Page heading */}
        <div className="mb-6">
          <h1
            className="text-xl font-bold"
            style={{
              color: "#0F0F13",
              fontFamily: "'Sora',sans-serif",
              letterSpacing: "-0.3px",
            }}>
            IELTS Practice Tests
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Choose a section and start practising today
          </p>
        </div>

        <SectionTabs
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />

        {/* ── Speaking → Coming Soon ── */}
        {activeSection === "speaking" ? (
          <ComingSoon />
        ) : (
          <>
            <SearchBar
              search={search}
              onSearchChange={handleSearchChange}
              onFilterClick={() => console.log("Filter clicked")}
              onSortClick={() => console.log("Sort clicked")}
            />
            <ResultsCounter
              activeSection={activeSection}
              count={
                activeSection === "full-test"
                  ? mockTestSeries.length
                  : filteredTests.length
              }
            />

            {/* Content */}
            {activeSection === "full-test" ? (
              paginatedSeries.length === 0 ? (
                <EmptyState
                  sectionType={activeSection}
                  search={search}
                  onClear={handleClearSearch}
                />
              ) : (
                <div className="space-y-3">
                  {paginatedSeries.map((series, i) => (
                    <MockTestSeriesRow
                      key={`series-${series.id}`}
                      series={series}
                      defaultOpen={i === 0 && currentPage === 1 && !search}
                    />
                  ))}
                </div>
              )
            ) : paginatedTests.length === 0 ? (
              <EmptyState
                sectionType={activeSection}
                search={search}
                onClear={handleClearSearch}
              />
            ) : (
              <IndividualTestsGrid
                tests={paginatedTests}
                sectionType={activeSection}
              />
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────
export default function MockTestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div
            className="animate-spin w-8 h-8 rounded-full border-4 border-t-transparent"
            style={{ borderColor: "#C8102E", borderTopColor: "transparent" }}
          />
        </div>
      }>
      <UserRoute>
        <Navbar />
        <MockTestContent />
        <Footer />
      </UserRoute>
    </Suspense>
  );
}
