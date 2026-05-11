"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

function bandLabel(b) {
  if (!b) return "";
  if (b >= 8) return "Expert User";
  if (b >= 7) return "Good User";
  if (b >= 6) return "Competent User";
  if (b >= 5) return "Modest User";
  return "Limited User";
}
function bandColor(b) {
  if (!b) return "#9CA3AF";
  if (b >= 7) return "#10B981";
  if (b >= 5.5) return "#F59E0B";
  return "#EF4444";
}
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

// SVG donut chart
function Donut({ correct, wrong, skipped, total }) {
  const R = 52,
    cx = 64,
    cy = 64;
  const C = 2 * Math.PI * R;
  const cArc = C * (correct / total);
  const wArc = C * (wrong / total);
  const sArc = C - cArc - wArc;
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke="#F3F4F6"
        strokeWidth={14}
      />
      {correct > 0 && (
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke="#10B981"
          strokeWidth={14}
          strokeDasharray={`${cArc} ${C - cArc}`}
          strokeDashoffset={0}
        />
      )}
      {wrong > 0 && (
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke="#EF4444"
          strokeWidth={14}
          strokeDasharray={`${wArc} ${C - wArc}`}
          strokeDashoffset={-cArc}
        />
      )}
      {skipped > 0 && (
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke="#D1D5DB"
          strokeWidth={14}
          strokeDasharray={`${sArc} ${C - sArc}`}
          strokeDashoffset={-(cArc + wArc)}
        />
      )}
    </svg>
  );
}

export default function ResultModal({
  testTitle,
  testType,
  score,
  totalQuestions,
  band,
  sectionScores,
  questionResults,
  timeSpent,
  writingPending,
  onReview,
}) {
  const [tab, setTab] = useState("overview");
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  const correct = questionResults.filter((q) => q.isCorrect).length;
  const wrong = questionResults.filter(
    (q) => !q.isCorrect && !q.isSkipped,
  ).length;
  const skipped = questionResults.filter((q) => q.isSkipped).length;
  const bc = bandColor(band);
  const pct =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const sLabel = testType === "listening" ? "Part" : "Passage";

  const filtered = questionResults.filter((q) =>
    filter === "all"
      ? true
      : filter === "correct"
        ? q.isCorrect
        : filter === "wrong"
          ? !q.isCorrect && !q.isSkipped
          : q.isSkipped,
  );

  const handleBack = () => {
    router.push("/ilts-test");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div
        className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "92vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Test Complete ✓
            </p>
            <h2 className="text-base font-black text-gray-900 mt-0.5 leading-tight">
              {testTitle}
            </h2>
          </div>
          <button
            onClick={handleBack}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-lg leading-none">
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 px-5 mb-4 shrink-0">
          {["overview", "answers"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all capitalize"
              style={
                tab === t
                  ? {
                      background: "linear-gradient(135deg,#EF4444,#F97316)",
                      color: "white",
                    }
                  : { background: "#F3F4F6", color: "#6B7280" }
              }>
              {t === "answers" ? `Answers (${questionResults.length})` : t}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 pb-3 space-y-4">
          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <>
              {/* Score hero row */}
              <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="relative shrink-0 w-28 h-28">
                  {writingPending ? (
                    <div className="w-28 h-28 rounded-full bg-amber-50 border-4 border-amber-200 flex flex-col items-center justify-center">
                      <span className="text-2xl">✍️</span>
                      <span className="text-[10px] font-bold text-amber-600 mt-1">
                        Pending
                      </span>
                    </div>
                  ) : (
                    <>
                      <Donut
                        correct={correct}
                        wrong={wrong}
                        skipped={skipped}
                        total={totalQuestions}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span
                          className="text-2xl font-black leading-none"
                          style={{ color: bc }}>
                          {band ?? "–"}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">
                          Band
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex-1">
                  {!writingPending ? (
                    <>
                      <p className="text-3xl font-black text-gray-900 leading-none">
                        {score}
                        <span className="text-lg text-gray-400">
                          /{totalQuestions}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {pct}% accuracy
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ⏱ {fmtTime(timeSpent)}
                      </p>
                      {band && (
                        <p
                          className="text-xs font-bold mt-1"
                          style={{ color: bc }}>
                          Band {band} · {bandLabel(band)}
                        </p>
                      )}
                    </>
                  ) : (
                    <div>
                      <p className="text-sm font-bold text-amber-700">
                        Writing Submitted!
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Your essays are saved. Band score will appear after
                        manual/AI review.
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ⏱ {fmtTime(timeSpent)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Correct / Wrong / Skipped */}
              {!writingPending && (
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setTab("answers");
                      setFilter("correct");
                    }}
                    className="rounded-2xl border p-3 text-center bg-[#ECFDF5] border-[#6EE7B7] hover:scale-105 transition-all cursor-pointer">
                    <p className="text-2xl font-black text-[#059669]">
                      {correct}
                    </p>
                    <p className="text-[10px] font-bold mt-0.5 text-[#059669]">
                      Correct
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      setTab("answers");
                      setFilter("wrong");
                    }}
                    className="rounded-2xl border p-3 text-center bg-[#FEF2F2] border-[#FCA5A5] hover:scale-105 transition-all cursor-pointer">
                    <p className="text-2xl font-black text-[#DC2626]">
                      {wrong}
                    </p>
                    <p className="text-[10px] font-bold mt-0.5 text-[#DC2626]">
                      Wrong
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      setTab("answers");
                      setFilter("skipped");
                    }}
                    className="rounded-2xl border p-3 text-center bg-[#F9FAFB] border-[#E5E7EB] hover:scale-105 transition-all cursor-pointer">
                    <p className="text-2xl font-black text-[#9CA3AF]">
                      {skipped}
                    </p>
                    <p className="text-[10px] font-bold mt-0.5 text-[#9CA3AF]">
                      Skipped
                    </p>
                  </button>
                </div>
              )}

              {/* Section breakdown */}
              {sectionScores.length > 0 && (
                <div className="bg-white border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                    {sLabel} Breakdown
                  </p>
                  <div className="space-y-2.5">
                    {sectionScores.map((s) => {
                      const p = (s.correct / s.total) * 100;
                      const c =
                        p >= 70 ? "#10B981" : p >= 50 ? "#F59E0B" : "#EF4444";
                      return (
                        <div
                          key={s.sectionNumber}
                          className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-500 w-20 shrink-0">
                            {sLabel} {s.sectionNumber}
                          </span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${p}%`, background: c }}
                            />
                          </div>
                          <span
                            className="text-xs font-bold w-10 text-right shrink-0"
                            style={{ color: c }}>
                            {s.correct}/{s.total}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Band tip */}
              {band && !writingPending && (
                <div
                  className="rounded-2xl p-3 border text-xs"
                  style={{
                    background: `${bc}12`,
                    borderColor: `${bc}40`,
                    color: bc,
                  }}>
                  <p className="font-black mb-0.5">💡 Tip</p>
                  <p className="opacity-80 font-medium">
                    {band >= 7
                      ? "Excellent! Keep practising to maintain your score."
                      : band >= 5.5
                        ? "Good effort! Focus on your weakest sections to push the band higher."
                        : "Regular practice with timed tests will improve your speed and accuracy significantly."}
                  </p>
                </div>
              )}
            </>
          )}

          {/* ── ANSWERS ── */}
          {tab === "answers" && (
            <>
              {/* Filter pills */}
              <div className="flex gap-1.5 flex-wrap">
                {[
                  { key: "all", label: `All (${questionResults.length})` },
                  { key: "correct", label: `✓ ${correct}` },
                  { key: "wrong", label: `✗ ${wrong}` },
                  { key: "skipped", label: `– ${skipped}` },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className="px-3 py-1 rounded-full text-xs font-bold border transition-all"
                    style={
                      filter === f.key
                        ? {
                            background:
                              "linear-gradient(135deg,#EF4444,#F97316)",
                            color: "white",
                            borderColor: "transparent",
                          }
                        : {
                            background: "white",
                            color: "#9CA3AF",
                            borderColor: "#E5E7EB",
                          }
                    }>
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Question rows */}
              <div className="space-y-2">
                {filtered.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    None in this category
                  </div>
                )}
                {filtered.map((q) => (
                  <div
                    key={q.questionNumber}
                    className="flex items-center gap-3 p-3 rounded-xl border"
                    style={
                      q.isCorrect
                        ? { background: "#F0FDF4", borderColor: "#BBF7D0" }
                        : q.isSkipped
                          ? { background: "#F9FAFB", borderColor: "#E5E7EB" }
                          : { background: "#FFF5F5", borderColor: "#FECACA" }
                    }>
                    {/* Icon */}
                    <div
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-black"
                      style={{
                        background: q.isCorrect
                          ? "#10B981"
                          : q.isSkipped
                            ? "#9CA3AF"
                            : "#EF4444",
                      }}>
                      {q.isCorrect ? "✓" : q.isSkipped ? "–" : "✗"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-gray-500">
                          Q{q.questionNumber}
                        </span>
                        {/* User answer */}
                        {q.userAnswer ? (
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              q.isCorrect
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-500 line-through"
                            }`}>
                            {q.userAnswer}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            —
                          </span>
                        )}
                        {/* Correct answer (show if wrong/skipped) */}
                        {!q.isCorrect && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            ✓ {q.correctAnswer}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex gap-3 border-t border-gray-100 shrink-0">
          <button
            onClick={handleBack}
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
            Try Another
          </button>
          <button
            onClick={onReview}
            className="flex-1 py-3 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}>
            Review Answers
          </button>
        </div>
      </div>
    </div>
  );
}
