"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import { selfPracticeList } from "../../action/student";
const Footer = dynamic(() => import("../../components/Footer/Footer"));

// ─── Data Fetcher ─────────────────────────────────────────────────────────────
const TYPE = "reading";
const PAGE_SIZE = 12;

const fetchPage = async (page = 1) => {
  const { data } = await selfPracticeList(TYPE, page);
  return data;
};

// Loads every page once so the sidebar filters work across ALL passages
const fetchAllPassages = async () => {
  const first = await fetchPage(1);
  const totalPages = first?.pagination?.pages || 1;
  let all = [...(first.data || [])];
  if (totalPages > 1) {
    const rest = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, i) => fetchPage(i + 2)),
    );
    rest.forEach((r) => {
      all = all.concat(r.data || []);
    });
  }
  return all;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const LEVEL_COLORS = {
  Academic: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  General: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
};

const READING_CATEGORIES = [
  "Biography",
  "Process",
  "History",
  "Environment",
  "Business",
  "Single Theory",
  "Technology",
  "Education",
  "Psychology",
  "Science",
];

const LEVELS = ["Academic", "General"];
const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

const EMPTY_FILTERS = {
  search: "",
  categories: [],
  levels: [],
  difficulties: [],
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const BookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.8" {...svgProps}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" {...svgProps}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" {...svgProps}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" {...svgProps}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" {...svgProps}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" strokeWidth="2.5" {...svgProps}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const toggleInList = (list, value) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

const countBy = (items, key) =>
  items.reduce((acc, it) => {
    if (it[key]) acc[it[key]] = (acc[it[key]] || 0) + 1;
    return acc;
  }, {});

// ─── Sidebar Filter Box ───────────────────────────────────────────────────────
function FilterGroup({ title, options, counts, selected, onToggle }) {
  return (
    <div className="mb-5 last:mb-0">
      <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[1px] text-slate-400">
        {title}
      </h4>
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <li key={opt}>
              <label
                className={`flex cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 ${
                  active ? "bg-blue-50 font-semibold text-blue-700" : ""
                }`}>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => onToggle(opt)}
                  className="m-0 h-[15px] w-[15px] cursor-pointer accent-blue-700"
                />
                <span className="flex-1">{opt}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    active
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                  {counts[opt] || 0}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Sidebar({ filters, setFilters, items, categories, open, onClose }) {
  const catCounts = useMemo(() => countBy(items, "category"), [items]);
  const levelCounts = useMemo(() => countBy(items, "level"), [items]);
  const diffCounts = useMemo(() => countBy(items, "difficulty"), [items]);

  const activeCount =
    filters.categories.length +
    filters.levels.length +
    filters.difficulties.length;

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[55] hidden bg-slate-900/45 max-[900px]:block"
        />
      )}

      <aside
        className={`sticky top-[90px] max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-[18px]
          max-[900px]:fixed max-[900px]:inset-y-0 max-[900px]:left-0 max-[900px]:z-[60] max-[900px]:max-h-none max-[900px]:w-[300px] max-[900px]:max-w-[86vw] max-[900px]:rounded-none max-[900px]:rounded-r-2xl max-[900px]:transition-transform max-[900px]:duration-250
          ${open ? "max-[900px]:translate-x-0 max-[900px]:shadow-[0_0_40px_rgba(15,23,42,0.25)]" : "max-[900px]:-translate-x-[105%]"}`}>
        <div className="mb-3.5 flex items-center justify-between border-b border-slate-100 pb-3.5">
          <span className="flex items-center gap-2 text-[15px] font-bold text-slate-900">
            <FilterIcon /> Filters
            {activeCount > 0 && (
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-700 px-1.5 text-[11px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </span>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button
                className="cursor-pointer border-none bg-transparent text-xs font-semibold text-red-600 hover:underline"
                onClick={() =>
                  setFilters({ ...EMPTY_FILTERS, search: filters.search })
                }>
                Clear all
              </button>
            )}
            <button
              className="hidden h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-none bg-slate-100 text-slate-600 max-[900px]:inline-flex"
              onClick={onClose}
              aria-label="Close filters">
              <XIcon />
            </button>
          </div>
        </div>

        <FilterGroup
          title="Passage Type"
          options={categories}
          counts={catCounts}
          selected={filters.categories}
          onToggle={(v) =>
            setFilters((f) => ({
              ...f,
              categories: toggleInList(f.categories, v),
            }))
          }
        />
        <FilterGroup
          title="Level"
          options={LEVELS}
          counts={levelCounts}
          selected={filters.levels}
          onToggle={(v) =>
            setFilters((f) => ({ ...f, levels: toggleInList(f.levels, v) }))
          }
        />
        <FilterGroup
          title="Difficulty"
          options={DIFFICULTIES}
          counts={diffCounts}
          selected={filters.difficulties}
          onToggle={(v) =>
            setFilters((f) => ({
              ...f,
              difficulties: toggleInList(f.difficulties, v),
            }))
          }
        />
      </aside>
    </>
  );
}

// ─── Practice Card ────────────────────────────────────────────────────────────
function PracticeCard({ item }) {
  const levelStyle = LEVEL_COLORS[item.level] || {
    bg: "#F9FAFB",
    text: "#374151",
    border: "#E5E7EB",
  };
  return (
    <Link href={`/reading/${item._id}`} className="no-underline">
      <div className="flex h-full cursor-pointer flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-[22px] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-700 hover:shadow-[0_8px_30px_rgba(29,78,216,0.12)]">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-slate-500">
            {item.category}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
            style={{
              background: levelStyle.bg,
              color: levelStyle.text,
              border: `1px solid ${levelStyle.border}`,
            }}>
            {item.level}
          </span>
        </div>
        <h3 className="m-0 font-['Lora',serif] text-base font-semibold leading-[1.4] text-slate-900">
          {item.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
            <ClockIcon /> {item.time} min
          </span>
          {item.difficulty && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              {item.difficulty}
            </span>
          )}
        </div>
        <div className="mt-auto border-t border-slate-100 pt-2.5">
          <span className="flex items-center gap-1 text-[13px] font-semibold text-blue-700">
            Start Reading <ChevronRight />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ page, pages, total, onPageChange }) {
  if (pages <= 1) return null;
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  const getPageNumbers = () => {
    const nums = [];
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) nums.push(i);
    } else {
      nums.push(1);
      if (page > 3) nums.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(pages - 1, page + 1); i++)
        nums.push(i);
      if (page < pages - 2) nums.push("...");
      nums.push(pages);
    }
    return nums;
  };

  const btnBase =
    "flex h-9 min-w-[36px] items-center justify-center rounded-lg border px-2.5 text-sm font-medium transition-all duration-150";

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 max-[640px]:flex-col max-[640px]:items-start">
      <span className="text-[13px] font-medium text-slate-500">
        Showing {from}–{to} of {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          className={`${btnBase} border-slate-200 bg-white text-slate-700 hover:not-disabled:border-blue-700 hover:not-disabled:bg-blue-50 hover:not-disabled:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40`}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}>
          ‹
        </button>
        {getPageNumbers().map((num, idx) =>
          num === "..." ? (
            <span
              key={`e-${idx}`}
              className="select-none px-1.5 text-sm text-slate-400">
              …
            </span>
          ) : (
            <button
              key={num}
              className={`${btnBase} ${
                num === page
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
              onClick={() => onPageChange(num)}>
              {num}
            </button>
          ),
        )}
        <button
          className={`${btnBase} border-slate-200 bg-white text-slate-700 hover:not-disabled:border-blue-700 hover:not-disabled:bg-blue-50 hover:not-disabled:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40`}
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}>
          ›
        </button>
      </div>
    </div>
  );
}

// ─── Reading Section (URL-persisted) ──────────────────────────────────────────
function ReadingSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse initial state from URL (so reload/back/share all restore correctly)
  const parseFiltersFromUrl = useCallback(() => {
    return {
      search: searchParams.get("search") || "",
      categories:
        searchParams.get("categories")?.split(",").filter(Boolean) || [],
      levels: searchParams.get("levels")?.split(",").filter(Boolean) || [],
      difficulties:
        searchParams.get("difficulties")?.split(",").filter(Boolean) || [],
    };
  }, [searchParams]);

  const initialPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [filters, setFilters] = useState(() => parseFiltersFromUrl());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip the very first URL sync so /reading stays clean until the user interacts
  const isFirstRender = useRef(true);

  // ── Write state → URL (client-side only, no page refresh) ────────────────
  const syncUrl = useCallback(
    (nextPage, nextFilters) => {
      const params = new URLSearchParams();
      if (nextPage > 1) params.set("page", String(nextPage));
      if (nextFilters.search) params.set("search", nextFilters.search);
      if (nextFilters.categories.length)
        params.set("categories", nextFilters.categories.join(","));
      if (nextFilters.levels.length)
        params.set("levels", nextFilters.levels.join(","));
      if (nextFilters.difficulties.length)
        params.set("difficulties", nextFilters.difficulties.join(","));

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  // ── Data fetch ───────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await fetchAllPassages());
    } catch (err) {
      setError("Failed to load. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ── Keep URL in sync with state ──────────────────────────────────────────
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    syncUrl(page, filters);
  }, [page, filters, syncUrl]);

  // ── Reset to page 1 only when filter CONTENT changes ─────────────────────
  const filtersKey = JSON.stringify(filters);
  useEffect(() => {
    setPage(1);
  }, [filtersKey]);

  // ── Categories (known + extras from data) ────────────────────────────────
  const categories = useMemo(() => {
    const extra = [...new Set(items.map((i) => i.category).filter(Boolean))].filter(
      (c) => !READING_CATEGORIES.includes(c),
    );
    return [...READING_CATEGORIES, ...extra];
  }, [items]);

  // ── Filtering ────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return items.filter((item) => {
      const matchSearch = !q || item.title?.toLowerCase().includes(q);
      const matchCat =
        !filters.categories.length || filters.categories.includes(item.category);
      const matchLevel =
        !filters.levels.length || filters.levels.includes(item.level);
      const matchDiff =
        !filters.difficulties.length ||
        filters.difficulties.includes(item.difficulty);
      return matchSearch && matchCat && matchLevel && matchDiff;
    });
  }, [items, filters]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // If URL had page > pages (e.g. after filter narrows results), clamp it
  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (n) => {
    if (n < 1 || n > pages) return;
    setPage(n);
    document
      .getElementById("section-reading")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const hasFilters =
    filters.search ||
    filters.categories.length ||
    filters.levels.length ||
    filters.difficulties.length;

  return (
    <section className="mb-6" id="section-reading">
      {/* Section header */}
      <div className="mb-6 flex items-start">
        <div className="flex items-center gap-4">
          <span
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[14px]"
            style={{ background: "#1D4ED818", color: "#1D4ED8" }}>
            <BookIcon />
          </span>
          <div>
            <h2 className="mb-1 font-['Lora',serif] text-[26px] font-bold text-blue-700">
              Reading
            </h2>
            <p className="m-0 text-sm text-slate-500">
              Academic &amp; General Training passages with comprehension
              questions
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[280px_1fr] items-start gap-6 max-[900px]:grid-cols-1">
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          items={items}
          categories={categories}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="min-w-0">
          {/* Top bar */}
          <div className="mb-3 flex gap-2.5">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-[11px] text-slate-400">
              <span className="flex flex-shrink-0 items-center">
                <SearchIcon />
              </span>
              <input
                className="min-w-0 flex-1 border-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                placeholder="Search passages by title…"
                value={filters.search}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
              />
              {filters.search && (
                <button
                  className="flex cursor-pointer items-center border-none bg-transparent p-0 text-slate-300 transition-colors hover:text-red-500"
                  onClick={() => setFilters((f) => ({ ...f, search: "" }))}>
                  <XIcon />
                </button>
              )}
            </div>
            <button
              className="hidden items-center gap-1.5 rounded-xl border-none bg-blue-700 px-4 text-sm font-semibold text-white max-[900px]:inline-flex"
              onClick={() => setSidebarOpen(true)}>
              <FilterIcon /> Filters
            </button>
          </div>

          {!loading && !error && (
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[13px] font-medium text-slate-500">
                {filtered.length} of {items.length} passages
              </span>
              {hasFilters && (
                <button
                  className="cursor-pointer border-none bg-transparent text-[13px] font-semibold text-blue-700 hover:underline"
                  onClick={() => setFilters(EMPTY_FILTERS)}>
                  Reset
                </button>
              )}
            </div>
          )}

          {error ? (
            <div className="flex flex-col items-center rounded-2xl border border-red-200 bg-red-50 px-6 py-[60px] text-center">
              <span className="mb-3 text-[40px]">⚠️</span>
              <p className="mb-4 text-base font-semibold text-red-600">{error}</p>
              <button
                className="cursor-pointer rounded-[10px] border-none bg-blue-700 px-5 py-[9px] text-[13px] font-bold text-white transition-colors hover:bg-blue-800"
                onClick={load}>
                Retry
              </button>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5 max-[640px]:grid-cols-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%]"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-[60px] text-center">
              <span className="mb-3 text-[40px]">🔍</span>
              <p className="mb-1.5 text-base font-bold text-slate-900">
                No passages found
              </p>
              <p className="mb-5 text-sm text-slate-400">
                Try adjusting your search or filters.
              </p>
              <button
                className="cursor-pointer rounded-[10px] border-none bg-blue-700 px-5 py-[9px] text-[13px] font-bold text-white transition-colors hover:bg-blue-800"
                onClick={() => setFilters(EMPTY_FILTERS)}>
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5 max-[640px]:grid-cols-1">
                {visible.map((item, idx) => (
                  <PracticeCard key={item._id || idx} item={item} />
                ))}
              </div>
              <Pagination
                page={page}
                pages={pages}
                total={filtered.length}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const ReadingPractice = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-['DM_Sans',sans-serif]">
      <Navbar />
      <main>
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#1E3A5F] to-blue-700 px-6 pb-14 pt-20 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(99,102,241,0.2)_0%,transparent_70%)]" />
          <div className="relative mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-blue-300">
            IELTS Preparation
          </div>
          <h1 className="relative mb-4 font-['Lora',serif] text-[clamp(36px,6vw,64px)] font-bold text-white">
            Reading Practice
          </h1>
          <p className="relative mx-auto mb-9 max-w-[540px] text-[clamp(15px,2.5vw,18px)] leading-[1.7] text-slate-400">
            Pick a passage type from the filter and start reading.
            <br />
            Build speed, accuracy and exam confidence.
          </p>
          <div className="relative inline-flex items-center gap-8 rounded-2xl border border-white/10 bg-white/[0.08] px-10 py-5 max-[640px]:gap-5 max-[640px]:px-5 max-[640px]:py-4">
            <div className="text-center">
              <span className="block font-['Lora',serif] text-[26px] font-bold text-white">
                120+
              </span>
              <span className="text-xs font-medium tracking-[0.5px] text-slate-400">
                Passages
              </span>
            </div>
            <div className="h-10 w-px bg-white/15" />
            <div className="text-center">
              <span className="block font-['Lora',serif] text-[26px] font-bold text-white">
                Free
              </span>
              <span className="text-xs font-medium tracking-[0.5px] text-slate-400">
                Access
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1280px] px-6 pb-20 pt-12 max-[640px]:px-4 max-[640px]:pb-[60px] max-[640px]:pt-8">
          <ReadingSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReadingPractice;