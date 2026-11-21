"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Clock, Highlighter, Eraser, Book, Loader2 } from "lucide-react";
import { selfPracticeById } from "@/action/student";
import Navbar from "@/components/Navbar/Navbar";
import { UserRoute } from "@/Providers/PrivateRoute";

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
      (h) => h.start <= start && h.end >= end
    );
    return { text: text.slice(start, end), highlighted };
  });
}

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
      className="passage-body font-serif text-[17px] leading-[2] text-slate-800 whitespace-pre-wrap cursor-text select-text"
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
    >
      {spans.map((s, i) =>
        s.highlighted ? (
          // ✅ NO padding, NO rounded corners, strict font inheritance
          <span
            key={i}
            className="bg-[#fef08a] text-inherit font-inherit"
            style={{ 
              padding: 0, 
              margin: 0, 
              borderRadius: 0,
              WebkitBoxDecorationBreak: 'clone',
              boxDecorationBreak: 'clone'
            }}
          >
            {s.text}
          </span>
        ) : (
          <span key={i}>{s.text}</span>
        )
      )}
    </div>
  );
}

// ─── Floating popup ───────────────────────────────────────────────────────────
function SelectionPopup({ selection, onHighlight, onClear, onDismiss }) {
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
      className="absolute z-[500] flex bg-slate-800 rounded-xl p-1.5 gap-1 shadow-2xl transition-opacity duration-150"
      style={{
        top: pos.top,
        left: pos.left,
        opacity: pos.ready ? 1 : 0,
        pointerEvents: pos.ready ? "auto" : "none",
      }}
    >
      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-800" />
      
      {/* ✅ Always show both buttons */}
      <button
        className="flex items-center gap-1.5 border-none rounded-lg px-3.5 py-2 text-[13px] font-bold bg-yellow-200 text-yellow-900 hover:brightness-95 transition-all cursor-pointer whitespace-nowrap"
        onClick={onHighlight}
        title="Highlight"
      >
        <Highlighter className="w-4 h-4" />
      </button>
      
      <button
        className="flex items-center gap-1.5 border-none rounded-lg px-3.5 py-2 text-[13px] font-bold bg-red-100 text-red-800 hover:brightness-95 transition-all cursor-pointer whitespace-nowrap"
        onClick={onClear}
        title="Remove Highlight"
      >
        <Eraser className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Vocabulary Section ───────────────────────────────────────────────────────
function VocabularySection({ vocabulary }) {
  if (!vocabulary || !vocabulary.trim()) return null;

  const entries = vocabulary
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="bg-white border border-green-200 rounded-2xl overflow-hidden shadow-sm mb-7">
      <div className="flex items-center gap-2 bg-green-50 border-b border-green-200 px-7 py-3.5 text-sm font-bold text-green-800">
        <Book className="w-4 h-4" />
        <span>Vocabulary</span>
        <span className="ml-auto bg-green-200 text-green-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
          {entries.length} words
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {entries.map((entry, i) => {
          const sepMatch = entry.match(/^(.+?)\s*[–\-:]\s*(.+)$/);
          const isLastRow = i >= entries.length - (entries.length % 2 === 0 ? 2 : 1);
          const isRightCol = i % 2 !== 0;

          return (
            <div
              key={i}
              className={`flex flex-col gap-1 px-7 py-4 border-b border-slate-100 
                ${!isRightCol ? "sm:border-r" : ""} 
                ${isLastRow ? "border-b-0" : ""}`}
            >
              {sepMatch ? (
                <>
                  <span className="font-serif text-[15px] font-bold text-slate-900">
                    {sepMatch[1].trim()}
                  </span>
                  <span className="text-[13px] leading-relaxed text-slate-600">
                    {sepMatch[2].trim()}
                  </span>
                </>
              ) : (
                <span className="text-sm text-slate-700">{entry}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────
export default function ReadingDetail() {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [highlights, setHighlights] = useState([]);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await selfPracticeById({ id, type: "reading" });
      if (data.success) {
        setData(data.data);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleSelect = useCallback((sel) => setSelection(sel), []);

  const handleHighlight = () => {
    if (!selection) return;
    
    const { start, end } = selection;

    setHighlights((prev) => {
      // 1. Check if this exact selection is already highlighted
      const isAlreadyHighlighted = prev.some(
        (h) => h.start <= start && h.end >= end
      );

      // 2. If it's already highlighted, do nothing (just close the popup)
      if (isAlreadyHighlighted) {
        return prev; 
      }

      // 3. Otherwise, remove any partial overlaps and add the new highlight
      const newH = { id: Date.now().toString(), start, end };
      const rest = prev.filter((h) => h.end <= start || h.start >= end);
      
      return [...rest, newH].sort((a, b) => a.start - b.start);
    });

    window.getSelection()?.removeAllRanges();
    setSelection(null);
  };

  // ✅ SMART CLEAR: Removes the selected part, but keeps the rest highlighted
  const handleClear = () => {
    if (!selection) return;
    const { start, end } = selection;

    setHighlights((prev) => {
      const result = [];
      prev.forEach((h) => {
        // If the highlight doesn't overlap with the selection, keep it
        if (h.end <= start || h.start >= end) {
          result.push(h);
          return;
        }
        // If it overlaps, split it into two parts (before and after the selection)
        if (h.start < start) {
          result.push({ ...h, id: h.id + "-a", end: start });
        }
        if (h.end > end) {
          result.push({ ...h, id: h.id + "-b", start: end });
        }
      });
      return result;
    });
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  };

  const dismiss = () => {
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-slate-400 text-[15px]">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p>Loading passage…</p>
        </div>
      </div>
    );
  }

  return (
    <UserRoute>
      <div className="min-h-screen bg-slate-50 font-sans">
        
        {/* ── TOPBAR ── */}
        <header className="sticky top-0 z-[200] flex items-center justify-between gap-4 bg-white border-b border-slate-200 px-7 py-3.5">
          <Link href="/self-practice" className="flex items-center gap-1 text-slate-500 text-sm font-medium hover:text-blue-700 transition-colors shrink-0 whitespace-nowrap">
            <ChevronLeft className="w-4 h-4" /> Back
          </Link>

          <div className="flex items-center gap-2.5 flex-1 justify-center min-w-0">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-full shrink-0">
              {data.level}
            </span>
            <span className="font-serif text-[15px] font-semibold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">
              {data.title}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {highlights.length > 0 && (
              <button
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-500 text-[13px] font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
                onClick={() => { setHighlights([]); setSelection(null); }}
              >
                <Eraser className="w-3.5 h-3.5" /> Clear all
                <span className="bg-slate-200 text-slate-600 text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                  {highlights.length}
                </span>
              </button>
            )}
          </div>
        </header>

        {/* ── MAIN ── */}
        <main className="w-full max-w-[80%] mx-auto pt-9 pb-24">
          
          {/* Chips row */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full">
              {data.category}
            </span>
            <span className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" /> {data.time} min
            </span>
            <span className="flex items-center gap-1 bg-yellow-50 text-yellow-800 border border-yellow-200 text-xs font-medium px-3 py-1 rounded-full">
              <Highlighter className="w-3 h-3" /> Select text to highlight
            </span>
            {data.vocabulary && (
              <span className="flex items-center gap-1 bg-green-50 text-green-800 border border-green-200 text-xs font-medium px-3 py-1 rounded-full">
                <Book className="w-3 h-3" /> Vocabulary included
              </span>
            )}
            {highlights.length > 0 && (
              <span className="bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-semibold px-3 py-1 rounded-full">
                🖊 {highlights.length} highlight{highlights.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Passage Card */}
          <article className="bg-white border border-slate-200 rounded-3xl px-14 py-12 shadow-sm mb-7">
            <h1 className="font-serif text-[27px] font-bold text-slate-900 leading-tight mb-4">
              {data.title}
            </h1>
            <div className="w-11 h-[3px] bg-blue-700 rounded-full mb-8" />
            <Passage text={data.passage} highlights={highlights} onSelect={handleSelect} />
          </article>

          {/* Vocabulary Section */}
          {data.vocabulary && <VocabularySection vocabulary={data.vocabulary} />}
        </main>

        {/* Popup */}
        {selection && (
          <SelectionPopup
            selection={selection}
            onHighlight={handleHighlight}
            onClear={handleClear}
            onDismiss={dismiss}
          />
        )}

        {/* Add Lora font globally */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
          .font-serif { font-family: 'Lora', serif !important; }
        `}</style>
      </div>
    </UserRoute>
  );
}