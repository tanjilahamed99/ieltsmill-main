"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Headphones,
  BookOpen,
  PenLine,
  Clock,
  CheckCircle,
  ChevronRight,
  Play,
  Lock,
  Info,
  Award,
  AlertTriangle,
  X,
  LogOut,
  RotateCcw,
} from "lucide-react";
import {
  SECTION_ORDER,
  useTestStore,
  makeInitialSections,
} from "@/features/Useteststore";

function normalise(s) {
  return (s || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function calculateScore(answers, answerKey) {
  let correct = 0;
  let total = 0;

  Object.entries(answerKey).forEach(([qNum, correctAnswer]) => {
    total++;
    const userAnswer = answers[`question_${qNum}`];

    if (!userAnswer) return;

    if (Array.isArray(correctAnswer)) {
      // multipleAnswer group: user's single letter just needs to be
      // somewhere in the correct-answers array
      const normalisedCorrects = correctAnswer.map(normalise);
      if (normalisedCorrects.includes(normalise(userAnswer))) {
        correct++;
      }
    } else {
      // gaps / mcq / matchAnswer — plain string comparison
      if (normalise(userAnswer) === normalise(correctAnswer)) {
        correct++;
      }
    }
  });

  return {
    score: correct,
    total,
    percentage: Math.round((correct / total) * 100),
  };
}
function getAnsweredCount(answers) {
  return Object.values(answers).filter(
    (a) => a !== null && a !== "" && a !== undefined,
  ).length;
}

// ─── Status badge config ──────────────────────────────────────

function statusStyle(s) {
  const map = {
    "not-started": {
      label: "Not Started",
      color: "#9ca3af",
      bg: "rgba(156,163,175,0.08)",
      border: "rgba(156,163,175,0.2)",
    },
    "in-progress": {
      label: "In Progress",
      color: "#f5a623",
      bg: "rgba(245,166,35,0.1)",
      border: "rgba(245,166,35,0.3)",
    },
    completed: {
      label: "Completed",
      color: "#22c98a",
      bg: "rgba(34,201,138,0.1)",
      border: "rgba(34,201,138,0.3)",
    },
    "time-up": {
      label: "Time Up",
      color: "#f56565",
      bg: "rgba(245,101,101,0.1)",
      border: "rgba(245,101,101,0.3)",
    },
    locked: {
      label: "Locked",
      color: "#9ca3af",
      bg: "rgba(156,163,175,0.08)",
      border: "rgba(156,163,175,0.2)",
    },
  };
  return map[s] ?? map["locked"];
}

// ─── Exit Modal ───────────────────────────────────────────────

export function ExitModal({ open, onConfirm, onCancel, hasProgress }) {
  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: "rgba(8,16,30,0.75)",
          backdropFilter: "blur(8px)",
        }}
        onClick={onCancel}>
        <div
          className="relative w-full max-w-md rounded-3xl overflow-hidden"
          style={{
            background: "white",
            boxShadow: "0 32px 80px rgba(8,16,30,0.25)",
            animation: "modalPop 0.3s cubic-bezier(0.22,1,0.36,1) forwards",
          }}
          onClick={(e) => e.stopPropagation()}>
          {/* Gold top strip */}
          <div
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg,#c8963e,#e8b96a,#c8963e)",
              backgroundSize: "200% auto",
              animation: "shimmer 4s linear infinite",
            }}
          />
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(8,16,30,0.06)",
              border: "1px solid rgba(8,16,30,0.08)",
              cursor: "pointer",
            }}>
            <X size={14} style={{ color: "#9ca3af" }} />
          </button>

          <div className="px-8 pt-8 pb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{
                background: "rgba(245,101,101,0.1)",
                border: "1.5px solid rgba(245,101,101,0.25)",
              }}>
              <AlertTriangle size={24} style={{ color: "#f56565" }} />
            </div>

            <h2
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: "#08101e",
              }}>
              Exit Test?
            </h2>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "#5a6272" }}>
              {hasProgress
                ? "You are in the middle of a test. Leaving will not delete your progress — you can resume later."
                : "Are you sure you want to exit the test?"}
            </p>

            {hasProgress && (
              <div
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl mb-5"
                style={{
                  background: "rgba(200,150,62,0.07)",
                  border: "1px solid rgba(200,150,62,0.2)",
                }}>
                <Info
                  size={13}
                  style={{ color: "#c8963e", flexShrink: 0, marginTop: 1 }}
                />
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#c8963e" }}>
                  Your answers are <strong>auto-saved</strong>. You can return
                  to this test and continue from where you left off.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={onCancel}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold"
                style={{
                  background: "rgba(8,16,30,0.05)",
                  color: "#08101e",
                  border: "1.5px solid rgba(8,16,30,0.1)",
                  cursor: "pointer",
                }}>
                Continue Test
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg,#f56565,#fc8181)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(245,101,101,0.35)",
                }}>
                <LogOut size={14} /> Yes, Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
        @keyframes shimmer {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  );
}

// ─── Countdown Badge ──────────────────────────────────────────

function CountdownBadge({ secondsLeft, totalSeconds }) {
  const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const s = String(secondsLeft % 60).padStart(2, "0");
  const urgent = secondsLeft < 300;
  const pct = totalSeconds > 0 ? (secondsLeft / totalSeconds) * 100 : 0;

  return (
    <div className="flex flex-col items-end gap-1">
      <span
        className="text-xl font-bold tabular-nums"
        style={{ color: urgent ? "#f56565" : "#c8963e" }}>
        {m}:{s}
      </span>
      <div
        className="w-24 h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(8,16,30,0.08)" }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: urgent
              ? "linear-gradient(90deg,#f56565,#fc8181)"
              : "linear-gradient(90deg,#c8963e,#e8b96a)",
            transition: "width 1s linear",
          }}
        />
      </div>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────

export function SectionCard({ meta, testId, readingAnswer, listeningAnswer }) {
  const router = useRouter();
  const { sessions, activeTestId, startSection } = useTestStore();

  // Read directly from sessions map — always fresh
  const session = sessions[activeTestId] ?? null;
  const sectionState = session?.sections[meta.id] ?? {
    status: "locked",
    answers: {},
    secondsLeft: meta.durationMin * 60,
  };

  const status = sectionState.status;
  const st = statusStyle(status);
  const answers = sectionState.answers;
  const answeredCount = getAnsweredCount(answers);

  const locked = status === "locked";
  const completed = status === "completed" || status === "time-up";
  const inProgress = status === "in-progress";
  const notStarted = status === "not-started";

  const [expanded, setExpanded] = useState(notStarted || inProgress);
  const Icon = meta.icon;

  // Score calculation for completed sections
  let scoreDisplay = null;
  if (completed && meta.id === "listening") {
    const { score, total } = calculateScore(answers, listeningAnswer);
    scoreDisplay = { correct: score, total, answered: answeredCount };
  } else if (completed && meta.id === "reading") {
    const { score, total } = calculateScore(answers, readingAnswer);
    scoreDisplay = { correct: score, total, answered: answeredCount };
  } else if (completed && meta.id === "writing") {
    scoreDisplay = { pending: true, answered: answeredCount };
  }

  // Auto-expand when this section becomes active
  useEffect(() => {
    if (notStarted || inProgress) setExpanded(true);
  }, [status, notStarted, inProgress]);

  function handleStart() {
    startSection(meta.id);
    toast.success(`${meta.name} section started!`, {
      description: "Your timer is now running. Good luck!",
      duration: 2500,
    });
    router.push(`/full-test/${testId}/${meta.id}`);
  }

  function handleContinue() {
    router.push(`/full-test/${testId}/${meta.id}`);
  }

  function handleRetake() {
    startSection(meta.id);
    router.push(`/full-test/${testId}/${meta.id}`);
  }

  return (
    <div
      className="rounded-3xl border overflow-hidden transition-all duration-300"
      style={{
        background: "white",
        borderColor: inProgress
          ? meta.accentBorder
          : completed
            ? "rgba(34,201,138,0.25)"
            : "rgba(8,16,30,0.08)",
        boxShadow: inProgress
          ? `0 8px 32px rgba(8,16,30,0.08), 0 0 0 1px ${meta.accentBorder}`
          : "0 2px 8px rgba(8,16,30,0.04)",
        opacity: locked ? 0.5 : 1,
      }}>
      {/* ── Card header ── */}
      <button
        onClick={() => !locked && setExpanded((e) => !e)}
        disabled={locked}
        className="w-full flex items-center gap-4 px-6 py-5 text-left"
        style={{
          background: inProgress
            ? meta.accentBg
            : completed
              ? "rgba(34,201,138,0.04)"
              : "transparent",
          cursor: locked ? "default" : "pointer",
          border: "none",
        }}>
        {/* Section icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: completed
              ? "rgba(34,201,138,0.12)"
              : inProgress
                ? meta.accentBg
                : "rgba(8,16,30,0.04)",
            border: `1.5px solid ${completed ? "rgba(34,201,138,0.3)" : inProgress ? meta.accentBorder : "rgba(8,16,30,0.08)"}`,
          }}>
          {completed ? (
            <CheckCircle size={20} style={{ color: "#22c98a" }} />
          ) : locked ? (
            <Lock size={18} style={{ color: "#9ca3af" }} />
          ) : (
            <Icon
              size={20}
              style={{ color: inProgress ? meta.accent : "#9ca3af" }}
            />
          )}
        </div>

        {/* Title area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "#9ca3af" }}>
              Section {SECTION_ORDER.indexOf(meta.id) + 1}
            </span>
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                color: st.color,
                background: st.bg,
                border: `1px solid ${st.border}`,
              }}>
              {inProgress && (
                <span
                  className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse"
                  style={{ background: "#f5a623", display: "inline-block" }}
                />
              )}
              {st.label}
            </span>
          </div>
          <h3
            className="font-bold text-base leading-tight"
            style={{
              color: "#08101e",
              fontFamily: "'DM Serif Display', serif",
            }}>
            {meta.fullName}
          </h3>
          <div
            className="flex flex-wrap gap-3 mt-1 text-xs"
            style={{ color: "#9ca3af" }}>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {meta.duration}
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: meta.accent }}
              />
              {meta.questions} {meta.questions === 1 ? "task" : "questions"}
            </span>
          </div>
        </div>

        {/* Right: timer or chevron */}
        <div className="shrink-0">
          {inProgress ? (
            <CountdownBadge
              secondsLeft={sectionState.secondsLeft}
              totalSeconds={meta.durationMin * 60}
            />
          ) : (
            <ChevronRight
              size={18}
              style={{
                color: "#9ca3af",
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            />
          )}
        </div>
      </button>

      {/* ── Expandable body ── */}
      <div
        style={{
          maxHeight: expanded && !locked ? 600 : 0,
          overflow: "hidden",
          transition: "max-height 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}>
        <div className="px-6 pb-6">
          <div
            className="h-px mb-5"
            style={{ background: "rgba(8,16,30,0.06)" }}
          />

          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: "#5a6272" }}>
            {meta.description}
          </p>

          {/* Score display for completed sections */}
          {completed && scoreDisplay && (
            <div
              className="rounded-2xl p-4 mb-5"
              style={{
                background: meta.accentBg,
                border: `1px solid ${meta.accentBorder}`,
              }}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: "#22c98a" }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#22c98a" }}>
                    Section Completed
                  </span>
                </div>
                <div className="text-sm">
                  <span style={{ color: "#5a6272" }}>Questions answered: </span>
                  <span className="font-bold" style={{ color: meta.accent }}>
                    {scoreDisplay.answered} / {meta.questions}
                  </span>
                </div>
                {"correct" in scoreDisplay && (
                  <div className="text-sm">
                    <span style={{ color: "#5a6272" }}>Correct answers: </span>
                    <span className="font-bold" style={{ color: "#22c98a" }}>
                      {scoreDisplay.correct} / {scoreDisplay.total}
                    </span>
                  </div>
                )}
                {"pending" in scoreDisplay && (
                  <div className="text-sm">
                    <span
                      className="font-semibold"
                      style={{ color: "#f5a623" }}>
                      Pending Review
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div
            className="rounded-2xl p-4 mb-5"
            style={{
              background: "rgba(8,16,30,0.025)",
              border: "1px solid rgba(8,16,30,0.07)",
            }}>
            <div className="flex items-center gap-2 mb-3">
              <Info size={13} style={{ color: "#c8963e" }} />
              <span
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: "#c8963e" }}>
                Test Instructions
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {meta.instructions.map((inst, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs leading-relaxed"
                  style={{ color: "#5a6272" }}>
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold"
                    style={{
                      background: meta.accentBg,
                      color: meta.accent,
                      border: `1px solid ${meta.accentBorder}`,
                    }}>
                    {i + 1}
                  </span>
                  {inst}
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          {completed ? (
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold"
                style={{
                  background: "rgba(34,201,138,0.1)",
                  color: "#22c98a",
                  border: "1px solid rgba(34,201,138,0.25)",
                }}>
                <CheckCircle size={15} /> Section Completed
              </div>
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold"
                style={{
                  background: "rgba(8,16,30,0.06)",
                  color: "#5a6272",
                  border: "1px solid rgba(8,16,30,0.08)",
                  cursor: "pointer",
                }}>
                <RotateCcw size={14} /> Retake
              </button>
            </div>
          ) : inProgress ? (
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold"
              style={{
                background: `linear-gradient(135deg,${meta.accent},${meta.accent}dd)`,
                color: "white",
                border: "none",
                cursor: "pointer",
                boxShadow: `0 6px 20px ${meta.accent}40`,
              }}>
              <Play size={14} /> Continue Test <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold"
              style={{
                background: `linear-gradient(135deg,${meta.accent},${meta.accent}dd)`,
                color: "white",
                border: "none",
                cursor: "pointer",
                boxShadow: `0 6px 20px ${meta.accent}40`,
              }}>
              <Play size={14} /> Start Test <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Results Summary ──────────────────────────────────────────

export function ResultsSummary({
  onRetake,
  LISTENING_ANSWER_KEY,
  READING_ANSWER_KEY,
}) {
  const { sessions, activeTestId } = useTestStore();
  const session = sessions[activeTestId];

  if (!session) return null;

  const { sections } = session;

  const listeningAnswers = sections.listening.answers;
  const listeningScore = calculateScore(listeningAnswers, LISTENING_ANSWER_KEY);
  const listeningAnswered = getAnsweredCount(listeningAnswers);

  const readingAnswers = sections.reading.answers;
  const readingScore = calculateScore(readingAnswers, READING_ANSWER_KEY);
  const readingAnswered = getAnsweredCount(readingAnswers);

  const writingAnswers = sections.writing.answers;
  const writingAnswered = getAnsweredCount(writingAnswers);
  const writingCompleted = sections.writing.status === "completed";

  const totalScore = listeningScore.score + readingScore.score;
  const totalPossible = listeningScore.total + readingScore.total;
  const overallPercentage = Math.round((totalScore / totalPossible) * 100);

  const getBandScore = (totalCorrect) => {
    if (totalCorrect >= 70)
      return { band: "8.0", description: "Very good user" };
    if (totalCorrect >= 60) return { band: "7.0", description: "Good user" };
    if (totalCorrect >= 50)
      return { band: "6.0", description: "Competent user" };
    if (totalCorrect >= 40) return { band: "5.0", description: "Modest user" };
    if (totalCorrect >= 30) return { band: "4.0", description: "Limited user" };
    return { band: "3.5", description: "Extremely limited user" };
  };

  const bandInfo = getBandScore(totalScore);

  return (
    <div
      className="rounded-3xl p-8"
      style={{
        background: "#08101e",
        border: "1px solid rgba(200,150,62,0.2)",
      }}>
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{
            background: "rgba(200,150,62,0.12)",
            border: "1.5px solid rgba(200,150,62,0.3)",
          }}>
          <Award size={36} style={{ color: "#c8963e" }} />
        </div>
        <h2
          className="text-3xl mb-2"
          style={{ fontFamily: "'DM Serif Display', serif", color: "white" }}>
          Test Completed! 🎉
        </h2>
        <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          You have successfully completed all sections. Here&apos;s your
          performance summary.
        </p>

        {/* Band estimate */}
        <div
          className="inline-flex flex-col items-center gap-1 px-8 py-4 rounded-2xl mt-4"
          style={{
            background: "rgba(200,150,62,0.1)",
            border: "1px solid rgba(200,150,62,0.25)",
          }}>
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "rgba(200,150,62,0.7)" }}>
            Estimated Band Score (L+R)
          </span>
          <span className="text-5xl font-bold" style={{ color: "#c8963e" }}>
            {bandInfo.band}
          </span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            {bandInfo.description} · {totalScore}/{totalPossible} correct
          </span>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Listening */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(124,111,247,0.1)",
            border: "1px solid rgba(124,111,247,0.2)",
          }}>
          <div className="flex items-center gap-3 mb-3">
            <Headphones size={20} style={{ color: "#7c6ff7" }} />
            <h3 className="text-base font-bold text-white">Listening</h3>
          </div>
          <p className="text-3xl font-bold" style={{ color: "#7c6ff7" }}>
            {listeningScore.score}/40
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            Answered: {listeningAnswered}/40 · Correct: {listeningScore.score}
          </p>
          <div
            className="mt-3 h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${listeningScore.percentage}%`,
                background: "#7c6ff7",
              }}
            />
          </div>
          <p className="text-xs mt-1.5" style={{ color: "#7c6ff7" }}>
            {listeningScore.percentage}% Score
          </p>
        </div>

        {/* Reading */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(59,158,255,0.1)",
            border: "1px solid rgba(59,158,255,0.2)",
          }}>
          <div className="flex items-center gap-3 mb-3">
            <BookOpen size={20} style={{ color: "#3b9eff" }} />
            <h3 className="text-base font-bold text-white">Reading</h3>
          </div>
          <p className="text-3xl font-bold" style={{ color: "#3b9eff" }}>
            {readingScore.score}/40
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            Answered: {readingAnswered}/40 · Correct: {readingScore.score}
          </p>
          <div
            className="mt-3 h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${readingScore.percentage}%`,
                background: "#3b9eff",
              }}
            />
          </div>
          <p className="text-xs mt-1.5" style={{ color: "#3b9eff" }}>
            {readingScore.percentage}% Score
          </p>
        </div>

        {/* Writing */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(34,201,138,0.1)",
            border: "1px solid rgba(34,201,138,0.2)",
          }}>
          <div className="flex items-center gap-3 mb-3">
            <PenLine size={20} style={{ color: "#22c98a" }} />
            <h3 className="text-base font-bold text-white">Writing</h3>
          </div>
          {writingCompleted ? (
            <>
              <p className="text-2xl font-bold" style={{ color: "#f5a623" }}>
                Pending
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.5)" }}>
                Tasks submitted: {writingAnswered}/2
              </p>
              <div
                className="mt-3 h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.1)" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: "100%", background: "#f5a623" }}
                />
              </div>
              <p className="text-xs mt-1.5" style={{ color: "#f5a623" }}>
                Awaiting Expert Review
              </p>
            </>
          ) : (
            <p
              className="text-xl font-bold"
              style={{ color: "rgba(255,255,255,0.3)" }}>
              Not Started
            </p>
          )}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onRetake}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold"
          style={{
            background: "linear-gradient(135deg,#c8963e,#e8b96a)",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}>
          <RotateCcw size={14} /> Retake Full Test
        </button>
        <Link
          href="/#contact"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold"
          style={{
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}>
          Get Expert Writing Feedback →
        </Link>
      </div>

      <p
        className="text-xs text-center mt-5"
        style={{ color: "rgba(255,255,255,0.3)" }}>
        * Writing scores will be added after expert review. Band estimate is
        based on Listening + Reading only.
      </p>
    </div>
  );
}
