"use client";

// pages/self-practice/writing/[id].jsx
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { selfPracticeById } from "../../../../action/student";

const WORD_GOAL = 250;

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
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
const EyeIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const ClockIcon = () => (
  <svg
    width="14"
    height="14"
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WritingDetail() {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [essay, setEssay] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [activeTab, setActiveTab] = useState("write"); // write | criteria | model
  const timerRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await selfPracticeById({ id, type: "writing" });
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

  const wc = countWords(essay);
  const pct = Math.min((wc / WORD_GOAL) * 100, 100);
  const timePct =
    timeLeft !== null && data ? (timeLeft / (data.time * 60)) * 100 : 100;

  if (loading)
    return (
      <div className="wd-root">
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading task…</p>
        </div>
      </div>
    );

  return (
    <div className="wd-root">
      {/* Top bar */}
      <div className="wd-topbar">
        <Link href="/self-practice" className="back-link">
          <ChevronLeft /> Back to Practice
        </Link>
        <div className="wd-meta">
          <span className="wd-level-badge">{data.level}</span>
          <span className="wd-title-top">{data.title}</span>
        </div>
        <div className="wd-timer-wrap">
          {!timerActive ? (
            <button
              className="start-timer-btn"
              onClick={() => setTimerActive(true)}>
              ▶ Start Timer
            </button>
          ) : (
            <div className={`wd-timer ${timeLeft < 120 ? "urgent" : ""}`}>
              <ClockIcon /> {formatTime(timeLeft)}
            </div>
          )}
        </div>
      </div>

      <div className="wd-layout">
        {/* Left: Task prompt */}
        <div className="wd-left">
          <div className="prompt-card">
            <div className="prompt-header">
              <span className="prompt-tag">Task Prompt</span>
              <span className="prompt-cat">{data.category}</span>
            </div>
            <p className="prompt-text">{data.prompt}</p>
            <div className="prompt-footer">
              <span>
                <ClockIcon /> {data.time} minutes
              </span>
              <span>✍️ Minimum {data.minWords} words</span>
            </div>
          </div>

          {activeTab === "criteria" && (
            <div className="criteria-card">
              <h3 className="criteria-title">Band Score Criteria</h3>
              <div className="criteria-list">
                {data.criteria.map((c, i) => (
                  <div key={i} className="criterion">
                    <div className="criterion-top">
                      <span className="criterion-label">{c.label}</span>
                      <span className="criterion-weight">{c.weight}</span>
                    </div>
                    <p className="criterion-desc">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "model" && (
            <div className="model-card">
              <div className="model-header">
                <h3 className="model-title">Model Answer</h3>
                <span className="model-band">Band 8.0+</span>
              </div>
              <p className="model-text">{data.modelAnswer}</p>
              <p className="model-wc">{countWords(data.modelAnswer)} words</p>
            </div>
          )}
        </div>

        {/* Right: Editor */}
        <div className="wd-right">
          <div className="editor-card">
            <div className="editor-header">
              <div className="editor-title-row">
                <h2 className="editor-title">Your Essay</h2>
                <div
                  className="wc-badge"
                  style={{
                    background: wc >= WORD_GOAL ? "#F0FDF4" : "#FFF7ED",
                    color: wc >= WORD_GOAL ? "#15803D" : "#C2410C",
                    border: `1px solid ${wc >= WORD_GOAL ? "#BBF7D0" : "#FED7AA"}`,
                  }}>
                  {wc} / {WORD_GOAL}+ words
                </div>
              </div>

              {/* Word count progress */}
              <div className="wc-bar-wrap">
                <div className="wc-bar">
                  <div
                    className="wc-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: wc >= WORD_GOAL ? "#22C55E" : "#F59E0B",
                    }}
                  />
                </div>
                <span className="wc-pct">{Math.round(pct)}%</span>
              </div>
            </div>

            {!submitted ? (
              <textarea
                className="essay-textarea"
                placeholder="Begin writing your essay here. Introduce the topic, discuss both perspectives, and conclude with your own opinion…"
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                spellCheck
              />
            ) : (
              <div className="essay-submitted">
                <div className="submitted-banner">
                  <span className="submitted-icon">✅</span>
                  <div>
                    <p className="submitted-title">Essay Submitted</p>
                    <p className="submitted-sub">
                      Your response has been saved for review.
                    </p>
                  </div>
                </div>
                <div className="essay-preview">{essay}</div>
              </div>
            )}

            <div className="editor-footer">
              <div className="footer-stats">
                <span>{wc} words</span>
                <span>
                  {essay.split(/[.!?]+/).filter(Boolean).length} sentences
                </span>
                <span>
                  {essay.split(/\n\n+/).filter(Boolean).length || 1} paragraphs
                </span>
              </div>
              {!submitted ? (
                <div className="editor-actions">
                  <button
                    className="clear-btn"
                    onClick={() => setEssay("")}
                    disabled={!essay}>
                    Clear
                  </button>
                  <button
                    className="submit-essay-btn"
                    onClick={() => setSubmitted(true)}
                    disabled={wc < 50}>
                    Submit Essay
                  </button>
                </div>
              ) : (
                <button
                  className="retry-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setEssay("");
                  }}>
                  Edit Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        .wd-root { font-family: 'DM Sans', sans-serif; background: #F8FAFC; min-height: 100vh; }

        /* TOPBAR */
        .wd-topbar { display: flex; align-items: center; justify-content: space-between; background: #fff; border-bottom: 1px solid #E2E8F0; padding: 12px 24px; position: sticky; top: 0; z-index: 50; gap: 12px; flex-wrap: wrap; }
        .back-link { display: flex; align-items: center; gap: 4px; color: #64748B; font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap; }
        .back-link:hover { color: #7E22CE; }
        .wd-meta { display: flex; align-items: center; gap: 10px; flex: 1; justify-content: center; flex-wrap: wrap; }
        .wd-level-badge { background: #FAF5FF; color: #7E22CE; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 100px; border: 1px solid #E9D5FF; }
        .wd-title-top { font-family: 'Lora', serif; font-size: 15px; font-weight: 600; color: #0F172A; }
        .start-timer-btn { background: #7E22CE; color: #fff; border: none; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .wd-timer { display: flex; align-items: center; gap: 6px; font-size: 15px; font-weight: 700; color: #7E22CE; }
        .wd-timer.urgent { color: #EF4444; }

        /* LOADING */
        .loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 16px; color: #64748B; }
        .loading-spinner { width: 40px; height: 40px; border: 3px solid #E2E8F0; border-top-color: #7E22CE; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* LAYOUT */
        .wd-layout { display: grid; grid-template-columns: 380px 1fr; gap: 24px; max-width: 1280px; margin: 0 auto; padding: 28px 24px 60px; }

        /* PROMPT */
        .prompt-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; margin-bottom: 16px; }
        .prompt-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .prompt-tag { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #7E22CE; background: #FAF5FF; padding: 4px 12px; border-radius: 100px; border: 1px solid #E9D5FF; }
        .prompt-cat { font-size: 11px; color: #94A3B8; font-weight: 600; }
        .prompt-text { font-family: 'Lora', serif; font-size: 15px; line-height: 1.8; color: #1E293B; white-space: pre-wrap; margin: 0 0 20px; }
        .prompt-footer { display: flex; gap: 16px; flex-wrap: wrap; }
        .prompt-footer span { display: flex; align-items: center; gap: 5px; font-size: 13px; color: #64748B; font-weight: 500; }

        /* INFO TABS */
        .info-tabs { display: flex; gap: 10px; margin-bottom: 12px; }
        .info-tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; border-radius: 10px; border: 1px solid #E2E8F0; background: #fff; color: #64748B; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
        .info-tab.active { background: #7E22CE; color: #fff; border-color: #7E22CE; }
        .info-tab:hover:not(.active) { border-color: #C4B5FD; color: #7E22CE; }

        /* CRITERIA */
        .criteria-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px; margin-bottom: 16px; }
        .criteria-title { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #0F172A; margin: 0 0 16px; }
        .criteria-list { display: flex; flex-direction: column; gap: 12px; }
        .criterion { padding: 12px; background: #F8FAFC; border-radius: 10px; border-left: 3px solid #7E22CE; }
        .criterion-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .criterion-label { font-size: 13px; font-weight: 600; color: #1E293B; }
        .criterion-weight { font-size: 12px; font-weight: 700; color: #7E22CE; background: #FAF5FF; padding: 2px 8px; border-radius: 100px; }
        .criterion-desc { font-size: 12px; color: #64748B; margin: 0; line-height: 1.5; }

        /* MODEL */
        .model-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px; }
        .model-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .model-title { font-family: 'Lora', serif; font-size: 16px; font-weight: 600; color: #0F172A; margin: 0; }
        .model-band { font-size: 12px; font-weight: 700; color: #15803D; background: #F0FDF4; padding: 3px 10px; border-radius: 100px; border: 1px solid #BBF7D0; }
        .model-text { font-family: 'Lora', serif; font-size: 14px; line-height: 1.85; color: #374151; white-space: pre-wrap; margin: 0 0 12px; }
        .model-wc { font-size: 12px; color: #94A3B8; margin: 0; }

        /* EDITOR */
        .editor-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; min-height: 600px; }
        .editor-header { padding: 20px 24px 16px; border-bottom: 1px solid #F1F5F9; }
        .editor-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .editor-title { font-family: 'Lora', serif; font-size: 18px; font-weight: 600; color: #0F172A; margin: 0; }
        .wc-badge { font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 100px; }

        .wc-bar-wrap { display: flex; align-items: center; gap: 10px; }
        .wc-bar { flex: 1; height: 6px; background: #E2E8F0; border-radius: 100px; overflow: hidden; }
        .wc-bar-fill { height: 100%; border-radius: 100px; transition: width 0.3s ease; }
        .wc-pct { font-size: 12px; color: #64748B; font-weight: 600; min-width: 36px; text-align: right; }

        .essay-textarea {
          flex: 1; border: none; outline: none; resize: none;
          padding: 20px 24px;
          font-family: 'Lora', serif;
          font-size: 15.5px; line-height: 1.85;
          color: #1E293B;
          min-height: 480px;
          background: #FAFBFC;
        }
        .essay-textarea::placeholder { color: #94A3B8; }

        .essay-submitted { flex: 1; display: flex; flex-direction: column; }
        .submitted-banner { display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: #F0FDF4; border-bottom: 1px solid #BBF7D0; }
        .submitted-icon { font-size: 20px; }
        .submitted-title { font-weight: 600; color: #15803D; margin: 0 0 2px; font-size: 14px; }
        .submitted-sub { color: #64748B; font-size: 13px; margin: 0; }
        .essay-preview { padding: 20px 24px; font-family: 'Lora', serif; font-size: 15.5px; line-height: 1.85; color: #1E293B; white-space: pre-wrap; flex: 1; background: #FAFBFC; }

        .editor-footer { padding: 16px 24px; border-top: 1px solid #F1F5F9; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-stats { display: flex; gap: 16px; flex-wrap: wrap; }
        .footer-stats span { font-size: 13px; color: #94A3B8; font-weight: 500; }
        .editor-actions { display: flex; gap: 10px; }
        .clear-btn { padding: 10px 18px; border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; color: #64748B; font-size: 13px; font-weight: 600; cursor: pointer; }
        .clear-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .clear-btn:not(:disabled):hover { border-color: #EF4444; color: #EF4444; }
        .submit-essay-btn { padding: 10px 24px; border: none; border-radius: 8px; background: #7E22CE; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; }
        .submit-essay-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .submit-essay-btn:not(:disabled):hover { background: #6B21A8; }
        .retry-btn { padding: 10px 20px; border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; color: #374151; font-size: 13px; font-weight: 600; cursor: pointer; }
        .retry-btn:hover { border-color: #7E22CE; color: #7E22CE; }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .wd-layout { grid-template-columns: 1fr; }
          .wd-meta { display: none; }
        }
        @media (max-width: 600px) {
          .wd-topbar { padding: 10px 16px; }
          .wd-layout { padding: 16px 12px 60px; gap: 16px; }
          .essay-textarea { min-height: 320px; font-size: 15px; }
        }
      `}</style>
    </div>
  );
}
