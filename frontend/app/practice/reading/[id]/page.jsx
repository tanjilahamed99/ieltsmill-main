"use client";
// app/practice/reading/[id]/page.jsx - Updated with text highlighting + bug fixes

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "../../../../features/Store";
import { useTestSession } from "../../../../hooks/Usetestsession";
import {
  QuestionNav,
  StartOverlay,
  SubmitModal,
  TestTopBar,
} from "../../../../components/Shared/Testsharedui";
import ResultModal from "../../../../components/Shared/Resultmodal";
import Image from "next/image";
import { UserRoute } from "../../../../Providers/PrivateRoute";
import { getTest } from "../../../../action/student";

// ─── Highlight colours ────────────────────────────────────────────────────────
const HIGHLIGHT_COLORS = [
  { id: "yellow", label: "Yellow", bg: "#FEF08A", border: "#EAB308", text: "#713F12" },
  { id: "green",  label: "Green",  bg: "#BBF7D0", border: "#16A34A", text: "#14532D" },
  { id: "blue",   label: "Blue",   bg: "#BFDBFE", border: "#2563EB", text: "#1E3A8A" },
  { id: "pink",   label: "Pink",   bg: "#FBCFE8", border: "#DB2777", text: "#831843" },
  { id: "orange", label: "Orange", bg: "#FED7AA", border: "#EA580C", text: "#7C2D12" },
];

// ─── Skeleton loader (fast perceived load) ────────────────────────────────────
function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-14 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-3">
        <div className="w-7 h-7 rounded-lg bg-gray-200 animate-pulse" />
        <div className="w-40 h-4 rounded bg-gray-200 animate-pulse" />
        <div className="ml-auto w-24 h-8 rounded-xl bg-gray-200 animate-pulse" />
      </div>
      <div className="h-10 bg-white border-b border-gray-100 flex items-end px-4 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-20 h-5 rounded bg-gray-100 animate-pulse mb-2" />
        ))}
      </div>
      <div className="flex flex-1" style={{ height: "calc(100vh - 96px)" }}>
        <div className="w-1/2 border-r border-gray-100 p-5 space-y-3">
          <div className="w-3/4 h-5 rounded bg-gray-100 animate-pulse" />
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`h-3 rounded bg-gray-100 animate-pulse ${i % 3 === 2 ? "w-4/5" : "w-full"}`} />
          ))}
        </div>
        <div className="w-1/2 p-5 space-y-4">
          <div className="w-full h-10 rounded-xl bg-gray-100 animate-pulse" />
          <div className="w-full h-16 rounded-xl bg-gray-100 animate-pulse" />
          <div className="w-full h-12 rounded-xl bg-gray-100 animate-pulse" />
          <div className="w-full h-12 rounded-xl bg-gray-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ─── Passage viewer with text highlighting ────────────────────────────────────
function PassagePanel({ passage, passageKey }) {
  const [highlights, setHighlights] = useState([]);
  const [activeColor, setActiveColor] = useState("yellow");
  const [eraseMode, setEraseMode]     = useState(false);
  const [tooltip, setTooltip]         = useState(null);
  const contentRef = useRef(null);

  // Load saved highlights from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`hl_${passageKey}`);
      if (saved) setHighlights(JSON.parse(saved));
    } catch {}
  }, [passageKey]);

  const persistHighlights = useCallback((list) => {
    try { localStorage.setItem(`hl_${passageKey}`, JSON.stringify(list)); } catch {}
  }, [passageKey]);

  // On text selection → add highlight
  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !contentRef.current) return;
    const range = sel.getRangeAt(0);
    if (!contentRef.current.contains(range.commonAncestorContainer)) return;
    const text = sel.toString().trim();
    if (!text || text.length < 2) { sel.removeAllRanges(); return; }
    if (eraseMode) { sel.removeAllRanges(); return; }

    const newHL = {
      id: `h${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
      text,
      color: activeColor,
    };
    const updated = [...highlights, newHL];
    setHighlights(updated);
    persistHighlights(updated);
    sel.removeAllRanges();
  }, [activeColor, eraseMode, highlights, persistHighlights]);

  const removeHighlight = useCallback((id) => {
    const updated = highlights.filter((h) => h.id !== id);
    setHighlights(updated);
    persistHighlights(updated);
    setTooltip(null);
  }, [highlights, persistHighlights]);

  const clearAll = useCallback(() => {
    setHighlights([]);
    persistHighlights([]);
    setTooltip(null);
  }, [persistHighlights]);

  // Build highlighted body
  const segments = useMemo(() => {
    const body = passage.bodyText || "";
    if (!highlights.length) return [{ type: "text", content: body }];
    let segs = [{ type: "text", content: body }];
    for (const h of highlights) {
      const col = HIGHLIGHT_COLORS.find((c) => c.id === h.color) || HIGHLIGHT_COLORS[0];
      const next = [];
      for (const seg of segs) {
        if (seg.type !== "text") { next.push(seg); continue; }
        const idx = seg.content.indexOf(h.text);
        if (idx === -1) { next.push(seg); continue; }
        if (idx > 0) next.push({ type: "text", content: seg.content.slice(0, idx) });
        next.push({ type: "mark", id: h.id, content: h.text, col });
        const rest = seg.content.slice(idx + h.text.length);
        if (rest) next.push({ type: "text", content: rest });
      }
      segs = next;
    }
    return segs;
  }, [passage.bodyText, highlights]);

  const activeCol = HIGHLIGHT_COLORS.find((c) => c.id === activeColor) || HIGHLIGHT_COLORS[0];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* ── Highlight toolbar ── */}
      <div className="bg-white border-b border-gray-100 px-4 py-2 flex items-center gap-2 flex-wrap shrink-0">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Highlight</span>
        {HIGHLIGHT_COLORS.map((c) => (
          <button
            key={c.id}
            title={c.label}
            onClick={() => { setActiveColor(c.id); setEraseMode(false); }}
            className="w-5 h-5 rounded-full border-2 transition-all hover:scale-110 shrink-0"
            style={{
              background: c.bg,
              borderColor: activeColor === c.id && !eraseMode ? c.border : "transparent",
              outline: activeColor === c.id && !eraseMode ? `2px solid ${c.border}` : "none",
              outlineOffset: "1px",
            }}
          />
        ))}
        <div className="w-px h-4 bg-gray-200 mx-0.5" />
        <button
          onClick={() => setEraseMode((v) => !v)}
          title="Click a highlight to erase it"
          className="px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border"
          style={
            eraseMode
              ? { background: "#FEE2E2", color: "#991B1B", borderColor: "#FCA5A5" }
              : { background: "#F9FAFB", color: "#6B7280", borderColor: "#E5E7EB" }
          }>
          🧹 {eraseMode ? "Erasing…" : "Erase"}
        </button>
        {highlights.length > 0 && (
          <button
            onClick={clearAll}
            className="text-[10px] text-gray-400 hover:text-red-500 font-medium underline transition-colors">
            Clear all
          </button>
        )}
        <span className="ml-auto text-[10px] text-gray-300 hidden sm:block">
          Select text to highlight •{" "}
          <span className="inline-block w-2.5 h-2.5 rounded-sm align-middle" style={{ background: activeCol.bg, border: `1px solid ${activeCol.border}` }} />
        </span>
      </div>

      {/* ── Passage body ── */}
      <div
        className="flex-1 overflow-y-auto px-5 py-5 relative"
        onClick={() => setTooltip(null)}>

        {/* Floating tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 bg-gray-900 text-white text-xs font-medium rounded-lg px-3 py-2 shadow-2xl flex items-center gap-2 pointer-events-auto"
            style={{ top: tooltip.y - 48, left: tooltip.x - 40 }}
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => removeHighlight(tooltip.id)}
              className="flex items-center gap-1 hover:text-red-300 transition-colors">
              🗑 Remove highlight
            </button>
          </div>
        )}

        <h2 className="text-lg font-black text-gray-900 mb-1">{passage.title}</h2>
        {passage.subtitle && (
          <p className="text-sm italic text-gray-400 mb-4">{passage.subtitle}</p>
        )}
        {passage.diagramUrl && (
          <Image
            src={passage.diagramUrl}
            alt="diagram"
            className="w-full max-h-52 object-contain rounded-xl border border-gray-100 mb-4"
            height={500}
            width={500}
            loading="lazy"
          />
        )}

        <div
          ref={contentRef}
          className="text-sm text-gray-700 leading-loose font-serif whitespace-pre-wrap cursor-text"
          onMouseUp={handleMouseUp}>
          {segments.map((seg, i) =>
            seg.type === "text" ? (
              <span key={i}>{seg.content}</span>
            ) : (
              <mark
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (eraseMode) { removeHighlight(seg.id); return; }
                  setTooltip({ x: e.clientX, y: e.clientY, id: seg.id });
                }}
                className="rounded-sm cursor-pointer"
                style={{
                  background: seg.col.bg,
                  borderBottom: `2px solid ${seg.col.border}`,
                  color: seg.col.text,
                  padding: "0 1px",
                }}>
                {seg.content}
              </mark>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Question components ──────────────────────────────────────────────────────
function FillQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  const f = q.formFields?.[0];
  const inputCls =
    reviewMode && qr
      ? qr.isCorrect
        ? "border-green-400 bg-green-50 text-green-700 font-semibold"
        : qr.isSkipped
          ? "border-gray-300 bg-gray-100 text-gray-400"
          : "border-red-400 bg-red-50 text-red-500 line-through"
      : "border-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-100";

  return (
    <div className="flex items-center gap-2 flex-wrap py-1.5">
      <span className="text-xs font-bold text-gray-400 w-6 shrink-0">{q.questionNumber}.</span>
      {(f?.label || q.stem) && (
        <span className="text-sm text-gray-700 shrink-0">{f?.label || q.stem}</span>
      )}
      {f?.prefix && <span className="text-sm text-gray-700">{f.prefix}</span>}
      {f?.prefixSymbol && <span className="text-sm font-medium text-gray-700">{f.prefixSymbol}</span>}
      <input
        type="text"
        value={answers[String(q.questionNumber)] || ""}
        onChange={(e) => !reviewMode && onAnswer(q.questionNumber, e.target.value)}
        readOnly={reviewMode}
        placeholder={`Answer ${q.questionNumber}`}
        className={`border rounded-lg px-2.5 py-1.5 text-sm outline-none min-w-32.5 transition-all ${inputCls}`}
      />
      {f?.suffix && <span className="text-sm text-gray-700">{f.suffix}</span>}
      {reviewMode && qr && !qr.isCorrect && (
        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
          ✓ {qr.correctAnswer}
        </span>
      )}
    </div>
  );
}

function MCQQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  const isMultiple = q.type === "mcq_multiple";
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold text-gray-800 mb-2 flex items-start gap-2">
        <span className="text-xs font-bold text-gray-400 shrink-0 mt-0.5 w-6">{q.questionNumber}.</span>
        <span className="flex-1">{q.stem}</span>
        {reviewMode && qr && !qr.isCorrect && (
          <span className="text-xs font-black text-red-500 shrink-0">✗ Ans: {qr.correctAnswer}</span>
        )}
      </p>
      {isMultiple && (
        <p className="text-xs text-gray-400 mb-2 pl-8">Choose {q.multipleAnswerCount || 2} letters</p>
      )}
      <div className="space-y-1.5 pl-8">
        {q.options?.map((opt) => {
          const sel = isMultiple
            ? (answers[String(q.questionNumber)] || "").split(",").includes(opt.label)
            : answers[String(q.questionNumber)] === opt.label;
          const correct = reviewMode && (qr?.correctAnswer || "").includes(opt.label);
          const wrong = reviewMode && sel && !qr?.isCorrect;
          return (
            <label
              key={opt.label}
              className="flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all select-none"
              style={
                correct
                  ? { borderColor: "#10B981", background: "#F0FDF4" }
                  : wrong
                    ? { borderColor: "#EF4444", background: "#FEF2F2" }
                    : sel
                      ? { borderColor: "#EF4444", background: "#FFF8F8" }
                      : { borderColor: "#F3F4F6", background: "white" }
              }>
              <input
                type={isMultiple ? "checkbox" : "radio"}
                name={`q_${q.questionNumber}`}
                value={opt.label}
                checked={sel}
                onChange={() => {
                  if (reviewMode) return;
                  if (isMultiple) {
                    const cur = (answers[String(q.questionNumber)] || "").split(",").filter(Boolean);
                    const upd = cur.includes(opt.label)
                      ? cur.filter((v) => v !== opt.label)
                      : [...cur, opt.label];
                    onAnswer(q.questionNumber, upd.join(","));
                  } else {
                    onAnswer(q.questionNumber, opt.label);
                  }
                }}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 border-2 shrink-0 flex items-center justify-center text-xs font-bold ${isMultiple ? "rounded-md" : "rounded-full"}`}
                style={
                  correct
                    ? { borderColor: "#10B981", background: "#10B981", color: "white" }
                    : wrong
                      ? { borderColor: "#EF4444", background: "#EF4444", color: "white" }
                      : sel
                        ? { borderColor: "#EF4444", background: "#EF4444", color: "white" }
                        : { borderColor: "#D1D5DB", color: "#9CA3AF" }
                }>
                {opt.label}
              </div>
              <span className="text-sm text-gray-700">{opt.text}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function TFNGQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  const OPTIONS = ["True", "False", "Not Given"];
  const selected = answers[String(q.questionNumber)] || "";
  return (
    <div
      className={`border rounded-xl p-3 mb-3 transition-all ${
        reviewMode && qr
          ? qr.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          : "border-gray-100 hover:border-gray-200"
      }`}>
      <div className="flex items-start gap-2 mb-2.5">
        <span className="text-xs font-bold text-gray-400 shrink-0 mt-0.5 w-6">{q.questionNumber}.</span>
        <p className="text-sm text-gray-700 flex-1">{q.statementText || q.stem}</p>
        {reviewMode && qr && !qr.isCorrect && (
          <span className="text-xs font-black text-red-500 shrink-0">✗ Ans: {qr.correctAnswer}</span>
        )}
      </div>
      <div className="flex gap-2 pl-8 flex-wrap">
        {OPTIONS.map((opt) => {
          const sel = selected === opt;
          const correct = reviewMode && qr?.correctAnswer === opt;
          const wrong = reviewMode && sel && !qr?.isCorrect;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => !reviewMode && onAnswer(q.questionNumber, opt)}
              className="px-4 py-1.5 rounded-xl text-xs font-bold border transition-all"
              style={
                correct
                  ? { background: "#D1FAE5", color: "#065F46", borderColor: "#6EE7B7" }
                  : wrong
                    ? { background: "#FEE2E2", color: "#991B1B", borderColor: "#FCA5A5" }
                    : sel
                      ? { background: "linear-gradient(135deg,#EF4444,#F97316)", color: "white", borderColor: "transparent" }
                      : { borderColor: "#E5E7EB", color: "#6B7280", background: "white" }
              }>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MatchingQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  const opts = q.matchOptions || [];
  return (
    <div className="mb-3">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-xs font-bold text-gray-400 shrink-0 mt-0.5 w-6">{q.questionNumber}.</span>
        <p className="text-sm text-gray-700 flex-1">{q.stem || q.matchItems?.[0]?.text}</p>
      </div>
      <div className="pl-8 flex items-center gap-2 flex-wrap">
        <select
          value={answers[String(q.questionNumber)] || ""}
          onChange={(e) => !reviewMode && onAnswer(q.questionNumber, e.target.value)}
          disabled={reviewMode}
          className={`border rounded-xl px-3 py-2 text-sm outline-none transition-all ${
            reviewMode && qr
              ? qr.isCorrect ? "border-green-400 bg-green-50 text-green-700" : "border-red-400 bg-red-50 text-red-600"
              : "border-gray-300 focus:border-red-400"
          }`}>
          <option value="">— Select —</option>
          {opts.map((o) => (
            <option key={o.label} value={o.label}>{o.label}. {o.text}</option>
          ))}
        </select>
        {reviewMode && qr && !qr.isCorrect && (
          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            ✓ {qr.correctAnswer}
          </span>
        )}
      </div>
    </div>
  );
}

function MapQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  const inputCls =
    reviewMode && qr
      ? qr.isCorrect
        ? "border-green-400 bg-green-50 text-green-700"
        : "border-red-400 bg-red-50 text-red-500 line-through"
      : "border-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-100";
  return (
    <div className="flex items-center gap-2 flex-wrap py-1.5">
      <span className="text-xs font-bold text-gray-400 w-6 shrink-0">{q.questionNumber}.</span>
      <span className="text-sm text-gray-700">{q.stem || `Label ${q.questionNumber}`}</span>
      <input
        type="text"
        value={answers[String(q.questionNumber)] || ""}
        onChange={(e) => !reviewMode && onAnswer(q.questionNumber, e.target.value)}
        readOnly={reviewMode}
        placeholder="Write label…"
        className={`border rounded-lg px-2.5 py-1.5 text-sm outline-none min-w-30 transition-all ${inputCls}`}
      />
      {reviewMode && qr && !qr.isCorrect && (
        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
          ✓ {qr.correctAnswer}
        </span>
      )}
    </div>
  );
}

function Question({ q, answers, onAnswer, reviewMode, qResults }) {
  const qr = reviewMode ? (qResults.find((r) => r.questionNumber === q.questionNumber) ?? null) : null;
  switch (q.type) {
    case "form_completion":
    case "note_completion":
    case "sentence_completion":
    case "short_answer":
      return <FillQuestion q={q} answers={answers} onAnswer={onAnswer} reviewMode={reviewMode} qr={qr} />;
    case "mcq_single":
    case "mcq_multiple":
      return <MCQQuestion q={q} answers={answers} onAnswer={onAnswer} reviewMode={reviewMode} qr={qr} />;
    case "true_false_ng":
      return <TFNGQuestion q={q} answers={answers} onAnswer={onAnswer} reviewMode={reviewMode} qr={qr} />;
    case "matching":
      return <MatchingQuestion q={q} answers={answers} onAnswer={onAnswer} reviewMode={reviewMode} qr={qr} />;
    case "map_labelling":
      return <MapQuestion q={q} answers={answers} onAnswer={onAnswer} reviewMode={reviewMode} qr={qr} />;
    default:
      return <FillQuestion q={q} answers={answers} onAnswer={onAnswer} reviewMode={reviewMode} qr={qr} />;
  }
}

const FILL_TYPES = ["form_completion", "note_completion", "sentence_completion", "short_answer", "map_labelling"];

function QuestionGroup({ group, answers, onAnswer, reviewMode, qResults }) {
  const qb = group.questionBlock || {};
  const qs = group.questions || [];
  if (!qs.length) return null;

  const subGroups = [];
  for (const q of qs) {
    const last = subGroups[subGroups.length - 1];
    if (last && last.type === q.type) last.questions.push(q);
    else subGroups.push({ type: q.type, questions: [q] });
  }

  return (
    <div className="mb-8">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4">
        <p className="text-xs font-bold text-gray-700">{qb.heading}</p>
        {qb.instruction && (
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
            {qb.boldInstruction ? (
              <>{qb.instruction.replace(qb.boldInstruction, "")}<strong>{qb.boldInstruction}</strong></>
            ) : qb.instruction}
          </p>
        )}
        {qb.tableTitle && <p className="text-xs font-black text-gray-800 mt-1">{qb.tableTitle}</p>}
      </div>
      {subGroups.map((sg, sgi) => (
        <div key={sgi}>
          {sgi > 0 && (
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-4">
              {{ form_completion:"Form Completion", note_completion:"Note Completion", sentence_completion:"Sentence Completion", short_answer:"Short Answer", mcq_single:"Multiple Choice", mcq_multiple:"Multiple Choice (Multiple)", true_false_ng:"True / False / Not Given", matching:"Matching", map_labelling:"Map Labelling" }[sg.type] || sg.type}
            </p>
          )}
          <div className={FILL_TYPES.includes(sg.type) ? "space-y-1 mb-4" : "mb-4"}>
            {sg.questions.map((q) => (
              <Question key={q.questionNumber} q={q} answers={answers} onAnswer={onAnswer} reviewMode={reviewMode} qResults={qResults} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════
export default function ReadingPracticePage() {
  const params    = useParams();
  const router    = useRouter();
  const testId    = params.id;
  const user      = useAppSelector((state) => state.auth.user);

  const [testData,    setTestData]    = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loadError,   setLoadError]   = useState(null);
  const [activePass,  setActivePass]  = useState(0);
  const [showSubmit,  setShowSubmit]  = useState(false);
  const [reviewMode,  setReviewMode]  = useState(false);

  const session = useTestSession({
    testId,
    testType:    "reading",
    testTitle:   testData?.title  || "",
    seriesId:    testData?.seriesId || "",
    testNumber:  testData?.testNumber || 0,
    userId:      user?._id,
    totalSeconds: 60 * 60,
  });

  // ── Fetch — single call, cancellable ──────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setPageLoading(true);
      setLoadError(null);
      try {
        const { data } = await getTest("reading", testId);
        if (cancelled) return;
        if (data.success) setTestData(data.data);
        else setLoadError("Could not load test. Please try again.");
      } catch {
        if (!cancelled) setLoadError("Network error — check your connection and refresh.");
      } finally {
        if (!cancelled) setPageLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [testId]);

  // ── Memoised derivations ──────────────────────────────────────────────────
  const passages = useMemo(() => testData?.passages || [], [testData]);
  const passage  = passages[activePass];

  const totalQ = useMemo(
    () => passages.reduce((s, p) => s + (p.questionGroups?.reduce((s2, g) => s2 + (g.questions?.length || 0), 0) || 0), 0),
    [passages]
  );
  const navParts = useMemo(
    () => passages.map((p) => ({ label: `Passage ${p.passageNumber}`, from: p.questionRange?.from, to: p.questionRange?.to })),
    [passages]
  );

  const r        = session.result;
  const qResults = r?.questionResults || [];

  // ── Guards ────────────────────────────────────────────────────────────────
  if (pageLoading) return <SkeletonLoader />;

  if (loadError)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-4xl">⚠️</div>
        <p className="text-gray-700 font-semibold text-sm">{loadError}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 rounded-xl text-white text-sm font-bold"
          style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}>
          Retry
        </button>
      </div>
    );

  if (!testData)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Test not found
      </div>
    );

  return (
    <UserRoute>
      <div
        className="min-h-screen bg-white flex flex-col"
        style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',ui-sans-serif,sans-serif" }}>

        {/* Start overlay */}
        {!session.started && !session.submitted && (
          <StartOverlay
            testTitle={testData.title}
            testType="reading"
            totalQuestions={totalQ}
            duration="60 min"
            onStart={session.startSession}
            loading={session.loading}
          />
        )}

        {/* Submit modal */}
        {showSubmit && (
          <SubmitModal
            answeredCount={session.answeredCount}
            totalCount={totalQ}
            onConfirm={() => { setShowSubmit(false); session.handleSubmit(); }}
            onCancel={() => setShowSubmit(false)}
            loading={session.loading}
          />
        )}

        {/* Result modal */}
        {session.showResult && r && (
          <ResultModal
            testTitle={testData.title}
            testType="reading"
            score={r.readingScore || 0}
            totalQuestions={r.totalQuestions || totalQ}
            band={r.readingBand}
            sectionScores={r.readingSectionScores || []}
            questionResults={qResults}
            timeSpent={r.timeSpent || 0}
            onClose={() => router.push("/mock-test?type=reading")}
            onReview={() => { session.setShowResult(false); setReviewMode(true); }}
          />
        )}

        {/* Top bar */}
        <TestTopBar
          title={testData.title}
          timeFormatted={session.submitted ? "Done ✓" : session.timeFormatted}
          isLowTime={session.isLowTime}
          onSubmit={() => session.submitted ? session.setShowResult(true) : setShowSubmit(true)}
          currentSection={activePass}
          totalSections={passages.length - 1}
          onNext={!session.submitted && activePass < passages.length - 1 ? () => setActivePass(activePass + 1) : undefined}
        />

        {/* Passage tabs */}
        <div className="bg-white border-b border-gray-200 flex px-4 overflow-x-auto shrink-0">
          {passages.map((p, i) => (
            <button
              key={i}
              onClick={() => setActivePass(i)}
              className="px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap shrink-0"
              style={i === activePass
                ? { borderBottomColor: "#EF4444", color: "#EF4444" }
                : { borderBottomColor: "transparent", color: "#9CA3AF" }}>
              Passage {p.passageNumber}
            </button>
          ))}
        </div>

        {/* Review banner */}
        {reviewMode && (
          <div className="bg-blue-50 border-b border-blue-100 px-4 sm:px-8 py-2 flex items-center justify-between shrink-0">
            <p className="text-xs font-bold text-blue-700">📋 Review Mode — answers highlighted</p>
            <button onClick={() => session.setShowResult(true)} className="text-xs text-blue-600 underline font-bold">
              View Score
            </button>
          </div>
        )}

        {/* Error banner */}
        {session.error && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-xs text-red-600 font-semibold shrink-0">
            ⚠ {session.error}
          </div>
        )}

        {/* Split view */}
        {passage && (
          <div className="md:flex flex-1 min-h-0" style={{ height: "calc(100vh - 112px)" }}>
            {/* Left: passage + highlighter */}
            <div className="md:w-1/2 border-r border-gray-200 flex flex-col overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-5 py-2 shrink-0">
                <span className="text-xs font-bold text-gray-400 uppercase">
                  Passage {passage.passageNumber}
                </span>
              </div>
              <PassagePanel
                passage={passage}
                passageKey={`${testId}_p${activePass}`}
              />
            </div>

            {/* Right: questions */}
            <div className="md:w-1/2 overflow-y-auto px-5 py-5">
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mb-5">
                <span className="text-xs font-bold text-gray-500">
                  Questions {passage.questionRange?.from} – {passage.questionRange?.to}
                </span>
              </div>
              {passage.questionGroups?.map((group, gi) => (
                <QuestionGroup
                  key={gi}
                  group={group}
                  answers={session.answers}
                  onAnswer={session.setAnswer}
                  reviewMode={reviewMode}
                  qResults={qResults}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom question nav */}
        {session.started && (
          <QuestionNav
            parts={navParts}
            answers={session.answers}
            activePart={activePass}
            onPartClick={setActivePass}
            onQuestionClick={() => {}}
          />
        )}
      </div>
    </UserRoute>
  );
}
