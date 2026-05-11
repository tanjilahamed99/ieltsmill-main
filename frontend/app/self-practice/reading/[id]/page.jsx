"use client";

// pages/self-practice/reading/[id].jsx
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "../../../../components/Navbar/Navbar";
import { useParams } from "next/navigation";
import { selfPracticeById } from "../../../../action/student";

// ─── Split passage text into annotated spans ──────────────────────────────────
function buildSpans(text, highlights) {
  if (!highlights.length) return [{ text, highlighted: false }];
  let points = new Set([0, text.length]);
  highlights.forEach((h) => {
    points.add(h.start);
    points.add(h.end);
  });
  points = Array.from(points).sort((a, b) => a - b);
  return points.slice(0, -1).map((start, i) => {
    const end = points[i + 1];
    const highlighted = highlights.some(
      (h) => h.start <= start && h.end >= end,
    );
    return { text: text.slice(start, end), highlighted };
  });
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ClockIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const MarkerIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const EraserIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M20 20H7L3 16l11-11 6 6-2.5 2.5" />
    <path d="M6 14l4 4" />
  </svg>
);

// ─── Passage renderer ─────────────────────────────────────────────────────────
function Passage({ text, highlights, onSelect }) {
  const ref = useRef(null);
  const spans = buildSpans(text, highlights);

  const handlePointerUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
    const range = sel.getRangeAt(0);
    if (!ref.current?.contains(range.commonAncestorContainer)) return;

    const rect = range.getBoundingClientRect();
    const pre = document.createRange();
    pre.setStart(ref.current, 0);
    pre.setEnd(range.startContainer, range.startOffset);
    const start = pre.toString().length;
    const selected = sel.toString();

    onSelect({
      start,
      end: start + selected.length,
      rect: {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      },
    });
  }, [onSelect]);

  return (
    <div
      ref={ref}
      className="passage-body"
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}>
      {spans.map((s, i) =>
        s.highlighted ? (
          <mark key={i} className="passage-mark">
            {s.text}
          </mark>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </div>
  );
}

// ─── Floating popup ───────────────────────────────────────────────────────────
function SelectionPopup({
  selection,
  isHighlighted,
  onHighlight,
  onClear,
  onDismiss,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ top: -999, left: -999, ready: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pw = el.offsetWidth || 168;
    const ph = el.offsetHeight || 44;
    const { rect } = selection;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const centerX = (rect.left + rect.right) / 2 + scrollX;
    let top = rect.top + scrollY - ph - 12;
    if (top < scrollY + 8) top = rect.bottom + scrollY + 12;
    let left = centerX - pw / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
    setPos({ top, left, ready: true });
  }, [selection]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onDismiss();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onDismiss]);

  return (
    <div
      ref={ref}
      className="sel-popup"
      style={{
        top: pos.top,
        left: pos.left,
        opacity: pos.ready ? 1 : 0,
        pointerEvents: pos.ready ? "auto" : "none",
      }}>
      {!isHighlighted ? (
        <button className="sel-btn highlight-btn" onClick={onHighlight}>
          <MarkerIcon /> Highlight
        </button>
      ) : (
        <button className="sel-btn clear-btn" onClick={onClear}>
          <EraserIcon /> Clear
        </button>
      )}
    </div>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────
export default function ReadingDetail() {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [highlights, setHighlights] = useState([]); // [{id, start, end}]
  const [selection, setSelection] = useState(null); // {start, end, rect}
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      const { data } = await selfPracticeById({ id, type: "reading" });
      if (data.success) {
        setData(data.data);
        setLoading(false);
        setTimeLeft(data.data.time * 60);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // Check if current selection is already fully highlighted
  const isHighlighted = selection
    ? highlights.some(
        (h) => h.start <= selection.start && h.end >= selection.end,
      )
    : false;

  const handleSelect = useCallback((sel) => setSelection(sel), []);

  const handleHighlight = () => {
    if (!selection) return;
    const newH = {
      id: Date.now().toString(),
      start: selection.start,
      end: selection.end,
    };
    setHighlights((prev) => {
      // remove any that fully overlap, then add merged
      const rest = prev.filter(
        (h) => h.end <= newH.start || h.start >= newH.end,
      );
      return [...rest, newH].sort((a, b) => a.start - b.start);
    });
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  };

  const handleClear = () => {
    if (!selection) return;
    setHighlights((prev) =>
      prev.filter((h) => !(h.start < selection.end && h.end > selection.start)),
    );
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  };

  const dismiss = () => {
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  };

  const timePct =
    timeLeft !== null && data ? (timeLeft / (data.time * 60)) * 100 : 100;
  const urgent = timeLeft !== null && timeLeft < 60;

  if (loading) {
    return (
      <div className="rd-root">
        <Navbar />
        <div className="rd-loading">
          <div className="rd-spinner" />
          <p>Loading passage…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rd-root">
      {/* <Navbar /> */}

      {/* Top bar */}
      <header className="rd-topbar">
        <Link href="/self-practice" className="back-link">
          <ChevronLeft /> Back
        </Link>

        <div className="rd-meta">
          <span className="rd-level">{data.level}</span>
          <span className="rd-heading-label">{data.title}</span>
        </div>

        <div className="rd-controls">
          {highlights.length > 0 && (
            <button
              className="clear-all-btn"
              onClick={() => {
                setHighlights([]);
                setSelection(null);
              }}>
              <EraserIcon /> Clear all
              <span className="clear-all-count">{highlights.length}</span>
            </button>
          )}

          {!timerActive ? (
            <button
              className="timer-start-btn"
              onClick={() => setTimerActive(true)}>
              ▶ Start Timer
            </button>
          ) : (
            <div className={`rd-timer ${urgent ? "urgent" : ""}`}>
              <svg className="timer-ring" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2.8"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke={urgent ? "#EF4444" : "#1D4ED8"}
                  strokeWidth="2.8"
                  strokeDasharray="100"
                  strokeDashoffset={100 - timePct}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span className="timer-label">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="rd-main">
        {/* Chips row */}
        <div className="chips-row">
          <span className="chip chip-cat">{data.category}</span>
          <span className="chip chip-time">
            <ClockIcon /> {data.time} min
          </span>
          <span className="chip chip-tip">
            <MarkerIcon /> Select text to highlight
          </span>
          {highlights.length > 0 && (
            <span className="chip chip-hl">
              🖊 {highlights.length} highlight
              {highlights.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Passage */}
        <article className="passage-card">
          <h1 className="passage-title">{data.title}</h1>
          <div className="passage-rule" />
          <Passage
            text={data.passage}
            highlights={highlights}
            onSelect={handleSelect}
          />
        </article>
      </main>

      {/* Popup */}
      {selection && (
        <SelectionPopup
          selection={selection}
          isHighlighted={isHighlighted}
          onHighlight={handleHighlight}
          onClear={handleClear}
          onDismiss={dismiss}
        />
      )}

      {/* <Footer /> */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rd-root {
          font-family: 'DM Sans', sans-serif;
          background: #F8FAFC;
          min-height: 100vh;
        }

        /* ── TOPBAR ── */
        .rd-topbar {
          position: sticky; top: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          background: #ffffff;
          border-bottom: 1px solid #E2E8F0;
          padding: 13px 28px;
        }

        .back-link {
          display: flex; align-items: center; gap: 5px;
          color: #64748B; font-size: 14px; font-weight: 500;
          text-decoration: none; flex-shrink: 0; white-space: nowrap;
        }
        .back-link:hover { color: #1D4ED8; }

        .rd-meta {
          display: flex; align-items: center; gap: 10px;
          flex: 1; justify-content: center; min-width: 0;
        }
        .rd-level {
          background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE;
          font-size: 11px; font-weight: 700; letter-spacing: 0.4px;
          padding: 3px 10px; border-radius: 100px; flex-shrink: 0;
        }
        .rd-heading-label {
          font-family: 'Lora', serif;
          font-size: 15px; font-weight: 600; color: #0F172A;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .rd-controls {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }

        .clear-all-btn {
          display: flex; align-items: center; gap: 6px;
          background: #F8FAFC; border: 1px solid #E2E8F0;
          color: #64748B; font-size: 13px; font-weight: 600;
          padding: 7px 13px; border-radius: 8px; cursor: pointer;
          transition: all 0.15s;
        }
        .clear-all-btn:hover { background: #FEF2F2; border-color: #FECACA; color: #DC2626; }
        .clear-all-count {
          background: #E2E8F0; color: #475569;
          font-size: 11px; font-weight: 700;
          padding: 1px 7px; border-radius: 100px;
        }

        .timer-start-btn {
          background: #1D4ED8; color: #fff;
          border: none; border-radius: 8px;
          padding: 8px 16px; font-size: 13px; font-weight: 600;
          cursor: pointer; white-space: nowrap; transition: background 0.15s;
        }
        .timer-start-btn:hover { background: #1E40AF; }

        .rd-timer {
          display: flex; align-items: center; gap: 8px;
          font-size: 15px; font-weight: 700; color: #1D4ED8;
        }
        .rd-timer.urgent { color: #EF4444; }
        .timer-ring { width: 36px; height: 36px; flex-shrink: 0; }
        .timer-label { font-variant-numeric: tabular-nums; }

        /* ── LOADING ── */
        .rd-loading {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; height: 60vh; gap: 16px; color: #94A3B8;
          font-size: 15px;
        }
        .rd-spinner {
          width: 36px; height: 36px;
          border: 3px solid #E2E8F0; border-top-color: #1D4ED8;
          border-radius: 50%; animation: spin 0.75s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── MAIN ── */
        .rd-main {
          max-width: 780px;
          margin: 0 auto;
          padding: 36px 24px 100px;
        }

        /* ── CHIPS ── */
        .chips-row {
          display: flex; align-items: center; gap: 8px;
          flex-wrap: wrap; margin-bottom: 20px;
        }
        .chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 500;
          padding: 5px 12px; border-radius: 100px;
        }
        .chip-cat  { background: #F1F5F9; color: #475569; }
        .chip-time { background: #EFF6FF; color: #1D4ED8; border: 1px solid #DBEAFE; }
        .chip-tip  { background: #FEFCE8; color: #854D0E; border: 1px solid #FDE68A; }
        .chip-hl   { background: #FEF9C3; color: #713F12; border: 1px solid #FDE047; font-weight: 600; }

        /* ── PASSAGE CARD ── */
        .passage-card {
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 48px 56px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .passage-title {
          font-family: 'Lora', serif;
          font-size: 27px; font-weight: 700; color: #0F172A;
          line-height: 1.35; margin-bottom: 18px;
        }

        .passage-rule {
          width: 44px; height: 3px;
          background: #1D4ED8; border-radius: 100px;
          margin-bottom: 30px;
        }

        .passage-body {
          font-family: 'Lora', serif;
          font-size: 17px; line-height: 2;
          color: #1E293B;
          white-space: pre-wrap;
          cursor: text;
          user-select: text;
          -webkit-user-select: text;
        }

        .passage-mark {
          background: #FEF08A;
          color: #713F12;
          border-radius: 3px;
          padding: 0 2px;
          font: inherit;
          cursor: pointer;
        }
        .passage-mark:hover { background: #FDE047; }

        /* ── SELECTION POPUP ── */
        .sel-popup {
          position: absolute;
          z-index: 500;
          display: flex;
          background: #1E293B;
          border-radius: 10px;
          padding: 5px;
          gap: 4px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
          transition: opacity 0.12s ease;
        }

        /* tiny caret below popup (CSS only) */
        .sel-popup::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%; transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #1E293B;
        }

        .sel-btn {
          display: flex; align-items: center; gap: 7px;
          border: none; border-radius: 7px;
          padding: 9px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 700;
          cursor: pointer; transition: filter 0.15s;
          white-space: nowrap;
        }
        .sel-btn:hover { filter: brightness(0.93); }

        .highlight-btn { background: #FEF08A; color: #713F12; }
        .clear-btn     { background: #FEE2E2; color: #991B1B; }

        /* ── RESPONSIVE ── */
        @media (max-width: 720px) {
          .passage-card { padding: 30px 24px; }
          .passage-title { font-size: 22px; }
          .passage-body { font-size: 16px; line-height: 1.9; }
          .rd-heading-label { display: none; }
        }
        @media (max-width: 480px) {
          .rd-topbar { padding: 10px 14px; }
          .rd-main { padding: 20px 12px 80px; }
          .passage-card { padding: 22px 16px; border-radius: 14px; }
          .rd-meta { display: none; }
          .passage-title { font-size: 19px; }
        }
      `}</style>
    </div>
  );
}
