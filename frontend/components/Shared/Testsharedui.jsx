"use client";

import { useState } from "react";

const C = {
  primary: "#EF4444",
  grad: "linear-gradient(135deg,#EF4444,#F97316)",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
export const Icons = {
  Play: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Pause: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  ),
  Check: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  X: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  Clock: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M12 6v6l4 2" />
    </svg>
  ),
  Menu: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
};

// ─── Top bar ──────────────────────────────────────────────────────────────────
export const TestTopBar = ({
  title,
  timeFormatted,
  isLowTime,
  isPlaying,
  onToggleAudio,
  onSubmit,
  currentSection,
  totalSections,
  onNext,
}) => (
  <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm h-14 flex items-center px-4 gap-3">
    {/* Logo */}
    <div className="flex items-center gap-2 flex-shrink-0">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs"
        style={{ background: C.grad }}>
        I
      </div>
      <div className="hidden sm:block">
        <p className="text-sm font-bold text-gray-900 leading-tight">{title}</p>
      </div>
    </div>

    {/* Timer */}
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ml-2 flex-shrink-0 ${
        isLowTime
          ? "bg-red-100 text-red-600 animate-pulse"
          : "bg-gray-100 text-gray-600"
      }`}>
      <Icons.Clock />
      {timeFormatted}
    </div>

    {/* Audio status */}
    {onToggleAudio && (
      <button
        onClick={onToggleAudio}
        className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
        style={
          isPlaying
            ? {
                borderColor: C.primary,
                color: C.primary,
                background: "#FFF8F8",
              }
            : { borderColor: "#E5E7EB", color: "#9CA3AF" }
        }>
        {isPlaying ? (
          <>
            <Icons.Pause /> Playing
          </>
        ) : (
          <>
            <Icons.Play /> Paused
          </>
        )}
      </button>
    )}

    <div className="flex-1" />

    {/* Next section */}
    {onNext &&
      currentSection !== undefined &&
      totalSections !== undefined &&
      currentSection < totalSections && (
        <button
          onClick={onNext}
          className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:border-gray-400 transition-all">
          Next Section →
        </button>
      )}

    {/* Submit */}
    <button
      onClick={onSubmit}
      className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-all"
      style={{ background: C.grad }}>
      Submit Test
    </button>
  </header>
);

// ─── Part / Section banner ────────────────────────────────────────────────────
export const SectionBanner = ({ part, instruction }) => (
  <div className="bg-gray-100 border-b border-gray-200 px-4 sm:px-8 py-3">
    <p className="text-sm font-bold text-gray-700">{part}</p>
    <p className="text-sm text-gray-500">{instruction}</p>
  </div>
);

// ─── Start overlay ────────────────────────────────────────────────────────────
export const StartOverlay = ({
  testTitle,
  testType,
  totalQuestions,
  duration,
  onStart,
  loading,
}) => (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{ background: C.grad }}>
        <span className="text-white text-2xl">
          {testType === "listening"
            ? "🎧"
            : testType === "reading"
              ? "📖"
              : testType === "writing"
                ? "✍️"
                : "🏆"}
        </span>
      </div>
      <h2 className="text-xl font-black text-gray-900 text-center mb-1">
        {testTitle}
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6 capitalize">
        {testType} Test
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Questions", value: String(totalQuestions) },
          { label: "Duration", value: duration },
          {
            label: "Type",
            value: testType.charAt(0).toUpperCase() + testType.slice(1),
          },
          { label: "Auto-Save", value: "Every 30s" },
        ].map((x) => (
          <div key={x.label} className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
              {x.label}
            </p>
            <p className="text-sm font-bold text-gray-700 mt-0.5">{x.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
        <p className="text-xs font-bold text-amber-700 mb-1">
          ⚠ Before you start
        </p>
        <ul className="text-xs text-amber-600 space-y-1">
          <li>• Timer starts immediately when you click Start</li>
          <li>• Your answers are auto-saved every 30 seconds</li>
          <li>• Do not refresh the page during the test</li>
          {testType === "listening" && (
            <li>• Audio plays once per part — you cannot rewind</li>
          )}
        </ul>
      </div>

      <button
        onClick={onStart}
        disabled={loading}
        className="w-full text-white font-bold py-3.5 rounded-2xl text-sm hover:scale-[1.02] hover:shadow-xl transition-all disabled:opacity-60"
        style={{ background: C.grad }}>
        {loading ? "Starting…" : "▶  Start Test Now"}
      </button>
    </div>
  </div>
);

// ─── Submit confirm modal ─────────────────────────────────────────────────────
export const SubmitModal = ({
  answeredCount,
  totalCount,
  onConfirm,
  onCancel,
  loading,
}) => {
  const unanswered = totalCount - answeredCount;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="font-black text-gray-900 text-lg mb-2">Submit Test?</h3>
        <p className="text-sm text-gray-500 mb-4">
          You have answered <strong>{answeredCount}</strong> of{" "}
          <strong>{totalCount}</strong> questions.
          {unanswered > 0 && (
            <span className="text-orange-600 font-semibold">
              {" "}
              {unanswered} unanswered.
            </span>
          )}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
            Continue Test
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
            style={{ background: C.grad }}>
            {loading ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Bottom question navigator ────────────────────────────────────────────────
export const QuestionNav = ({
  parts,
  answers,
  activePart,
  onPartClick,
  onQuestionClick,
}) => (
  <div className="sticky bottom-0 bg-white border-t border-gray-200 z-40">
    {/* Part progress bar */}
    <div className="h-0.5 bg-gray-200">
      <div
        className="h-full transition-all duration-500"
        style={{
          background: C.grad,
          width: `${(activePart / parts.length) * 100}%`,
        }}
      />
    </div>
    <div className="px-2 sm:px-6 py-2 overflow-x-auto">
      <div className="flex items-center gap-4 min-w-max">
        {parts.map((part, pi) => {
          const nums = Array.from(
            { length: part.to - part.from + 1 },
            (_, i) => part.from + i,
          );
          const isActive = pi === activePart;
          const answered = nums.filter(
            (n) => (answers[n] || "").trim() !== "",
          ).length;
          return (
            <div key={pi} className="flex items-center gap-2">
              <button
                onClick={() => onPartClick(pi)}
                className="text-xs font-bold whitespace-nowrap transition-colors"
                style={{ color: isActive ? C.primary : "#9CA3AF" }}>
                {part.label}
              </button>
              {isActive ? (
                <div className="flex gap-1">
                  {nums.map((n) => {
                    const ans = (answers[n] || "").trim() !== "";
                    return (
                      <button
                        key={n}
                        onClick={() => onQuestionClick(n)}
                        className="w-6 h-6 rounded text-[10px] font-bold transition-all"
                        style={
                          ans
                            ? {
                                background: "#D1FAE5",
                                color: "#065F46",
                                border: "1px solid #6EE7B7",
                              }
                            : {
                                background: "white",
                                color: "#374151",
                                border: "1px solid #D1D5DB",
                              }
                        }>
                        {n}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <span className="text-xs text-gray-400">
                  {answered}/{nums.length}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// ─── Result page ──────────────────────────────────────────────────────────────
export const ResultPage = ({
  result,
  testType,
  testTitle,
  answers,
  correctAnswers,
  onRetry,
}) => {
  const [showAnswers, setShowAnswers] = useState(false);

  const band =
    result?.listeningBand ?? result?.readingBand ?? result?.overallBand ?? 0;
  const score = result?.listeningScore || result?.readingScore;
  const total = result?.totalQuestions || 40;

  const bandColor = band >= 7 ? "#10B981" : band >= 5.5 ? "#F59E0B" : "#EF4444";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Score card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm font-bold text-gray-500 mb-1">{testTitle}</p>
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center mx-auto my-5 shadow-lg"
            style={{
              background: `conic-gradient(${bandColor} ${(band / 9) * 360}deg, #F3F4F6 0deg)`,
            }}>
            <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
              <span
                className="text-3xl font-black"
                style={{ color: bandColor }}>
                {band || "–"}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                Band
              </span>
            </div>
          </div>
          {score !== undefined && (
            <p className="text-sm text-gray-500">
              {score}/{total} correct answers
            </p>
          )}
          {result?.writingPending && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs text-amber-700 font-semibold">
                ✏️ Writing score pending — will be scored manually or by AI
              </p>
            </div>
          )}
        </div>

        {/* Section breakdown */}
        {(result?.listeningSectionScores || result?.readingSectionScores) && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm font-bold text-gray-700 mb-4">
              Section Breakdown
            </p>
            {(
              result?.listeningSectionScores || result?.readingSectionScores
            )?.map((s) => (
              <div
                key={s.sectionNumber}
                className="flex items-center gap-3 mb-3 last:mb-0">
                <span className="text-xs font-bold text-gray-500 w-16 flex-shrink-0">
                  {testType === "listening"
                    ? `Part ${s.sectionNumber}`
                    : `Passage ${s.sectionNumber}`}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(s.correct / s.total) * 100}%`,
                      background: C.grad,
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-700 w-12 text-right">
                  {s.correct}/{s.total}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Answer review toggle */}
        {Object.keys(correctAnswers).length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              Review Answers
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${showAnswers ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showAnswers && (
              <div className="border-t border-gray-100 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.keys(correctAnswers)
                    .sort((a, b) => Number(a) - Number(b))
                    .map((qNum) => {
                      const correct = String(correctAnswers[Number(qNum)])
                        .toLowerCase()
                        .trim();
                      const given = String(answers[qNum] || "")
                        .toLowerCase()
                        .trim();
                      const isRight = correct === given;
                      return (
                        <div
                          key={qNum}
                          className={`flex items-start gap-2 p-2.5 rounded-xl text-xs ${
                            isRight
                              ? "bg-green-50"
                              : given
                                ? "bg-red-50"
                                : "bg-gray-50"
                          }`}>
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                              isRight
                                ? "bg-green-500"
                                : given
                                  ? "bg-red-500"
                                  : "bg-gray-300"
                            }`}>
                            {isRight ? "✓" : given ? "✗" : "–"}
                          </span>
                          <div>
                            <span className="font-bold text-gray-600">
                              Q{qNum}:{" "}
                            </span>
                            {!isRight && given && (
                              <span className="line-through text-red-400 mr-1">
                                {answers[qNum]}
                              </span>
                            )}
                            <span
                              className={
                                isRight
                                  ? "text-green-700 font-semibold"
                                  : "text-green-600 font-semibold"
                              }>
                              {correctAnswers[Number(qNum)]}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
            Try Another Test
          </button>
          <a
            href="/dashboard"
            className="flex-1 py-3.5 rounded-2xl text-white text-sm font-bold text-center transition-all hover:opacity-90"
            style={{ background: C.grad }}>
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};
