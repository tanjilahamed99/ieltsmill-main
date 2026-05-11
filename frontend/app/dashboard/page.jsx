"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../features/Store";
import { logout } from "../../features/slice/auth/authSlice";
import PrivateRoute, { UserRoute } from "../../Providers/PrivateRoute";
import Link from "next/link";
import { 
  selectStats, 
  fetchUserAttempts, 
  selectAttemptsLoading,
  selectAttemptsError 
} from "../../features/slice/Attemptslice";

const C = {
  primary: "#EF4444",
  grad: "linear-gradient(135deg,#EF4444,#F97316)",
  gradBlue: "linear-gradient(135deg,#3B82F6,#6366F1)",
  gradGreen: "linear-gradient(135deg,#10B981,#059669)",
  gradAmber: "linear-gradient(135deg,#F59E0B,#D97706)",
  dark: "#0F172A",
  surface: "#F8FAFC",
};

function bandColor(b) {
  if (!b) return "#9CA3AF";
  if (b >= 7) return "#10B981";
  if (b >= 5.5) return "#F59E0B";
  return "#EF4444";
}

function bandLabel(b) {
  if (!b) return "Not scored";
  if (b >= 8) return "Expert";
  if (b >= 7) return "Good User";
  if (b >= 6) return "Competent";
  if (b >= 5) return "Modest";
  return "Limited";
}

function fmtTime(s) {
  const m = Math.floor(s / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
}

function fmtDate(iso) {
  if (!iso) return "N/A";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function completion(attempt) {
  if (!attempt.score || !attempt.totalQuestions) return 0;
  return Math.round((attempt.score / attempt.totalQuestions) * 100);
}

function Ring({ value, max = 9, size = 64, stroke = 7, color }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#F1F5F9"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${c * pct} ${c * (1 - pct)}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Bar({ pct, color, animate = true }) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

function TypePill({ type }) {
  const map = {
    listening: { icon: "🎧", color: "#3B82F6", bg: "#EFF6FF" },
    reading: { icon: "📖", color: "#10B981", bg: "#ECFDF5" },
    writing: { icon: "✍️", color: "#F59E0B", bg: "#FFFBEB" },
    full: { icon: "🏆", color: "#EF4444", bg: "#FEF2F2" },
  };
  const t = map[type] || { icon: "📝", color: "#6B7280", bg: "#F9FAFB" };
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide"
      style={{ background: t.bg, color: t.color }}>
      {t.icon} {type}
    </span>
  );
}

function SectionBars({ sections, type }) {
  if (!sections?.length) return null;
  const label = type === "listening" ? "P" : "Ps";
  return (
    <div className="flex items-end gap-1.5 mt-2">
      {sections.map((s) => {
        const pct = s.total > 0 ? (s.correct / s.total) * 100 : 0;
        const col = pct >= 70 ? "#10B981" : pct >= 50 ? "#F59E0B" : "#EF4444";
        return (
          <div
            key={s.sectionNumber}
            className="flex flex-col items-center gap-0.5">
            <div
              className="w-6 bg-slate-100 rounded-t-sm overflow-hidden"
              style={{ height: 28 }}>
              <div
                className="w-full rounded-t-sm transition-all"
                style={{
                  height: `${pct}%`,
                  background: col,
                  marginTop: `${100 - pct}%`,
                }}
              />
            </div>
            <span className="text-[9px] font-bold text-slate-400">
              {label}
              {s.sectionNumber}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function AttemptCard({ attempt, onView }) {
  const band = attempt.overallBand || attempt.band;
  const bc = bandColor(band);
  const comp = completion(attempt);
  const isPending = attempt.writingPending && !band;

  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
      onClick={onView}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <TypePill type={attempt.testType} />
            {attempt.status === "in_progress" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                In Progress
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-slate-800 truncate">
            {attempt.testTitle}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {fmtDate(attempt.submittedAt || attempt.startedAt)}
            {attempt.timeSpent ? ` · ${fmtTime(attempt.timeSpent)}` : ""}
          </p>
        </div>

        <div className="flex-shrink-0 relative">
          {isPending ? (
            <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-200 flex flex-col items-center justify-center">
              <span className="text-lg leading-none">✍️</span>
              <span className="text-[8px] font-bold text-amber-600 mt-0.5">
                Pending
              </span>
            </div>
          ) : band ? (
            <div className="relative w-14 h-14">
              <Ring value={band} max={9} size={56} stroke={6} color={bc} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-sm font-black leading-none"
                  style={{ color: bc }}>
                  {band}
                </span>
                <span className="text-[8px] text-slate-400 font-bold">
                  Band
                </span>
              </div>
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-100 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400">N/A</span>
            </div>
          )}
        </div>
      </div>

      {attempt.status === "submitted" && !isPending && (
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              Accuracy
            </span>
            <span
              className="text-xs font-black"
              style={{ color: bandColor(band) }}>
              {comp}%
              {attempt.score !== undefined && attempt.totalQuestions && (
                <span className="text-slate-400 font-normal">
                  {" "}
                  ({attempt.score}/{attempt.totalQuestions})
                </span>
              )}
            </span>
          </div>
          <Bar pct={comp} color={bandColor(band)} />
        </div>
      )}

      {(attempt.sectionScores?.length ?? 0) > 0 && (
        <SectionBars sections={attempt.sectionScores} type={attempt.testType} />
      )}

      {band && (
        <div className="mt-2.5 flex items-center justify-between">
          <span
            className="text-[10px] font-bold uppercase tracking-wide"
            style={{ color: bc }}>
            {bandLabel(band)}
          </span>
          <span className="text-[10px] text-slate-400 group-hover:text-red-500 transition-colors font-semibold">
            View details →
          </span>
        </div>
      )}
    </div>
  );
}

function EmptyState({ type }) {
  const router = useRouter();
  const map = {
    all: { icon: "📋", label: "No tests attempted yet", path: "/ilts-test" },
    listening: {
      icon: "🎧",
      label: "No listening tests yet",
      path: "/ilts-test?type=listening",
    },
    reading: {
      icon: "📖",
      label: "No reading tests yet",
      path: "/ilts-test?type=reading",
    },
    writing: {
      icon: "✍️",
      label: "No writing tests yet",
      path: "/ilts-test?type=writing",
    },
    full: { icon: "🏆", label: "No full mock tests yet", path: "/ilts-test" },
    in_progress: {
      icon: "⏳",
      label: "No tests in progress",
      path: "/ilts-test",
    },
  };
  const m = map[type] || map.all;
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-3">{m.icon}</div>
      <p className="text-sm font-bold text-slate-500 mb-1">{m.label}</p>
      <p className="text-xs text-slate-400 mb-4">
        Start practising to see your progress here
      </p>
      <button
        onClick={() => router.push(m.path)}
        className="text-white text-xs font-bold px-5 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition-all"
        style={{ background: C.grad }}>
        Start a Test →
      </button>
    </div>
  );
}

function StatCard({ label, value, sub, icon, grad }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 -translate-y-4 translate-x-4"
        style={{ background: grad }}
      />
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-3"
        style={{ background: grad }}>
        {icon}
      </div>
      <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
      {sub && (
        <p className="text-xs text-slate-500 mt-0.5 font-medium">{sub}</p>
      )}
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
        {label}
      </p>
    </div>
  );
}

function BandSparkline({ attempts }) {
  const pts = attempts
    .filter((a) => a.status === "submitted" && (a.overallBand || a.band) != null)
    .slice(-8)
    .map((a) => a.overallBand || a.band);

  if (pts.length < 2) return null;

  const w = 180, h = 48;
  const min = Math.min(...pts, 0);
  const max = Math.max(...pts, 9);
  const xStep = w / (pts.length - 1);
  const yScale = (v) => h - ((v - min) / (max - min)) * h * 0.8 - h * 0.1;

  const path = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * xStep} ${yScale(v)}`)
    .join(" ");

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
        Band Trend
      </p>
      <div className="flex items-end justify-between gap-2">
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="overflow-visible">
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
          <path
            d={path}
            fill="none"
            stroke="url(#sparkGrad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {pts.map((v, i) => (
            <circle
              key={i}
              cx={i * xStep}
              cy={yScale(v)}
              r={3}
              fill="url(#sparkGrad)"
              stroke="white"
              strokeWidth={1.5}
            />
          ))}
        </svg>
        <div className="text-right shrink-0">
          <p
            className="text-xl font-black"
            style={{ color: bandColor(pts[pts.length - 1]) }}>
            {pts[pts.length - 1]}
          </p>
          <p className="text-[10px] text-slate-400">Latest</p>
        </div>
      </div>
    </div>
  );
}

function OverallRing({ avgBand }) {
  const b = avgBand || 0;
  const bc = bandColor(avgBand);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col items-center justify-center text-center">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
        Average Band
      </p>
      <div className="relative w-24 h-24">
        <Ring value={b} max={9} size={96} stroke={9} color={bc} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-black leading-none"
            style={{ color: bc }}>
            {avgBand ?? "–"}
          </span>
          <span className="text-[9px] text-slate-400 font-bold mt-0.5">
            / 9.0
          </span>
        </div>
      </div>
      <p className="text-xs font-bold mt-2" style={{ color: bc }}>
        {bandLabel(avgBand)}
      </p>
    </div>
  );
}

function TypeProgress({ attempts }) {
  const submitted = attempts.filter((a) => a.status === "submitted");
  const types = [
    { key: "listening", label: "Listening", icon: "🎧", color: "#3B82F6" },
    { key: "reading", label: "Reading", icon: "📖", color: "#10B981" },
    { key: "writing", label: "Writing", icon: "✍️", color: "#F59E0B" },
    { key: "full", label: "Full Test", icon: "🏆", color: "#EF4444" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
        By Type
      </p>
      <div className="space-y-3">
        {types.map((t) => {
          const byType = submitted.filter((a) => a.testType === t.key);
          const count = byType.length;
          const bands = byType.map((a) => a.overallBand || a.band).filter((b) => b != null);
          const avg = bands.length
            ? +(bands.reduce((a, b) => a + b, 0) / bands.length).toFixed(1)
            : null;
          const pct = (count / Math.max(submitted.length, 1)) * 100;

          return (
            <div key={t.key} className="flex items-center gap-3">
              <span className="text-base w-6 shrink-0">{t.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-700">
                    {t.label}
                  </span>
                  <span className="text-xs text-slate-400">
                    {count} test{count !== 1 ? "s" : ""}
                  </span>
                </div>
                <Bar pct={pct} color={t.color} />
              </div>
              {avg && (
                <span
                  className="text-xs font-black shrink-0 w-8 text-right"
                  style={{ color: bandColor(avg) }}>
                  {avg}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AttemptDetailModal({ attempt, onClose, onRetry, onContinue }) {
  const band = attempt.overallBand || attempt.band;
  const bc = bandColor(band);
  const comp = completion(attempt);
  const qr = attempt.questionResults || [];
  const correct = qr.filter((q) => q.isCorrect).length;
  const wrong = qr.filter((q) => !q.isCorrect && !q.isSkipped).length;
  const skipped = qr.filter((q) => q.isSkipped).length;
  const isPending = attempt.writingPending && !band;
  const isIP = attempt.status === "in_progress";

  const [qFilter, setQFilter] = useState("all");

  const filteredQR = qr.filter((q) =>
    qFilter === "all"
      ? true
      : qFilter === "correct"
        ? q.isCorrect
        : qFilter === "wrong"
          ? !q.isCorrect && !q.isSkipped
          : q.isSkipped,
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col"
        style={{ maxHeight: "92vh" }}>
        <div className="flex items-start justify-between px-5 pt-5 pb-3 shrink-0 border-b border-slate-100">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <TypePill type={attempt.testType} />
              {isIP && (
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  In Progress
                </span>
              )}
            </div>
            <p className="text-sm font-black text-slate-800 truncate">
              {attempt.testTitle}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {fmtDate(attempt.submittedAt || attempt.startedAt)}
              {attempt.timeSpent ? ` · ${fmtTime(attempt.timeSpent)}` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors text-lg leading-none ml-3 shrink-0">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {!isIP && (
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4">
              {isPending ? (
                <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-200 flex flex-col items-center justify-center shrink-0">
                  <span className="text-2xl">✍️</span>
                  <span className="text-[9px] font-bold text-amber-600 mt-0.5">
                    Pending
                  </span>
                </div>
              ) : band ? (
                <div className="relative w-20 h-20 shrink-0">
                  <Ring value={band} max={9} size={80} stroke={8} color={bc} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black leading-none" style={{ color: bc }}>
                      {band}
                    </span>
                    <span className="text-[8px] text-slate-400 font-bold">Band</span>
                  </div>
                </div>
              ) : null}

              <div className="flex-1">
                {attempt.score !== undefined && attempt.totalQuestions && (
                  <>
                    <p className="text-2xl font-black text-slate-900 leading-none">
                      {attempt.score}
                      <span className="text-base text-slate-400">
                        /{attempt.totalQuestions}
                      </span>
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">{comp}% accuracy</p>
                    <div className="mt-2"><Bar pct={comp} color={bc} /></div>
                  </>
                )}
                {band && (
                  <p className="text-xs font-bold mt-1.5" style={{ color: bc }}>
                    {bandLabel(band)} User
                  </p>
                )}
                {isPending && (
                  <p className="text-xs text-amber-700 font-medium">
                    Writing score pending — check back soon
                  </p>
                )}
              </div>
            </div>
          )}

          {(attempt.sectionScores?.length ?? 0) > 0 && (
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                {attempt.testType === "listening" ? "Part" : "Passage"} Breakdown
              </p>
              <div className="space-y-2">
                {attempt.sectionScores.map((s) => {
                  const p = s.total > 0 ? (s.correct / s.total) * 100 : 0;
                  const col = p >= 70 ? "#10B981" : p >= 50 ? "#F59E0B" : "#EF4444";
                  return (
                    <div key={s.sectionNumber} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-500 w-20 shrink-0">
                        {attempt.testType === "listening" ? "Part" : "Passage"} {s.sectionNumber}
                      </span>
                      <div className="flex-1"><Bar pct={p} color={col} /></div>
                      <span className="text-xs font-bold w-12 text-right shrink-0" style={{ color: col }}>
                        {s.correct}/{s.total}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {qr.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questions</p>
                <div className="flex gap-1 ml-auto">
                  {[
                    { key: "all", label: `All (${qr.length})` },
                    { key: "correct", label: `✓ ${correct}` },
                    { key: "wrong", label: `✗ ${wrong}` },
                    { key: "skipped", label: `– ${skipped}` },
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setQFilter(f.key)}
                      className="text-[10px] font-bold px-2 py-1 rounded-lg transition-all"
                      style={
                        qFilter === f.key
                          ? { background: C.grad, color: "white" }
                          : { background: "#F8FAFC", color: "#94A3B8" }
                      }>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5 max-h-52 overflow-y-auto">
                {filteredQR.length === 0 && (
                  <p className="text-xs text-center text-slate-400 py-4">None</p>
                )}
                {filteredQR.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs"
                    style={
                      q.isCorrect
                        ? { background: "#F0FDF4", border: "1px solid #BBF7D0" }
                        : q.isSkipped
                          ? { background: "#F9FAFB", border: "1px solid #E5E7EB" }
                          : { background: "#FFF5F5", border: "1px solid #FECACA" }
                    }>
                    <div
                      className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-white text-[9px] font-black"
                      style={{
                        background: q.isCorrect ? "#10B981" : q.isSkipped ? "#9CA3AF" : "#EF4444",
                      }}>
                      {q.isCorrect ? "✓" : q.isSkipped ? "–" : "✗"}
                    </div>
                    <span className="font-black text-slate-500">Q{q.questionNumber}</span>
                    {q.userAnswer ? (
                      <span className={`font-semibold ${q.isCorrect ? "text-green-700" : "line-through text-red-400"}`}>
                        {q.userAnswer}
                      </span>
                    ) : (
                      <span className="text-slate-300 italic">blank</span>
                    )}
                    {!q.isCorrect && q.correctAnswer && (
                      <span className="text-green-600 font-bold ml-auto">✓ {q.correctAnswer}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex gap-3 shrink-0">
          {isIP ? (
            <button
              onClick={onContinue}
              className="flex-1 py-3 rounded-2xl text-white text-sm font-bold hover:opacity-90 transition-all"
              style={{ background: C.gradAmber }}>
              Continue Test →
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                Close
              </button>
              <button
                onClick={onRetry}
                className="flex-1 py-3 rounded-2xl text-white text-sm font-bold hover:opacity-90 transition-all"
                style={{ background: C.grad }}>
                Try Another
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectStats);
  const allAttempts = useAppSelector((s) => s.attempts.list);
  const loading = useAppSelector(selectAttemptsLoading);
  const error = useAppSelector(selectAttemptsError);
  const user = useAppSelector((state) => state.auth.user);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [viewAttempt, setViewAttempt] = useState(null);

  // Fetch attempts when user is loaded
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserAttempts(user._id));
    }
  }, [dispatch, user?._id]);

  // Filter + sort
  const displayed = useMemo(() => {
    let list = [...allAttempts];
    if (filter === "in_progress")
      list = list.filter((a) => a.status === "in_progress");
    else if (filter !== "all")
      list = list.filter(
        (a) => a.testType === filter && a.status === "submitted",
      );
    else list = list.filter((a) => a.status === "submitted");

    if (sortBy === "date")
      list.sort(
        (a, b) =>
          new Date(b.submittedAt || b.startedAt).getTime() -
          new Date(a.submittedAt || a.startedAt).getTime(),
      );
    if (sortBy === "band") list.sort((a, b) => (b.overallBand || b.band || 0) - (a.overallBand || a.band || 0));
    if (sortBy === "type")
      list.sort((a, b) => a.testType.localeCompare(b.testType));
    return list;
  }, [allAttempts, filter, sortBy]);

  const submitted = allAttempts.filter((a) => a.status === "submitted");
  const inProgress = allAttempts.filter((a) => a.status === "in_progress");

  const FILTERS = [
    { key: "all", label: "All", count: submitted.length },
    { key: "listening", label: "Listening", count: stats.listening },
    { key: "reading", label: "Reading", count: stats.reading },
    { key: "writing", label: "Writing", count: stats.writing },
    {
      key: "full",
      label: "Full",
      count: allAttempts.filter(
        (a) => a.testType === "full" && a.status === "submitted",
      ).length,
    },
    { key: "in_progress", label: "In Progress", count: inProgress.length },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  // Loading state
  if (loading && allAttempts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent" />
      </div>
    );
  }

  // Error state
  if (error && allAttempts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load attempts: {error}</p>
          <button
            onClick={() => user?._id && dispatch(fetchUserAttempts(user._id))}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <UserRoute>
      <div
        className="min-h-screen bg-slate-50"
        style={{
          fontFamily: "'Plus Jakarta Sans','DM Sans',ui-sans-serif,sans-serif",
        }}>
        <nav className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs"
                style={{ background: C.grad }}>
                I
              </div>
              <span className="font-black text-slate-900 text-base tracking-tight">
                ILTSMILL
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/ilts-test"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:border-red-400 hover:text-red-500 transition-all">
                📝 Practice
              </a>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                  style={{ background: C.grad }}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {user?.name || "Student"}
                  </p>
                  <p className="text-[10px] text-slate-400">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50">
                Logout
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Hello, {user?.name?.split(" ")[0] || "Student"} 👋
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Track your IELTS preparation progress below
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <StatCard
              label="Tests Completed"
              value={stats.total}
              sub={`${inProgress.length} in progress`}
              icon="✅"
              grad={C.grad}
            />
            <StatCard
              label="Best Band"
              value={stats.bestBand ?? "–"}
              sub={bandLabel(stats.bestBand)}
              icon="🏆"
              grad={C.gradGreen}
            />
            <StatCard
              label="Avg Band"
              value={stats.avgBand ?? "–"}
              sub="across all tests"
              icon="📊"
              grad={C.gradBlue}
            />
            <StatCard
              label="Time Spent"
              value={fmtTime(stats.totalTimeSpent || 0)}
              sub="total practice"
              icon="⏱"
              grad={C.gradAmber}
            />
          </div>

          {submitted.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <OverallRing avgBand={stats.avgBand} />
              <TypeProgress attempts={allAttempts} />
              <BandSparkline attempts={submitted} />
            </div>
          )}

          {inProgress.length > 0 && (
            <div className="mb-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center text-lg shrink-0">
                  ⏳
                </span>
                <div>
                  <p className="text-sm font-bold text-amber-800">
                    {inProgress.length} test{inProgress.length > 1 ? "s" : ""} in progress
                  </p>
                  <p className="text-xs text-amber-600">{inProgress[0].testTitle}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  router.push(
                    `/practice/${inProgress[0].testType}/${inProgress[0].testId}`,
                  )
                }
                className="text-xs font-black text-white px-4 py-2 rounded-xl shrink-0"
                style={{ background: C.gradAmber }}>
                Continue →
              </button>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <h2 className="text-sm font-black text-slate-800">Test History</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {submitted.length} tests completed
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium hidden sm:block">Sort:</span>
                {["date", "band", "type"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className="text-xs font-bold px-2.5 py-1.5 rounded-lg capitalize transition-all"
                    style={
                      sortBy === s
                        ? { background: C.grad, color: "white" }
                        : { background: "#F8FAFC", color: "#94A3B8" }
                    }>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 py-2.5 border-b border-slate-100 overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all"
                    style={
                      filter === f.key
                        ? { background: C.grad, color: "white" }
                        : { background: "#F8FAFC", color: "#64748B" }
                    }>
                    {f.label}
                    {f.count > 0 && (
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                          filter === f.key
                            ? "bg-white/30 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}>
                        {f.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4">
              {displayed.length === 0 ? (
                <EmptyState type={filter} />
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {displayed.map((attempt) => (
                    <AttemptCard
                      key={attempt._id || attempt.attemptId}
                      attempt={attempt}
                      onView={() => setViewAttempt(attempt)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {submitted.length === 0 && inProgress.length === 0 && (
            <div
              className="mt-6 rounded-3xl p-8 sm:p-10 text-center"
              style={{ background: C.grad }}>
              <p className="text-2xl font-black text-white mb-2">Ready to start?</p>
              <p className="text-white/80 text-sm mb-6">
                Take your first IELTS practice test and track your progress here
              </p>
              <button
                onClick={() => router.push("/ilts-test")}
                className="bg-white font-black px-8 py-3.5 rounded-full text-sm hover:scale-105 hover:shadow-xl transition-all"
                style={{ color: C.primary }}>
                Browse Tests →
              </button>
            </div>
          )}
        </div>

        {viewAttempt && (
          <AttemptDetailModal
            attempt={viewAttempt}
            onClose={() => setViewAttempt(null)}
            onRetry={() => {
              setViewAttempt(null);
              router.push(`/ilts-test?type=${viewAttempt.testType}`);
            }}
            onContinue={() => {
              setViewAttempt(null);
              router.push(
                `/practice/${viewAttempt.testType}/${viewAttempt.testId || viewAttempt._id}`,
              );
            }}
          />
        )}
      </div>
    </UserRoute>
  );
}