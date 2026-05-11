"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  QuestionNav,
  SectionBanner,
  StartOverlay,
  SubmitModal,
  TestTopBar,
} from "../../../../components/Shared/Testsharedui";
import ResultModal from "../../../../components/Shared/Resultmodal";
import { useAppSelector } from "../../../../features/Store";
import { getTest } from "../../../../action/student";
import { useTestSession } from "../../../../hooks/Usetestsession";
import { UserRoute } from "../../../../Providers/PrivateRoute";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInputStyle(reviewMode, qr) {
  if (!reviewMode || !qr)
    return "border-gray-400 focus:border-red-400 focus:ring-1 focus:ring-red-100";
  if (qr.isCorrect)
    return "border-green-400 bg-green-50 text-green-700 font-semibold";
  if (qr.isSkipped) return "border-gray-300 bg-gray-100 text-gray-400";
  return "border-red-400 bg-red-50 text-red-600 line-through";
}

function FillQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  const f = q.formFields?.[0];
  if (!f) return null;

  return (
    <div
      className={`flex items-center gap-2 flex-wrap py-2 px-3 rounded-xl border mb-2 ${
        reviewMode && qr
          ? qr.isCorrect
            ? "bg-green-50 border-green-200"
            : qr.isSkipped
              ? "bg-gray-50 border-gray-200"
              : "bg-red-50 border-red-200"
          : "border-gray-100 hover:bg-gray-50"
      }`}>
      {/* Label */}
      <span className="text-sm text-gray-700 min-w-30 font-medium">
        {f.label}
      </span>

      {f.prefix && <span className="text-sm text-gray-700">{f.prefix}</span>}
      {f.prefixSymbol && (
        <span className="text-sm font-medium text-gray-700">
          {f.prefixSymbol}
        </span>
      )}

      {/* Input with question number badge */}
      <div className="relative inline-block">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-white border border-gray-300 rounded px-1 text-gray-500 leading-tight z-10">
          {q.questionNumber}
        </span>
        <input
          type="text"
          value={answers[String(q.questionNumber)] || ""}
          onChange={(e) =>
            !reviewMode && onAnswer(q.questionNumber, e.target.value)
          }
          readOnly={reviewMode}
          className={`w-28 sm:w-36 border rounded px-2 py-1.5 text-sm outline-none text-center transition-all ${getInputStyle(reviewMode, qr)}`}
          aria-label={`Question ${q.questionNumber}`}
        />
      </div>

      {f.suffix && <span className="text-sm text-gray-700">{f.suffix}</span>}

      {/* Correct answer badge in review */}
      {reviewMode && qr && !qr.isCorrect && (
        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
          ✓ {qr.correctAnswer}
        </span>
      )}
    </div>
  );
}

// ── MCQ Single / Multiple ─────────────────────────────────────────
function MCQQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  const isMultiple = q.type === "mcq_multiple";

  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-gray-800 mb-2.5 flex items-start gap-2">
        <span
          className="inline-flex w-6 h-6 rounded shrink-0 mt-0.5 items-center justify-center text-white text-xs font-bold"
          style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}>
          {q.questionNumber}
        </span>
        <span className="flex-1">{q.stem}</span>
        {reviewMode && qr && (
          <span
            className={`text-xs font-black shrink-0 ${qr.isCorrect ? "text-green-600" : "text-red-500"}`}>
            {qr.isCorrect ? "✓ Correct" : `✗ Ans: ${qr.correctAnswer}`}
          </span>
        )}
      </p>
      {isMultiple && (
        <p className="text-xs text-gray-400 mb-2 pl-8">
          Choose {q.multipleAnswerCount || 2} answers
        </p>
      )}
      <div className="space-y-2 pl-8">
        {q.options?.map((opt) => {
          const sel = isMultiple
            ? (answers[q.questionNumber] || "").split(",").includes(opt.label)
            : answers[q.questionNumber] === opt.label;
          const correct =
            reviewMode && (qr?.correctAnswer || "").includes(opt.label);
          const wrong = reviewMode && sel && !qr?.isCorrect;

          return (
            <label
              key={opt.label}
              className="flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all select-none"
              style={
                correct
                  ? { borderColor: "#10B981", background: "#F0FDF4" }
                  : wrong
                    ? { borderColor: "#EF4444", background: "#FEF2F2" }
                    : sel
                      ? { borderColor: "#EF4444", background: "#FFF8F8" }
                      : { borderColor: "#E5E7EB", background: "white" }
              }>
              <input
                type={isMultiple ? "checkbox" : "radio"}
                name={`q_${q.questionNumber}`}
                value={opt.label}
                checked={sel}
                onChange={() => {
                  if (reviewMode) return;
                  if (isMultiple) {
                    const current = (answers[q.questionNumber] || "")
                      .split(",")
                      .filter(Boolean);
                    const updated = current.includes(opt.label)
                      ? current.filter((v) => v !== opt.label)
                      : [...current, opt.label];
                    onAnswer(q.questionNumber, updated.join(","));
                  } else {
                    onAnswer(q.questionNumber, opt.label);
                  }
                }}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                  isMultiple ? "rounded-md" : "rounded-full"
                } border-2`}
                style={
                  correct
                    ? {
                        borderColor: "#10B981",
                        background: "#10B981",
                        color: "white",
                      }
                    : wrong
                      ? {
                          borderColor: "#EF4444",
                          background: "#EF4444",
                          color: "white",
                        }
                      : sel
                        ? {
                            borderColor: "#EF4444",
                            background: "#EF4444",
                            color: "white",
                          }
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

// ── True / False / Not Given ──────────────────────────────────────
function TFNGQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  const OPTIONS = ["True", "False", "Not Given"];
  const selected = answers[String(q.questionNumber)] || "";

  return (
    <div
      className={`border rounded-2xl p-4 mb-3 transition-all ${
        reviewMode && qr
          ? qr.isCorrect
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
          : "border-gray-100 hover:border-gray-200"
      }`}>
      <div className="flex items-start gap-2 mb-3">
        <span
          className="inline-flex w-6 h-6 rounded flex-shrink-0 mt-0.5 items-center justify-center text-white text-xs font-bold"
          style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}>
          {q.questionNumber}
        </span>
        <p className="text-sm text-gray-700 flex-1">
          {q.statementText || q.stem}
        </p>
        {reviewMode && qr && !qr.isCorrect && (
          <span className="text-xs font-black text-red-500 flex-shrink-0">
            ✗ Ans: {qr.correctAnswer}
          </span>
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
                  ? {
                      background: "#D1FAE5",
                      color: "#065F46",
                      borderColor: "#6EE7B7",
                    }
                  : wrong
                    ? {
                        background: "#FEE2E2",
                        color: "#991B1B",
                        borderColor: "#FCA5A5",
                      }
                    : sel
                      ? {
                          background: "linear-gradient(135deg,#EF4444,#F97316)",
                          color: "white",
                          borderColor: "transparent",
                        }
                      : {
                          borderColor: "#E5E7EB",
                          color: "#6B7280",
                          background: "white",
                        }
              }>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Short Answer ──────────────────────────────────────────────────
function ShortAnswerQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  return (
    <div className="mb-4">
      <div className="flex items-start gap-2 mb-2">
        <span
          className="inline-flex w-6 h-6 rounded shrink-0 mt-0.5 items-center justify-center text-white text-xs font-bold"
          style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}>
          {q.questionNumber}
        </span>
        <p className="text-sm font-semibold text-gray-800 flex-1">{q.stem}</p>
        {reviewMode && qr && !qr.isCorrect && (
          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex-shrink-0">
            ✓ {qr.correctAnswer}
          </span>
        )}
      </div>
      <div className="pl-8">
        <input
          type="text"
          value={answers[q.questionNumber] || ""}
          onChange={(e) =>
            !reviewMode && onAnswer(q.questionNumber, e.target.value)
          }
          readOnly={reviewMode}
          placeholder="Write your answer here…"
          className={`w-full sm:w-80 border rounded-xl px-3 py-2 text-sm outline-none transition-all ${getInputStyle(reviewMode, qr)}`}
        />
        {reviewMode && qr?.isCorrect && (
          <p className="text-xs text-green-600 font-semibold mt-1">✓ Correct</p>
        )}
      </div>
    </div>
  );
}

// ── Matching ──────────────────────────────────────────────────────
function MatchingQuestion({ q, answers, onAnswer, reviewMode, qr }) {
  const opts = q.matchOptions || [];
  return (
    <div className="mb-4">
      <div className="flex items-start gap-2 mb-2">
        <span
          className="inline-flex w-6 h-6 rounded shrink-0 mt-0.5 items-center justify-center text-white text-xs font-bold"
          style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}>
          {q.questionNumber}
        </span>
        <p className="text-sm font-semibold text-gray-800 flex-1">
          {q.stem || q.matchItems?.[0]?.text}
        </p>
      </div>
      <div className="pl-8">
        <select
          value={answers[q.questionNumber] || ""}
          onChange={(e) =>
            !reviewMode && onAnswer(q.questionNumber, e.target.value)
          }
          disabled={reviewMode}
          className={`w-full sm:w-72 border rounded-xl px-3 py-2 text-sm outline-none transition-all ${
            reviewMode && qr
              ? qr.isCorrect
                ? "border-green-400 bg-green-50 text-green-700"
                : "border-red-400 bg-red-50 text-red-600"
              : "border-gray-300 focus:border-red-400"
          }`}>
          <option value="">— Select —</option>
          {opts.map((o) => (
            <option key={o.label} value={o.label}>
              {o.label}. {o.text}
            </option>
          ))}
        </select>
        {reviewMode && qr && !qr.isCorrect && (
          <p className="text-xs text-green-600 font-bold mt-1">
            ✓ Answer: {qr.correctAnswer}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionQuestions({
  section,
  answers,
  onAnswer,
  reviewMode,
  qResults,
}) {
  const qb = section.questionBlock;

  const groups = [];

  for (const q of section.questions || []) {
    const last = groups[groups.length - 1];
    if (last && last.type === q.type) {
      last.questions.push(q);
    } else {
      groups.push({ type: q.type, questions: [q] });
    }
  }

  // Helper: instruction text per type
  const typeInstruction = {
    form_completion:
      qb?.instruction ||
      "Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    note_completion:
      qb?.instruction ||
      "Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    sentence_completion:
      qb?.instruction ||
      "Complete each sentence. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    short_answer:
      qb?.instruction ||
      "Answer the questions. Write NO MORE THAN THREE WORDS for each answer.",
    mcq_single: qb?.instruction || "Choose the correct letter, A, B or C.",
    mcq_multiple: qb?.instruction || "Choose the correct letters.",
    true_false_ng:
      qb?.instruction ||
      "Do the following statements agree with the information? Write TRUE, FALSE or NOT GIVEN.",
    matching: qb?.instruction || "Match each item with the correct option.",
    map_labelling:
      qb?.instruction ||
      "Label the map. Write NO MORE THAN TWO WORDS for each answer.",
  };

  const FILL_TYPES = [
    "form_completion",
    "note_completion",
    "sentence_completion",
    "map_labelling",
  ];

  return (
    <div>
      {/* Section heading */}
      <div className="mb-5">
        <p className="text-sm font-bold text-gray-800 mb-0.5">
          Questions {section.questionRange?.from} – {section.questionRange?.to}
        </p>
        {qb?.tableTitle && (
          <p className="font-black text-base text-gray-900 mb-1">
            {qb.tableTitle}
          </p>
        )}
        {qb?.exampleRow?.label && (
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 max-w-lg">
            <div className="grid grid-cols-2 bg-gray-100 border-b border-gray-200">
              <div className="px-3 py-2 text-xs font-bold text-gray-500 border-r border-gray-200">
                Example
              </div>
              <div className="px-3 py-2 text-xs font-bold text-gray-500">
                Answer
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-3 py-2 text-sm font-semibold text-gray-700 border-r border-gray-100">
                {qb.exampleRow.label}
              </div>
              <div className="px-3 py-2 text-sm text-gray-600 font-medium">
                {qb.exampleRow.value}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Render each group */}
      {groups.map((group, gi) => {
        const from = group.questions[0].questionNumber;
        const to = group.questions[group.questions.length - 1].questionNumber;
        const isFill = FILL_TYPES.includes(group.type);

        return (
          <div key={gi} className="mb-8">
            {/* Group instruction */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4">
              <p className="text-xs font-bold text-gray-600 mb-0.5">
                Question{group.questions.length > 1 ? "s" : ""} {from}
                {group.questions.length > 1 ? ` – ${to}` : ""}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {typeInstruction[group.type] || "Answer the questions."}
              </p>
            </div>

            {/* Fill-in: render as table */}
            {isFill && (
              <div className="border border-gray-300 rounded-lg overflow-hidden max-w-lg">
                <div className="grid grid-cols-2 bg-gray-100 border-b border-gray-300">
                  <div className="px-3 py-2 text-sm font-semibold text-gray-700 border-r border-gray-300">
                    Label
                  </div>
                  <div className="px-3 py-2 text-sm font-semibold text-gray-700">
                    Your Answer
                  </div>
                </div>
                {group.questions.map((q) => (
                  <FillQuestion
                    key={q.questionNumber}
                    q={q}
                    answers={answers}
                    onAnswer={onAnswer}
                    reviewMode={reviewMode}
                    qr={
                      reviewMode
                        ? (qResults.find(
                            (r) => r.questionNumber === q.questionNumber,
                          ) ?? null)
                        : null
                    }
                  />
                ))}
              </div>
            )}

            {/* MCQ */}
            {(group.type === "mcq_single" || group.type === "mcq_multiple") &&
              group.questions.map((q) => (
                <MCQQuestion
                  key={q.questionNumber}
                  q={q}
                  answers={answers}
                  onAnswer={onAnswer}
                  reviewMode={reviewMode}
                  qr={
                    reviewMode
                      ? (qResults.find(
                          (r) => r.questionNumber === q.questionNumber,
                        ) ?? null)
                      : null
                  }
                />
              ))}

            {/* True/False/NG */}
            {group.type === "true_false_ng" &&
              group.questions.map((q) => (
                <TFNGQuestion
                  key={q.questionNumber}
                  q={q}
                  answers={answers}
                  onAnswer={onAnswer}
                  reviewMode={reviewMode}
                  qr={
                    reviewMode
                      ? (qResults.find(
                          (r) => r.questionNumber === q.questionNumber,
                        ) ?? null)
                      : null
                  }
                />
              ))}

            {/* Short answer */}
            {group.type === "short_answer" &&
              group.questions.map((q) => (
                <ShortAnswerQuestion
                  key={q.questionNumber}
                  q={q}
                  answers={answers}
                  onAnswer={onAnswer}
                  reviewMode={reviewMode}
                  qr={
                    reviewMode
                      ? (qResults.find(
                          (r) => r.questionNumber === q.questionNumber,
                        ) ?? null)
                      : null
                  }
                />
              ))}

            {/* Matching */}
            {group.type === "matching" &&
              group.questions.map((q) => (
                <MatchingQuestion
                  key={q.questionNumber}
                  q={q}
                  answers={answers}
                  onAnswer={onAnswer}
                  reviewMode={reviewMode}
                  qr={
                    reviewMode
                      ? (qResults.find(
                          (r) => r.questionNumber === q.questionNumber,
                        ) ?? null)
                      : null
                  }
                />
              ))}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════
export default function ListeningPracticePage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id;
  const user = useAppSelector((state) => state.auth.user);

  const [testData, setTestData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [activePart, setActivePart] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const audioRef = useRef(null);

  const session = useTestSession({
    testId,
    testType: "listening",
    testTitle: testData?.title || "",
    seriesId: testData?.seriesId || "",
    testNumber: testData?.testNumber || 0,
    userId: user?._id,
    totalSeconds: 40 * 60,
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getTest("listening", testId);
      if (data.success) {
        setTestData(data.data);
        setPageLoading(false);
      }
    };
    fetch();
  }, [testId]);

  // Auto-play audio when part changes
  useEffect(() => {
    if (!session.started || !testData) return;
    const url = testData.sections?.[activePart]?.audioUrl;
    if (url && audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [session.started, activePart]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    isPlaying
      ? audioRef.current.pause()
      : audioRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  // Guards
  if (pageLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 rounded-full border-4 border-red-500 border-t-transparent" />
      </div>
    );
  if (!testData)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Test not found
      </div>
    );

  const sections = testData.sections || [];
  const currentSection = sections[activePart];
  const navParts = sections.map((s) => ({
    label: s.title,
    from: s.questionRange?.from,
    to: s.questionRange?.to,
  }));
  const totalQ = sections.reduce(
    (sum, s) => sum + (s.questions?.length || 0),
    0,
  );
  const r = session.result;
  const qResults = r?.questionResults || [];

  return (
    <UserRoute>
      <div
        className="min-h-screen bg-white flex flex-col"
        style={{
          fontFamily: "'Plus Jakarta Sans','DM Sans',ui-sans-serif,sans-serif",
        }}>
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

        {/* ── Start overlay ── */}
        {!session.started && !session.submitted && (
          <StartOverlay
            testTitle={testData.title}
            testType="listening"
            totalQuestions={totalQ}
            duration="40 min"
            onStart={session.startSession}
            loading={session.loading}
          />
        )}

        {/* ── Submit confirm ── */}
        {showSubmit && (
          <SubmitModal
            answeredCount={session.answeredCount}
            totalCount={totalQ}
            onConfirm={() => {
              setShowSubmit(false);
              session.handleSubmit();
            }}
            onCancel={() => setShowSubmit(false)}
            loading={session.loading}
          />
        )}

        {/* ── Result modal ── */}
        {session.showResult && r && (
          <ResultModal
            testTitle={testData.title}
            testType="listening"
            score={r.listeningScore || 0}
            totalQuestions={r.totalQuestions || totalQ}
            band={r.listeningBand}
            sectionScores={r.listeningSectionScores || []}
            questionResults={qResults}
            timeSpent={r.timeSpent || 0}
            onClose={() => router.push("/mock-test?type=listening")}
            onReview={() => {
              session.setShowResult(false);
              setReviewMode(true);
            }}
          />
        )}

        {/* ── Top bar ── */}
        <TestTopBar
          title={testData.title}
          timeFormatted={session.submitted ? "Done ✓" : session.timeFormatted}
          isLowTime={session.isLowTime}
          isPlaying={isPlaying}
          onToggleAudio={
            session.started && !session.submitted ? toggleAudio : undefined
          }
          onSubmit={() =>
            session.submitted
              ? session.setShowResult(true)
              : setShowSubmit(true)
          }
          currentSection={activePart}
          totalSections={sections.length - 1}
          onNext={
            !session.submitted && activePart < sections.length - 1
              ? () => {
                  setActivePart(activePart + 1);
                  window.scrollTo({ top: 0 });
                }
              : undefined
          }
        />

        {/* ── Part banner ── */}
        {currentSection && (
          <SectionBanner
            part={currentSection.title || `Part ${activePart + 1}`}
            instruction={currentSection.instruction}
          />
        )}

        {/* ── Audio bar ── */}
        {session.started && !session.submitted && currentSection?.audioUrl && (
          <div className="px-4 sm:px-8 py-2.5 bg-red-50 border-b border-red-100 flex items-center gap-3">
            <button
              onClick={toggleAudio}
              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white"
              style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}>
              {isPlaying ? (
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex-1 h-1.5 bg-red-200 rounded-full">
              <div className="h-full bg-red-500 rounded-full w-1/3" />
            </div>
            <span className="text-xs text-red-500 font-semibold">
              {isPlaying ? "🔊 Playing…" : "⏸ Paused"}
            </span>
          </div>
        )}

        {/* ── Review banner ── */}
        {reviewMode && (
          <div className="bg-blue-50 border-b border-blue-100 px-4 sm:px-8 py-2 flex items-center justify-between">
            <p className="text-xs font-bold text-blue-700">
              📋 Review Mode — correct answers highlighted inline
            </p>
            <button
              onClick={() => session.setShowResult(true)}
              className="text-xs text-blue-600 underline font-bold">
              View Score
            </button>
          </div>
        )}

        {/* ── Session error ── */}
        {session.error && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-xs text-red-600 font-semibold">
            ⚠ {session.error}
          </div>
        )}

        {/* ── Main content ── */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-4xl mx-auto w-full">
          {currentSection ? (
            <SectionQuestions
              section={currentSection}
              answers={session.answers}
              onAnswer={session.setAnswer}
              reviewMode={reviewMode}
              qResults={qResults}
            />
          ) : (
            <p className="text-sm text-gray-400">No section found</p>
          )}
        </main>

        {/* ── Floating part arrows ── */}
        <div className="fixed bottom-24 right-4 flex flex-col gap-2 z-30">
          {activePart > 0 && (
            <button
              onClick={() => {
                setActivePart(activePart - 1);
                window.scrollTo({ top: 0 });
              }}
              className="w-11 h-11 rounded-xl bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:border-red-400 transition-all">
              ↑
            </button>
          )}
          {activePart < sections.length - 1 && (
            <button
              onClick={() => {
                setActivePart(activePart + 1);
                window.scrollTo({ top: 0 });
              }}
              className="w-11 h-11 rounded-xl shadow-lg flex items-center justify-center text-white hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg,#EF4444,#F97316)" }}>
              ↓
            </button>
          )}
        </div>

        {/* ── Bottom nav ── */}
        {session.started && (
          <QuestionNav
            parts={navParts}
            answers={session.answers}
            activePart={activePart}
            onPartClick={(i) => {
              setActivePart(i);
              window.scrollTo({ top: 0 });
            }}
            onQuestionClick={() => {}}
          />
        )}
      </div>
    </UserRoute>
  );
}
