"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTestStore } from "@/features/Useteststore";
import IntroModal from "@/components/Test/IntroModal";
import {
  PassageContent,
  QuestionBlock,
  ResultModal,
  SelectionPopup,
  useDivider,
} from "@/components/Test/Reading/ReadingAllComponents";
import { BottomNav } from "@/components/Test/BottomNav";
import {
  NoteModal,
  NotesPanel,
  useHighlightsAndNotes,
} from "@/components/Test/Listening/AllCompo";
import { useExitGuard } from "@/hooks/Useexitguard";

const TOTAL_SEC = 40 * 60;
const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function ReadingMainPage({testId, ReadingPassage}) {
  const [phase, setPhase] = useState("intro");
  const [activePassage, setActivePassage] = useState(0);
  const [vals, setVals] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SEC);
  const [showResult, setShowResult] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [mobileTab, setMobileTab] = useState("passage");

  const submitted = phase === "done";
  const { split, setSplit, containerRef, onMouseDown } = useDivider(50);
  const router = useRouter();
  const { saveAllAnswers, submitSection } = useTestStore();
  const scrollRef = useRef(null);
  const guardActive = phase === "test";


  // ── Highlights + Notes ──
  const {
    highlights,
    notes,
    selection,
    isHighlighted,
    showNoteModal,
    showNotesPanel,
    pendingNoteSelection,
    setShowNoteModal,
    setShowNotesPanel,
    handleSelect,
    handleHighlight,
    handleClear,
    handleNoteOpen,
    handleNoteSave,
    handleNoteDelete,
    dismiss,
  } = useHighlightsAndNotes();

  const handleForcedExit = useCallback(async () => {
    const formattedAnswers = {};
    Object.entries(vals).forEach(([qNum, answer]) => {
      formattedAnswers[`question_${qNum}`] = answer;
    });
    saveAllAnswers("reading", formattedAnswers);
    submitSection("reading");
    setPhase("done");
    setShowResult(true);
    setTimeout(() => {
      router.push(`/full-test/${testId}`);
    }, 2000);
  }, [vals, saveAllAnswers, submitSection, testId, router]);

  const { guardedPush } = useExitGuard({
    active: guardActive,
    onConfirmExit: handleForcedExit,
    message:
      "Your Reading test is in progress. Leaving now will auto-submit your current answers.",
  });

  // ── Timer ──
  useEffect(() => {
    if (phase !== "test") return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, timeLeft]);

  const onChange = useCallback(
    (n, v) => setVals((p) => ({ ...p, [n]: v })),
    [],
  );

  const handleSubmit = useCallback(() => {
    const formattedAnswers = {};
    Object.entries(vals).forEach(([qNum, answer]) => {
      formattedAnswers[`question_${qNum}`] = answer;
    });
    saveAllAnswers("reading", formattedAnswers);
    submitSection("reading");
    setPhase("done");
    setShowResult(true);
    setTimeout(() => {
      router.push(`/full-test/${testId}/writing`);
    }, 2000);
  }, [vals, saveAllAnswers, submitSection, router, testId]);

  const handleRestart = useCallback(() => {
    setVals({});
    setTimeLeft(TOTAL_SEC);
    setActivePassage(0);
    setShowResult(false);
    setPhase("intro");
  }, []);

  // ── Scroll to question ──
  const scrollToQuestion = useCallback(
    (qNum) => {
      const READING_PARTS = [
        { s: 1, e: 13 },
        { s: 14, e: 26 },
        { s: 27, e: 40 },
      ];
      const partIdx = READING_PARTS.findIndex(
        (p) => qNum >= p.s && qNum <= p.e,
      );
      if (partIdx === -1) return;

      const scrollToEl = () => {
        requestAnimationFrame(() => {
          const el = document.getElementById(`q-${qNum}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.style.transition = "outline 0s";
            el.style.outline = "2px solid #9ca3af";
            el.style.outlineOffset = "4px";
            el.style.borderRadius = "8px";
            setTimeout(() => {
              el.style.outline = "";
              el.style.outlineOffset = "";
              el.style.borderRadius = "";
            }, 2000);
          }
        });
      };

      if (partIdx !== activePassage) {
        setActivePassage(partIdx);
        setTimeout(scrollToEl, 100);
      } else {
        scrollToEl();
      }
    },
    [activePassage],
  );

  const passage = ReadingPassage[activePassage];
  const urgent = timeLeft < 300;
  const totalAnswered = Object.values(vals).filter(Boolean).length;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white font-sans text-gray-900">
      {/* ── INTRO ── */}
      {phase === "intro" && (
        <IntroModal
          onStart={() => setPhase("test")}
          num={testId}
          type={"reading"}
        />
      )}

      {/* ── RESULT ── */}
      {showResult && (
        <ResultModal
          vals={vals}
          onClose={() => setShowResult(false)}
          onRestart={handleRestart}
        />
      )}

      {phase !== "intro" && (
        <>
          {/* ── TOP BAR ── */}
          <div className="flex items-center bg-red-50 border-b border-red-200 px-3 h-9 flex-shrink-0">
            <span className="w-6 h-6 bg-red-700 text-white text-[13px] font-bold rounded flex items-center justify-center flex-shrink-0">
              E
            </span>
            <div className="flex-1 text-center text-[12px] sm:text-[13px] text-gray-700 truncate px-2">
              Full-Test Reading Test {testId} (Online Test)
            </div>
          </div>

          {/* ── SUB BAR ── */}
          <div className="flex items-center bg-white border-b border-gray-200 px-2 sm:px-3 h-[33px] flex-shrink-0 gap-1.5">
            {/* Focus mode (desktop only) */}
            <button
              className="hidden sm:flex items-center gap-1.5 border border-gray-300 rounded px-2.5 py-0.5 text-[12px] text-gray-600 hover:bg-gray-50 flex-shrink-0"
              onClick={() => setFocusMode((f) => !f)}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
              Focus
            </button>

            {/* Mobile passage/questions tab toggle */}
            <div className="flex sm:hidden items-center border border-gray-200 rounded overflow-hidden text-[11px] font-semibold flex-shrink-0">
              <button
                onClick={() => setMobileTab("passage")}
                className={`px-2.5 py-0.5 leading-5 transition-colors ${
                  mobileTab === "passage"
                    ? "bg-blue-900 text-white"
                    : "text-gray-600 bg-white"
                }`}>
                Passage
              </button>
              <button
                onClick={() => setMobileTab("questions")}
                className={`px-2.5 py-0.5 leading-5 transition-colors ${
                  mobileTab === "questions"
                    ? "bg-blue-900 text-white"
                    : "text-gray-600 bg-white"
                }`}>
                Questions
              </button>
            </div>

            {/* Timer — centred */}
            <div className="flex-1 flex items-center justify-center gap-1.5 text-[12px] sm:text-[13px] font-semibold text-gray-800">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span
                className={`font-mono font-bold ${urgent ? "text-red-600 animate-pulse" : ""}`}>
                {fmt(timeLeft)}
              </span>
            </div>

            {/* Notes button */}
            <button
              onClick={() => setShowNotesPanel(true)}
              className="flex items-center gap-1.5 border border-gray-300 rounded px-2 py-0.5 text-[12px] text-gray-600 hover:bg-gray-50 flex-shrink-0 relative transition-colors">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span className="hidden sm:inline">Notes</span>
              {notes.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {notes.length}
                </span>
              )}
            </button>

            {/* Answered counter */}
            <span className="text-[12px] text-gray-400 tabular-nums flex-shrink-0">
              {totalAnswered}/40
            </span>
          </div>

          {/* ── PASSAGE HEADER ── */}
          {!focusMode && (
            <div className="flex items-baseline gap-2 bg-white border-b border-gray-200 px-3 sm:px-3.5 py-1.5 flex-shrink-0 overflow-hidden">
              <span className="text-[13px] font-bold text-gray-900 flex-shrink-0">
                {passage.label}
              </span>
              <span className="text-[11px] sm:text-[12px] text-gray-500 truncate">
                {passage.title} — {passage.subtitle}
              </span>
            </div>
          )}

          {/* ── PROGRESS ── */}
          <div className="h-0.75 bg-gray-200 shrink-0">
            <div
              className="h-full bg-blue-900 transition-all duration-500"
              style={{ width: `${(totalAnswered / 40) * 100}%` }}
            />
          </div>

          {/* ── MAIN BODY ── */}
          <div className="flex flex-1 overflow-hidden" ref={containerRef}>
            {/* PASSAGE PANEL */}
            <div
              className={`overflow-y-auto bg-white shrink-0
    ${mobileTab === "passage" ? "flex" : "hidden"}
    sm:flex`}
              style={{ width: `${split}%` }}>
              <PassageContent
                passage={passage}
                highlights={highlights}
                handleSelect={handleSelect}
                vals={vals}
                onChange={onChange}
                submitted={submitted}
              />
            </div>

            {/* DIVIDER */}
            <div
              className="hidden sm:flex w-2 shrink-0 bg-gray-200 border-x border-gray-300 cursor-col-resize items-center justify-center hover:bg-gray-300 relative"
              onMouseDown={onMouseDown}
              onTouchStart={onMouseDown}>
              <button
                className="absolute flex flex-row items-center justify-center w-5 h-7 border border-gray-400 rounded bg-white shadow text-black hover:bg-gray-50 hover:text-black p-0 gap-0 cursor-col-resize"
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5">
                  <polyline points="15,18 9,12 15,6" />
                </svg>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </button>
            </div>

            {/* QUESTIONS PANEL */}
            <div
              className={`overflow-y-auto bg-gray-50 shrink-0
    ${mobileTab === "questions" ? "flex" : "hidden"}
    sm:flex`}
              style={{ width: `${100 - split}%` }}>
              <div className="w-full p-3 sm:p-4 pb-20 max-w-2xl">
                {passage.questions.map((block, i) => (
                  <QuestionBlock
                    key={i}
                    block={block}
                    passage={passage}
                    vals={vals}
                    onChange={onChange}
                    submitted={submitted}
                    highlights={highlights}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM NAV ── */}
          <BottomNav
            active={activePassage}
            setActive={(i) => {
              setActivePassage(i);
              scrollRef.current?.scrollTo({ top: 0 });
            }}
            vals={vals}
            onSubmit={handleSubmit}
            scrollToQuestion={scrollToQuestion}
            PARTS={[
              { label: "Part 1", qRange: "1–13", s: 1, e: 13 },
              { label: "Part 2", qRange: "14–26", s: 14, e: 26 },
              { label: "Part 3", qRange: "27–40", s: 27, e: 40 },
            ]}
          />

          {/* ── SELECTION POPUP ── */}
          {selection && !showNoteModal && (
            <SelectionPopup
              selection={selection}
              isHighlighted={isHighlighted}
              onHighlight={handleHighlight}
              onClear={handleClear}
              onNote={handleNoteOpen}
              onDismiss={dismiss}
            />
          )}

          {/* ── NOTE MODAL ── */}
          {showNoteModal && (
            <NoteModal
              selection={pendingNoteSelection}
              existingNote=""
              onSave={handleNoteSave}
              onClose={() => setShowNoteModal(false)}
            />
          )}

          {/* ── NOTES PANEL ── */}
          {showNotesPanel && (
            <NotesPanel
              notes={notes}
              onDelete={handleNoteDelete}
              onClose={() => setShowNotesPanel(false)}
            />
          )}
        </>
      )}

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
    </div>
  );
}
