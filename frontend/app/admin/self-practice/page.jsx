"use client";

import { useState, useEffect } from "react";

import {
  adminSelfPracticeCreate,
  adminSelfPracticeUpdate,
  adminSelfPracticeDelete,
} from "../../../action/admin";
import { selfPracticeList } from "../../../action/student";

// ────────────────────────────────────────────────────────────────────────────
// Toast
// ────────────────────────────────────────────────────────────────────────────
const Toast = ({ msg, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-semibold text-white"
      style={{ background: type === "error" ? "#ef4444" : "#10b981" }}>
      <span>{type === "error" ? "⚠️" : "✅"}</span>
      {msg}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        ✕
      </button>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// Practice item row
// ────────────────────────────────────────────────────────────────────────────
const PracticeRow = ({ item, accent, onEdit, onDelete }) => (
  <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0"
      style={{ background: accent }}>
      {item.order ?? "#"}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-800 truncate">
        {item.title}
      </p>
      <p className="text-[11px] text-slate-400">
        {item.category && <span className="mr-2">{item.category}</span>}
        {item.difficulty && <span>{item.difficulty}</span>}
      </p>
    </div>
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        onClick={onEdit}
        className="text-xs px-2.5 py-1.5 rounded-lg border border-blue-200 text-blue-500 hover:bg-blue-50 transition-all font-medium">
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-xs px-2.5 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-all font-medium">
        Delete
      </button>
    </div>
  </div>
);

// ────────────────────────────────────────────────────────────────────────────
// Practice Form (Create / Edit)
// ────────────────────────────────────────────────────────────────────────────
const READING_CATEGORIES = [
  "Academic Reading",
  "General Training",
  "True/False/Not Given",
  "Matching Headings",
  "Multiple Choice",
  "Summary Completion",
  "Short Answer",
];

const WRITING_CATEGORIES = [
  "Task 1 – Academic",
  "Task 1 – General Training",
  "Task 2 – Essay",
  "Task 2 – Opinion",
  "Task 2 – Discussion",
  "Task 2 – Problem/Solution",
  "Task 2 – Advantage/Disadvantage",
];

const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

const Field = ({ label, children, required }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-transparent bg-white placeholder-slate-300";

const PracticeForm = ({ type, initial, onSaved, onCancel }) => {
  const categories =
    type === "reading" ? READING_CATEGORIES : WRITING_CATEGORIES;
  const accent = type === "reading" ? "#10b981" : "#f97316";

  const [form, setForm] = useState({
    title: initial?.title || "",
    category: initial?.category || categories[0],
    difficulty: initial?.difficulty || "Medium",
    passage: initial?.passage || "",
    prompt: initial?.prompt || "",
    wordLimit: initial?.wordLimit || "",
    time: initial?.time || "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title.trim()) return setError("Title is required");
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        wordLimit: form.wordLimit ? Number(form.wordLimit) : undefined,
        time: form.timeLimit ? Number(form.timeLimit) : undefined,
      };
      if (initial?._id) {
        await adminSelfPracticeUpdate({ type, id: initial._id, data: payload });
      } else {
        await adminSelfPracticeCreate({ type, data: payload });
      }
      onSaved();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="rounded-2xl bg-white p-8 space-y-6"
        style={{ border: "1px solid #e5e7eb" }}>
        {/* Basic info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Title" required>
            <input
              className={inputCls}
              style={{ "--tw-ring-color": accent }}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder={`e.g. ${type === "reading" ? "Academic Reading Practice Set 1" : "Task 2: Opinion Essay"}`}
            />
          </Field>
          <Field label="Category">
            <select
              className={inputCls}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Difficulty">
            <select
              className={inputCls}
              value={form.difficulty}
              onChange={(e) => set("difficulty", e.target.value)}>
              {DIFFICULTIES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-1 gap-3">
            <Field
              label={type === "reading" ? "Time Limit (min)" : "Word Limit"}>
              <input
                type="number"
                className={inputCls}
                value={type === "reading" ? form.timeLimit : form.wordLimit}
                onChange={(e) =>
                  set(
                    type === "reading" ? "timeLimit" : "wordLimit",
                    e.target.value,
                  )
                }
                placeholder={type === "reading" ? "e.g. 20" : "e.g. 250"}
              />
            </Field>
          </div>
        </div>

        {/* Reading-specific: passage + questions */}
        {type === "reading" && (
          <>
            <Field label="Passage" required>
              <textarea
                className={`${inputCls} resize-y min-h-45`}
                value={form.passage}
                onChange={(e) => set("passage", e.target.value)}
                placeholder="Paste the reading passage here..."
              />
            </Field>
          </>
        )}

        {/* Writing-specific: prompt + sample answer */}
        {type === "writing" && (
          <>
            <Field label="Writing Prompt" required>
              <textarea
                className={`${inputCls} resize-y min-h-35`}
                value={form.prompt}
                onChange={(e) => set("prompt", e.target.value)}
                placeholder="Write the task prompt here. E.g. 'Some people think that...'"
              />
            </Field>
            <Field label="Time Limit (minutes)">
              <input
                type="number"
                className={inputCls}
                value={form.timeLimit}
                onChange={(e) => set("timeLimit", e.target.value)}
                placeholder="e.g. 40"
              />
            </Field>
          </>
        )}
        {error && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            ⚠️ {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={onCancel}
            className="text-sm px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 font-semibold transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="text-sm px-6 py-2.5 rounded-xl text-white font-bold transition-all hover:scale-105 disabled:opacity-60 disabled:scale-100"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            }}>
            {saving ? "Saving…" : initial ? "Save Changes" : "Create Practice"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// Practice List for one type
// ────────────────────────────────────────────────────────────────────────────
const PracticeList = ({ type, accent, onCreateNew, onEdit }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await selfPracticeList(type, page);
        setItems(res.data.data || []);
        setTotal(res.data.pagination?.total || 0);
      } catch {
        setToast({ msg: "Failed to load items", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [type, page, refetch]);

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try {
      const res = await adminSelfPracticeDelete({ type, id: item._id });
      console.log(res);
      setToast({ msg: "Deleted!", type: "success" });
      setRefetch((r) => !r);
    } catch (e) {
      setToast({ msg: e?.response?.data?.message || "Failed", type: "error" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-400">{total} practice items</p>
        <button
          onClick={onCreateNew}
          className="text-xs font-bold px-4 py-2 rounded-xl text-white transition-all hover:scale-105"
          style={{
            background: `linear-gradient(135deg,${accent},${accent}cc)`,
          }}>
          + Add New
        </button>
      </div>

      <div
        className="rounded-2xl bg-white overflow-hidden"
        style={{ border: "1px solid #e5e7eb" }}>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div
              className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: accent, borderTopColor: "transparent" }}
            />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-3">{type === "reading" ? "📖" : "✍️"}</p>
            <p className="text-sm text-slate-400 mb-3">
              No {type} practice items yet.
            </p>
            <button
              onClick={onCreateNew}
              className="text-xs font-bold px-4 py-2 rounded-xl text-white"
              style={{ background: accent }}>
              Create First Item
            </button>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <PracticeRow
                key={item._id}
                item={item}
                accent={accent}
                onEdit={() => onEdit(item)}
                onDelete={() => handleDelete(item)}
              />
            ))}
            {total > 10 && (
              <div className="flex items-center justify-center gap-3 p-4 border-t border-slate-100">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40">
                  ← Prev
                </button>
                <span className="text-xs text-slate-400">Page {page}</span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={items.length < 10}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40">
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// Main Self Practice Page
// ────────────────────────────────────────────────────────────────────────────
const PRACTICE_TYPES = [
  {
    key: "reading",
    label: "Reading Practice",
    icon: "📖",
    accent: "#10b981",
    lightBg: "#f0fdf4",
    desc: "Passages, comprehension questions, vocabulary",
  },
  {
    key: "writing",
    label: "Writing Practice",
    icon: "✍️",
    accent: "#f97316",
    lightBg: "#fff7ed",
    desc: "Task 1 & Task 2 prompts with sample answers",
  },
];

export default function SelfPracticePage() {
  const [activeType, setActiveType] = useState("reading");
  const [view, setView] = useState("list"); // "list" | "form"
  const [editingItem, setEditingItem] = useState(null);

  const typeInfo = PRACTICE_TYPES.find((t) => t.key === activeType);

  const goCreate = () => {
    setEditingItem(null);
    setView("form");
  };

  const goEdit = (item) => {
    setEditingItem(item);
    setView("form");
  };

  const handleSaved = () => {
    setView("list");
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page header ── */}
      <div
        className="px-8 py-7 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
        <div className="flex items-center gap-4">
          {view === "form" && (
            <button
              onClick={() => {
                setView("list");
                setEditingItem(null);
              }}
              className="text-slate-400 hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 18l-6-6 6-6"
                />
              </svg>
            </button>
          )}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5 font-semibold">
              Self Practice
            </p>
            <h1 className="text-xl font-black text-white">
              {view === "form"
                ? `${editingItem ? "Edit" : "New"} ${typeInfo?.label} Item`
                : "Self Practice Management"}
            </h1>
            {view === "list" && (
              <p className="text-sm text-slate-400 mt-0.5">
                Standalone reading passages and writing prompts for independent
                study
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-8 max-w-6xl mx-auto">
        {/* ── Type selector cards (list view) ── */}
        {view === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {PRACTICE_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveType(t.key)}
                className="text-left rounded-2xl p-5 transition-all hover:scale-[1.02]"
                style={
                  activeType === t.key
                    ? {
                        background: t.lightBg,
                        border: `2px solid ${t.accent}`,
                      }
                    : {
                        background: "white",
                        border: "2px solid #e5e7eb",
                      }
                }>
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${t.accent}18` }}>
                    {t.icon}
                  </div>
                  <div>
                    <p
                      className="font-black text-base"
                      style={{
                        color: activeType === t.key ? t.accent : "#1e293b",
                      }}>
                      {t.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                  </div>
                  {activeType === t.key && (
                    <div
                      className="ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: t.accent }}>
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Content ── */}
        {view === "list" ? (
          <div>
            {/* Section title */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                style={{ background: `${typeInfo?.accent}18` }}>
                {typeInfo?.icon}
              </span>
              <div>
                <h2 className="font-black text-slate-900 text-base">
                  {typeInfo?.label}
                </h2>
                <p className="text-xs text-slate-400">{typeInfo?.desc}</p>
              </div>
            </div>
            <PracticeList
              key={activeType}
              type={activeType}
              accent={typeInfo?.accent}
              onCreateNew={goCreate}
              onEdit={goEdit}
            />
          </div>
        ) : (
          <PracticeForm
            type={activeType}
            initial={editingItem}
            onSaved={handleSaved}
            onCancel={() => {
              setView("list");
              setEditingItem(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
