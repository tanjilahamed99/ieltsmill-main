"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import { selfPracticeList } from "../../action/student";
const Footer = dynamic(() => import("../../components/Footer/Footer"));

const fetchPractices = async (type, page = 1) => {
  const { data } = await selfPracticeList(type, page);
  return data;
};

const LEVEL_COLORS = {
  Academic: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  General: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  "Task 1": { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  "Task 2": { bg: "#FAF5FF", text: "#7E22CE", border: "#E9D5FF" },
};

const READING_CATEGORIES = [
  "Biography","Process","History","Environment","Business",
  "Single Theory","Technology","Education","Psychology","Science",
];

const WRITING_CATEGORIES = [
  "Task 1 – Academic","Task 1 – General Training","Task 2 – Essay",
  "Task 2 – Opinion","Task 2 – Discussion","Task 2 – Problem/Solution",
  "Task 2 – Advantage/Disadvantage",
];

const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

const BookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
const PenIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Filter Bar ─────────────────────────────────────────────────────────────

function FilterBar({ filters, onChange, activeType }) {
  const categories = activeType === "reading" ? READING_CATEGORIES : WRITING_CATEGORIES;
  const hasActive = filters.search || filters.category || filters.difficulty;

  const clear = () => onChange({ search: "", category: "", difficulty: "" });

  return (
    <div className="filter-bar">
      {/* Search */}
      <div className="filter-search-wrap">
        <span className="filter-icon-left"><SearchIcon /></span>
        <input
          className="filter-search-input"
          placeholder="Search by title…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
        {filters.search && (
          <button className="filter-x" onClick={() => onChange({ ...filters, search: "" })}><XIcon /></button>
        )}
      </div>

      {/* Category */}
      <div className="filter-select-wrap">
        <FilterIcon />
        <select
          className="filter-select"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Difficulty */}
      <div className="filter-select-wrap">
        <FilterIcon />
        <select
          className="filter-select"
          value={filters.difficulty}
          onChange={(e) => onChange({ ...filters, difficulty: e.target.value })}
        >
          <option value="">All Difficulties</option>
          {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Clear */}
      {hasActive && (
        <button className="filter-clear-btn" onClick={clear}>
          <XIcon /> Clear
        </button>
      )}
    </div>
  );
}

// ─── Active filter chips ─────────────────────────────────────────────────────

function ActiveChips({ filters, onChange, total, filtered }) {
  const chips = [];
  if (filters.search) chips.push({ label: `"${filters.search}"`, key: "search" });
  if (filters.category) chips.push({ label: filters.category, key: "category" });
  if (filters.difficulty) chips.push({ label: filters.difficulty, key: "difficulty" });
  if (!chips.length) return null;

  return (
    <div className="active-chips-row">
      <span className="chips-result-text">
        {filtered} of {total} results
      </span>
      {chips.map((chip) => (
        <span key={chip.key} className="active-chip">
          {chip.label}
          <button className="chip-remove" onClick={() => onChange({ ...filters, [chip.key]: "" })}><XIcon /></button>
        </span>
      ))}
    </div>
  );
}

// ─── Practice Card ───────────────────────────────────────────────────────────

function PracticeCard({ item, type }) {
  const levelStyle = LEVEL_COLORS[item.level] || { bg: "#F9FAFB", text: "#374151", border: "#E5E7EB" };
  return (
    <Link href={`/self-practice/${type}/${item._id}`} style={{ textDecoration: "none" }}>
      <div className="practice-card">
        <div className="card-top">
          <span className="category-badge">{item.category}</span>
          <span className="level-badge" style={{ background: levelStyle.bg, color: levelStyle.text, border: `1px solid ${levelStyle.border}` }}>
            {item.level}
          </span>
        </div>
        <h3 className="card-title">{item.title}</h3>
        <div className="card-meta">
          <span className="meta-item"><ClockIcon /> {item.time} min</span>
          {item.difficulty && <span className="meta-diff">{item.difficulty}</span>}
          {type === "writing" && <span className="meta-item">✍️ {item.words}+ words</span>}
        </div>
        <div className="card-footer">
          <span className="start-btn">Start Practice <ChevronRight /></span>
        </div>
      </div>
    </Link>
  );
}

// ─── Pagination ──────────────────────────────────────────────────────────────

function Pagination({ pagination, onPageChange }) {
  const { page, pages, total, limit } = pagination;
  if (pages <= 1) return null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const nums = [];
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) nums.push(i);
    } else {
      nums.push(1);
      if (page > 3) nums.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(pages - 1, page + 1); i++) nums.push(i);
      if (page < pages - 2) nums.push("...");
      nums.push(pages);
    }
    return nums;
  };

  return (
    <div className="pagination-wrap">
      <span className="pagination-info">Showing {from}–{to} of {total}</span>
      <div className="pagination-controls">
        <button className="page-btn" onClick={() => onPageChange(page - 1)} disabled={page === 1}>‹</button>
        {getPageNumbers().map((num, idx) =>
          num === "..." ? (
            <span key={`e-${idx}`} className="page-ellipsis">…</span>
          ) : (
            <button key={num} className={`page-btn ${num === page ? "page-btn--active" : ""}`} onClick={() => onPageChange(num)}>{num}</button>
          )
        )}
        <button className="page-btn" onClick={() => onPageChange(page + 1)} disabled={page === pages}>›</button>
      </div>
    </div>
  );
}

// ─── Practice Section ────────────────────────────────────────────────────────

function PracticeSection({ type, icon, title, color, description }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
  const [filters, setFilters] = useState({ search: "", category: "", difficulty: "" });

  const loadPage = useCallback(async (pageNum) => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const data = await fetchPractices(type, pageNum);
    setItems(data.data);
    setPagination(data.pagination);
    setLoading(false);
  }, [type]);

  useEffect(() => { loadPage(1); }, [loadPage]);

  // Client-side filtering
  const filtered = items.filter((item) => {
    const q = filters.search.toLowerCase();
    const matchSearch = !q || item.title?.toLowerCase().includes(q);
    const matchCat = !filters.category || item.category === filters.category;
    const matchDiff = !filters.difficulty || item.difficulty === filters.difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  const isFiltering = filters.search || filters.category || filters.difficulty;

  return (
    <section className="practice-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-icon" style={{ background: color + "18", color }}>{icon}</span>
          <div>
            <h2 className="section-title" style={{ color }}>{title}</h2>
            <p className="section-desc">{description}</p>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <FilterBar filters={filters} onChange={setFilters} activeType={type} />

      {/* ── Active filter chips + count ── */}
      <ActiveChips
        filters={filters}
        onChange={setFilters}
        total={items.length}
        filtered={filtered.length}
      />

      {loading ? (
        <div className="cards-grid">
          {[1, 2, 3].map((i) => <div key={i} className="skeleton-card" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p className="empty-title">No results found</p>
          <p className="empty-sub">Try adjusting your search or filters.</p>
          <button className="empty-clear" onClick={() => setFilters({ search: "", category: "", difficulty: "" })}>
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="cards-grid">
            {filtered.map((item, idx) => (
              <PracticeCard key={idx} item={item} type={type} />
            ))}
          </div>
          {!isFiltering && <Pagination pagination={pagination} onPageChange={loadPage} />}
        </>
      )}
    </section>
  );
}

// ─── Type Tab Switcher (hero area) ──────────────────────────────────────────

function TypeTabs({ active, onChange }) {
  return (
    <div className="type-tabs">
      <button
        className={`type-tab ${active === "all" ? "type-tab--active-all" : ""}`}
        onClick={() => onChange("all")}
      >
        All
      </button>
      <button
        className={`type-tab ${active === "reading" ? "type-tab--active-reading" : ""}`}
        onClick={() => onChange("reading")}
      >
        📖 Reading
      </button>
      <button
        className={`type-tab ${active === "writing" ? "type-tab--active-writing" : ""}`}
        onClick={() => onChange("writing")}
      >
        ✍️ Writing
      </button>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const SelfPractice = () => {
  const [activeType, setActiveType] = useState("all");

  return (
    <div className="sp-root">
      <Navbar />
      <main className="sp-main">

        {/* Hero */}
        <div className="sp-hero">
          <div className="hero-badge">IELTS Preparation</div>
          <h1 className="hero-title">Self Practice</h1>
          <p className="hero-subtitle">
            Sharpen your IELTS skills with curated reading passages and writing tasks.
            <br />
            Track your progress and build exam confidence.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">120+</span>
              <span className="stat-label">Passages</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">80+</span>
              <span className="stat-label">Writing Tasks</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">Free</span>
              <span className="stat-label">Access</span>
            </div>
          </div>

          {/* ── Type tabs in hero ── */}
          {/* <TypeTabs active={activeType} onChange={setActiveType} /> */}
        </div>

        {/* Sections */}
        <div className="sp-content">
          {(activeType === "all" || activeType === "reading") && (
            <PracticeSection
              type="reading"
              icon={<BookIcon />}
              title="Reading"
              color="#1D4ED8"
              description="Academic & General Training passages with comprehension questions"
            />
          )}
          {(activeType === "all" || activeType === "writing") && (
            <PracticeSection
              type="writing"
              icon={<PenIcon />}
              title="Writing"
              color="#7E22CE"
              description="Task 1 & Task 2 prompts with model answers and evaluation criteria"
            />
          )}
        </div>
      </main>
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sp-root { font-family: 'DM Sans', sans-serif; background: #F8FAFC; min-height: 100vh; }

        /* ── HERO ── */
        .sp-hero {
          background: linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #1D4ED8 100%);
          padding: 80px 24px 56px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .sp-hero::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.2) 0%, transparent 70%);
        }
        .hero-badge {
          display: inline-block;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
          color: #93C5FD; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 6px 16px; border-radius: 100px; margin-bottom: 20px;
        }
        .hero-title {
          font-family: 'Lora', serif;
          font-size: clamp(36px, 6vw, 64px); font-weight: 700;
          color: #fff; margin: 0 0 16px; position: relative;
        }
        .hero-subtitle {
          color: #94A3B8; font-size: clamp(15px, 2.5vw, 18px);
          max-width: 540px; margin: 0 auto 36px;
          line-height: 1.7; position: relative;
        }
        .hero-stats {
          display: inline-flex; align-items: center; gap: 32px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px; padding: 20px 40px; position: relative;
          margin-bottom: 32px;
        }
        .stat { text-align: center; }
        .stat-num { display: block; font-size: 26px; font-weight: 700; color: #fff; font-family: 'Lora', serif; }
        .stat-label { font-size: 12px; color: #94A3B8; font-weight: 500; letter-spacing: 0.5px; }
        .stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.15); }

        /* ── TYPE TABS ── */
        .type-tabs {
          display: inline-flex; gap: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 14px; padding: 6px;
          position: relative;
        }
        .type-tab {
          padding: 9px 22px; border-radius: 10px;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          color: #94A3B8; background: transparent;
          transition: all 0.18s ease;
        }
        .type-tab:hover { color: #fff; background: rgba(255,255,255,0.1); }
        .type-tab--active-all    { background: #fff !important; color: #0F172A !important; }
        .type-tab--active-reading { background: #1D4ED8 !important; color: #fff !important; }
        .type-tab--active-writing { background: #7E22CE !important; color: #fff !important; }

        /* ── CONTENT ── */
        .sp-content { max-width: 1200px; margin: 0 auto; padding: 60px 24px 80px; }
        .practice-section { margin-bottom: 64px; }

        .section-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 20px; flex-wrap: wrap; gap: 12px;
        }
        .section-title-wrap { display: flex; align-items: center; gap: 16px; }
        .section-icon {
          width: 56px; height: 56px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .section-title { font-family: 'Lora', serif; font-size: 26px; font-weight: 700; margin: 0 0 4px; }
        .section-desc { color: #64748B; font-size: 14px; margin: 0; }

        /* ── FILTER BAR ── */
        .filter-bar {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          background: #fff; border: 1px solid #E2E8F0;
          border-radius: 14px; padding: 12px 16px;
          margin-bottom: 12px;
        }
        .filter-search-wrap {
          display: flex; align-items: center; gap: 8px;
          flex: 1; min-width: 200px;
          background: #F8FAFC; border: 1px solid #E2E8F0;
          border-radius: 10px; padding: 8px 12px; color: #94A3B8;
        }
        .filter-icon-left { display: flex; align-items: center; flex-shrink: 0; }
        .filter-search-input {
          flex: 1; border: none; outline: none; background: transparent;
          font-size: 13px; font-family: 'DM Sans', sans-serif; color: #1E293B;
        }
        .filter-search-input::placeholder { color: #94A3B8; }
        .filter-x {
          background: none; border: none; cursor: pointer;
          color: #CBD5E1; display: flex; align-items: center;
          padding: 0; transition: color 0.15s;
        }
        .filter-x:hover { color: #EF4444; }

        .filter-select-wrap {
          display: flex; align-items: center; gap: 7px;
          background: #F8FAFC; border: 1px solid #E2E8F0;
          border-radius: 10px; padding: 8px 12px; color: #64748B;
        }
        .filter-select {
          border: none; outline: none; background: transparent;
          font-size: 13px; font-family: 'DM Sans', sans-serif;
          color: #374151; cursor: pointer;
          min-width: 130px;
        }

        .filter-clear-btn {
          display: flex; align-items: center; gap: 5px;
          border: 1px solid #FECACA; background: #FEF2F2;
          color: #DC2626; border-radius: 10px;
          padding: 8px 14px; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .filter-clear-btn:hover { background: #FEE2E2; }

        /* ── ACTIVE CHIPS ── */
        .active-chips-row {
          display: flex; align-items: center; gap: 8px;
          flex-wrap: wrap; margin-bottom: 16px;
        }
        .chips-result-text { font-size: 12px; color: #94A3B8; font-weight: 500; }
        .active-chip {
          display: inline-flex; align-items: center; gap: 5px;
          background: #EFF6FF; border: 1px solid #BFDBFE;
          color: #1D4ED8; border-radius: 100px;
          padding: 4px 10px 4px 12px; font-size: 12px; font-weight: 600;
        }
        .chip-remove {
          background: none; border: none; cursor: pointer;
          color: #93C5FD; display: flex; align-items: center;
          padding: 0; transition: color 0.15s;
        }
        .chip-remove:hover { color: #1D4ED8; }

        /* ── EMPTY STATE ── */
        .empty-state {
          display: flex; flex-direction: column; align-items: center;
          padding: 60px 24px; text-align: center;
          background: #fff; border: 1px solid #E2E8F0; border-radius: 16px;
        }
        .empty-icon { font-size: 40px; margin-bottom: 12px; }
        .empty-title { font-size: 16px; font-weight: 700; color: #0F172A; margin-bottom: 6px; }
        .empty-sub { font-size: 14px; color: #94A3B8; margin-bottom: 20px; }
        .empty-clear {
          background: #1D4ED8; color: #fff; border: none;
          border-radius: 10px; padding: 9px 20px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: background 0.15s;
        }
        .empty-clear:hover { background: #1E40AF; }

        /* ── CARDS ── */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .practice-card {
          background: #fff; border: 1px solid #E2E8F0;
          border-radius: 16px; padding: 22px; cursor: pointer;
          transition: all 0.22s ease;
          display: flex; flex-direction: column; gap: 12px;
        }
        .practice-card:hover {
          border-color: #1D4ED8;
          box-shadow: 0 8px 30px rgba(29,78,216,0.12);
          transform: translateY(-2px);
        }
        .card-top { display: flex; align-items: center; justify-content: space-between; }
        .category-badge {
          font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
          text-transform: uppercase; color: #64748B;
          background: #F1F5F9; padding: 3px 10px; border-radius: 100px;
        }
        .level-badge { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px; }
        .card-title {
          font-family: 'Lora', serif; font-size: 16px; font-weight: 600;
          color: #0F172A; margin: 0; line-height: 1.4;
        }
        .card-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .meta-item { display: flex; align-items: center; gap: 5px; font-size: 13px; color: #64748B; font-weight: 500; }
        .meta-diff {
          font-size: 11px; font-weight: 600; padding: 2px 9px; border-radius: 100px;
          background: #F1F5F9; color: #475569;
        }
        .card-footer { margin-top: auto; padding-top: 4px; border-top: 1px solid #F1F5F9; }
        .start-btn { display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 600; color: #1D4ED8; }

        /* ── PAGINATION ── */
        .pagination-wrap {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px; margin-top: 32px;
          padding-top: 24px; border-top: 1px solid #E2E8F0;
        }
        .pagination-info { font-size: 13px; color: #64748B; font-weight: 500; }
        .pagination-controls { display: flex; align-items: center; gap: 4px; }
        .page-btn {
          min-width: 36px; height: 36px; padding: 0 10px;
          border: 1px solid #E2E8F0; border-radius: 8px;
          background: #fff; color: #374151;
          font-size: 14px; font-weight: 500; cursor: pointer;
          transition: all 0.15s ease;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif;
        }
        .page-btn:hover:not(:disabled) { border-color: #1D4ED8; color: #1D4ED8; background: #EFF6FF; }
        .page-btn:disabled { opacity: 0.38; cursor: not-allowed; }
        .page-btn--active { background: #1D4ED8 !important; border-color: #1D4ED8 !important; color: #fff !important; }
        .page-ellipsis { font-size: 14px; color: #94A3B8; padding: 0 6px; user-select: none; }

        /* ── SKELETON ── */
        .skeleton-card {
          border: 1px solid #E2E8F0; border-radius: 16px; height: 160px;
          background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
          background-size: 200% 100%; animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        @media (max-width: 640px) {
          .sp-hero { padding: 60px 16px 44px; }
          .hero-stats { padding: 16px 20px; gap: 20px; }
          .sp-content { padding: 40px 16px 60px; }
          .cards-grid { grid-template-columns: 1fr; }
          .pagination-wrap { flex-direction: column; align-items: flex-start; }
          .type-tabs { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
};

export default SelfPractice;