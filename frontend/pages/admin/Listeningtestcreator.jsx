"use client";

/**
 * IELTS Listening Test Creator — Full Rewrite
 * ─────────────────────────────────────────────
 * • All 11 IELTS listening question types
 * • Per-question mark system (default 1 mark each)
 * • Section-level heading/alert blocks for admin callouts
 * • Real test-like preview experience
 * • Part-type presets (common question types per part)
 */

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Label,
  Input,
  Select,
  Toggle,
  Btn,
  StepBar,
  AudioUpload,
  Toast,
} from "../../components/Shared/AdminUi";
import { adminTestCreate, adminTestUpdate } from "../../action/admin";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

export const QUESTION_TYPES = [
  { value: "form_completion",      label: "Form Completion",        icon: "📋" },
  { value: "note_completion",      label: "Note Completion",        icon: "📝" },
  { value: "table_completion",     label: "Table Completion",       icon: "🗂️" },
  { value: "flow_chart",           label: "Flow-chart Completion",  icon: "🔄" },
  { value: "summary_completion",   label: "Summary Completion",     icon: "📄" },
  { value: "sentence_completion",  label: "Sentence Completion",    icon: "✏️" },
  { value: "short_answer",         label: "Short-Answer Questions", icon: "💬" },
  { value: "mcq_single",           label: "MCQ (Single Answer)",    icon: "🔘" },
  { value: "mcq_multiple",         label: "MCQ (Multiple Answers)", icon: "☑️" },
  { value: "matching",             label: "Matching Information",   icon: "🔗" },
  { value: "plan_map_diagram",     label: "Plan/Map/Diagram Label", icon: "🗺️" },
];

// Common question types per part based on real IELTS patterns
const PART_PRESETS = {
  1: ["form_completion", "note_completion", "table_completion"],
  2: ["mcq_single", "matching", "plan_map_diagram", "note_completion"],
  3: ["mcq_single", "mcq_multiple", "matching", "sentence_completion"],
  4: ["note_completion", "summary_completion", "flow_chart", "table_completion"],
};

const STEPS = ["Basic Info", "Part 1", "Part 2", "Part 3", "Part 4", "Review & Save"];

// ─────────────────────────────────────────────────────────────────────────────
// FACTORIES
// ─────────────────────────────────────────────────────────────────────────────

const makeQuestion = (num, type = "form_completion") => ({
  questionNumber: num,
  type,
  marks: 1,
  // Completion types
  label: "",
  prefix: "",
  suffix: "",
  answer: "",
  // MCQ
  questionText: "",
  options: [
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
  ],
  correctOptions: [],
  // Matching
  matchItem: "",
  matchOptions: [],
  // Map/Plan/Diagram
  locationLabel: "",
  imageUrl: "",
});

const makeQuestionGroup = (partNum, type = null) => {
  const defaultType = type || PART_PRESETS[partNum]?.[0] || "form_completion";
  const from = (partNum - 1) * 10 + 1;
  const to = partNum * 10;
  return {
    id: Date.now() + Math.random(),
    type: defaultType,
    heading: `Questions ${from}–${to}`,
    instruction: getDefaultInstruction(defaultType),
    boldInstruction: "",
    // For visual types
    imageUrl: "",
    imageCaption: "",
    // For table type
    tableTitle: "",
    tableHeaders: ["Column 1", "Column 2"],
    // For flow chart
    flowTitle: "",
    // For matching
    matchPrompt: "",
    matchOptions: [{ label: "A", text: "" }],
    // For MCQ multiple – how many to choose
    chooseCount: 2,
    questions: Array.from({ length: 10 }, (_, i) => makeQuestion(from + i, defaultType)),
  };
};

const makeSection = (partNum) => ({
  partNumber: partNum,
  title: `Part ${partNum}`,
  instruction: `Listen and answer questions ${(partNum - 1) * 10 + 1}–${partNum * 10}.`,
  questionRange: { from: (partNum - 1) * 10 + 1, to: partNum * 10 },
  audioUrl: "",
  // Section-level callout blocks (admin notes/alerts shown to students)
  alerts: [],
  questionGroups: [makeQuestionGroup(partNum)],
});

function getDefaultInstruction(type) {
  const map = {
    form_completion:     "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    note_completion:     "Complete the notes below. Write ONE WORD ONLY for each answer.",
    table_completion:    "Complete the table below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    flow_chart:          "Complete the flow-chart below. Write NO MORE THAN TWO WORDS for each answer.",
    summary_completion:  "Complete the summary below. Write NO MORE THAN TWO WORDS for each answer.",
    sentence_completion: "Complete the sentences below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    short_answer:        "Answer the questions below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.",
    mcq_single:          "Choose the correct letter, A, B or C.",
    mcq_multiple:        "Choose TWO letters, A–E.",
    matching:            "What does the speaker say about each item? Choose the correct letter, A–H.",
    plan_map_diagram:    "Label the plan/map/diagram below. Write the correct letter, A–H, next to questions.",
  };
  return map[type] || "";
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI ATOMS
// ─────────────────────────────────────────────────────────────────────────────

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue:   "bg-blue-50 text-blue-700 border border-blue-200",
    green:  "bg-green-50 text-green-700 border border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    red:    "bg-red-50 text-red-700 border border-red-200",
    gray:   "bg-slate-100 text-slate-600 border border-slate-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${colors[color]}`}>
      {children}
    </span>
  );
};

const SectionDivider = ({ label }) => (
  <div className="flex items-center gap-3 my-4">
    <div className="h-px flex-1 bg-slate-200" />
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
    <div className="h-px flex-1 bg-slate-200" />
  </div>
);

const MarksInput = ({ value, onChange }) => (
  <div className="flex items-center gap-1.5">
    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Marks:</span>
    <input
      type="number"
      min={0}
      max={5}
      value={value}
      onChange={(e) => onChange(Number(e.target.value) || 1)}
      className="w-12 text-center text-xs font-bold border border-slate-300 rounded-lg px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
    />
  </div>
);

const MarksBadge = ({ marks }) => (
  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
    ⭐ {marks} {marks === 1 ? "mark" : "marks"}
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// ALERT / CALLOUT BLOCK EDITOR
// ─────────────────────────────────────────────────────────────────────────────

const ALERT_TYPES = [
  { value: "info",    label: "ℹ️ Info",    bg: "bg-blue-50 border-blue-200 text-blue-800" },
  { value: "warning", label: "⚠️ Warning", bg: "bg-yellow-50 border-yellow-200 text-yellow-800" },
  { value: "tip",     label: "💡 Tip",     bg: "bg-green-50 border-green-200 text-green-800" },
  { value: "important", label: "🔴 Important", bg: "bg-red-50 border-red-200 text-red-800" },
];

const alertStyle = (type) =>
  ALERT_TYPES.find((a) => a.value === type)?.bg || "bg-slate-50 border-slate-200 text-slate-700";

const AlertsEditor = ({ alerts, onChange }) => {
  const add = () =>
    onChange([...alerts, { id: Date.now(), type: "info", heading: "", body: "" }]);
  const update = (id, field, val) =>
    onChange(alerts.map((a) => (a.id === id ? { ...a, [field]: val } : a)));
  const remove = (id) => onChange(alerts.filter((a) => a.id !== id));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">📢 Section Callout Blocks</span>
        <button
          onClick={add}
          className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          + Add Callout
        </button>
      </div>
      <p className="text-[11px] text-slate-400">
        Add important notes, instructions, or warnings shown to students at the top of this part.
      </p>
      {alerts.map((alert) => (
        <div key={alert.id} className={`rounded-xl border p-4 space-y-2 ${alertStyle(alert.type)}`}>
          <div className="flex items-center justify-between gap-2">
            <select
              value={alert.type}
              onChange={(e) => update(alert.id, "type", e.target.value)}
              className="text-xs font-semibold rounded-lg border border-current/20 bg-white/60 px-2 py-1 focus:outline-none"
            >
              {ALERT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <button
              onClick={() => remove(alert.id)}
              className="text-xs text-red-500 hover:text-red-700 font-semibold"
            >
              ✕ Remove
            </button>
          </div>
          <input
            value={alert.heading}
            onChange={(e) => update(alert.id, "heading", e.target.value)}
            placeholder="Heading (optional)"
            className="w-full text-sm font-bold bg-white/60 border border-current/20 rounded-lg px-3 py-1.5 focus:outline-none"
          />
          <textarea
            value={alert.body}
            onChange={(e) => update(alert.id, "body", e.target.value)}
            placeholder="Write the callout message for students..."
            rows={2}
            className="w-full text-xs bg-white/60 border border-current/20 rounded-lg px-3 py-1.5 focus:outline-none resize-none"
          />
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION TYPE EDITORS
// ─────────────────────────────────────────────────────────────────────────────

/** Completion types: form, note, sentence, short answer, summary, flow, table */
const CompletionQuestionEditor = ({ q, onChange, showImageField = false }) => (
  <div className="grid grid-cols-12 gap-2 items-start">
    <div className="col-span-1 flex flex-col items-center gap-1 pt-2">
      <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-black text-slate-600">
        {q.questionNumber}
      </span>
      <MarksInput value={q.marks} onChange={(v) => onChange({ ...q, marks: v })} />
    </div>
    <div className="col-span-4">
      <input
        value={q.prefix || ""}
        onChange={(e) => onChange({ ...q, prefix: e.target.value })}
        placeholder="Text before blank (e.g. Name:)"
        className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
    <div className="col-span-3">
      <div className="flex items-center justify-center border-2 border-dashed border-blue-300 rounded-lg h-8 bg-blue-50">
        <span className="text-[10px] text-blue-400 font-semibold">___ BLANK ___</span>
      </div>
    </div>
    <div className="col-span-4">
      <input
        value={q.suffix || ""}
        onChange={(e) => onChange({ ...q, suffix: e.target.value })}
        placeholder="Text after blank (optional)"
        className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
    <div className="col-span-1" />
    <div className="col-span-11">
      <div className="flex gap-2">
        <input
          value={q.answer || ""}
          onChange={(e) => onChange({ ...q, answer: e.target.value })}
          placeholder="✅ Correct answer"
          className="flex-1 text-xs border border-green-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50"
        />
        {showImageField && (
          <input
            value={q.imageUrl || ""}
            onChange={(e) => onChange({ ...q, imageUrl: e.target.value })}
            placeholder="Image URL (if needed)"
            className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5"
          />
        )}
      </div>
    </div>
  </div>
);

/** MCQ Single */
const MCQSingleEditor = ({ q, onChange }) => {
  const updateOption = (i, text) => {
    const opts = [...q.options];
    opts[i] = { ...opts[i], text };
    onChange({ ...q, options: opts });
  };
  const addOption = () => {
    const labels = "ABCDEFGH";
    onChange({
      ...q,
      options: [...q.options, { label: labels[q.options.length] || "?", text: "" }],
    });
  };
  const removeOption = (i) => {
    const opts = q.options.filter((_, idx) => idx !== i);
    onChange({ ...q, options: opts, correctOptions: q.correctOptions.filter((l) => l !== q.options[i].label) });
  };

  return (
    <div className="space-y-2.5 border border-slate-200 rounded-xl p-4 bg-slate-50">
      <div className="flex items-center justify-between">
        <span className="w-7 h-7 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-xs font-black text-blue-700">
          {q.questionNumber}
        </span>
        <MarksInput value={q.marks} onChange={(v) => onChange({ ...q, marks: v })} />
      </div>
      <textarea
        value={q.questionText || ""}
        onChange={(e) => onChange({ ...q, questionText: e.target.value })}
        placeholder="Question stem text…"
        rows={2}
        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white resize-none"
      />
      <div className="space-y-1.5">
        {q.options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <button
              onClick={() => {
                const cur = q.correctOptions || [];
                onChange({
                  ...q,
                  correctOptions: cur.includes(opt.label)
                    ? cur.filter((l) => l !== opt.label)
                    : [opt.label],
                });
              }}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                (q.correctOptions || []).includes(opt.label)
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-slate-300 text-slate-500"
              }`}
            >
              {opt.label}
            </button>
            <input
              value={opt.text}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`Option ${opt.label}`}
              className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            />
            {q.options.length > 2 && (
              <button onClick={() => removeOption(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={addOption} className="text-xs text-blue-600 hover:underline font-semibold">+ Add Option</button>
        <span className="text-[10px] text-slate-400">Click letter to mark correct answer</span>
      </div>
    </div>
  );
};

/** MCQ Multiple */
const MCQMultipleEditor = ({ q, onChange, chooseCount = 2 }) => {
  const updateOption = (i, text) => {
    const opts = [...q.options];
    opts[i] = { ...opts[i], text };
    onChange({ ...q, options: opts });
  };
  const addOption = () => {
    const labels = "ABCDEFGH";
    onChange({ ...q, options: [...q.options, { label: labels[q.options.length] || "?", text: "" }] });
  };
  const toggleCorrect = (label) => {
    const cur = q.correctOptions || [];
    if (cur.includes(label)) {
      onChange({ ...q, correctOptions: cur.filter((l) => l !== label) });
    } else if (cur.length < chooseCount) {
      onChange({ ...q, correctOptions: [...cur, label] });
    }
  };

  return (
    <div className="space-y-2.5 border border-slate-200 rounded-xl p-4 bg-slate-50">
      <div className="flex items-center justify-between">
        <span className="w-7 h-7 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-xs font-black text-purple-700">
          {q.questionNumber}
        </span>
        <MarksInput value={q.marks} onChange={(v) => onChange({ ...q, marks: v })} />
      </div>
      <textarea
        value={q.questionText || ""}
        onChange={(e) => onChange({ ...q, questionText: e.target.value })}
        placeholder="Question stem (optional for MCQ Multiple — usually set at group level)"
        rows={2}
        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white resize-none"
      />
      <div className="space-y-1.5">
        {q.options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <button
              onClick={() => toggleCorrect(opt.label)}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                (q.correctOptions || []).includes(opt.label)
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-slate-300 text-slate-500"
              }`}
            >
              {opt.label}
            </button>
            <input
              value={opt.text}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`Option ${opt.label}`}
              className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none bg-white"
            />
          </div>
        ))}
      </div>
      <button onClick={addOption} className="text-xs text-purple-600 hover:underline font-semibold">+ Add Option</button>
    </div>
  );
};

/** Matching */
const MatchingQuestionEditor = ({ q, onChange, groupMatchOptions = [] }) => (
  <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50">
    <div className="flex items-center justify-between">
      <span className="w-7 h-7 rounded-full bg-orange-100 border border-orange-300 flex items-center justify-center text-xs font-black text-orange-700">
        {q.questionNumber}
      </span>
      <MarksInput value={q.marks} onChange={(v) => onChange({ ...q, marks: v })} />
    </div>
    <input
      value={q.matchItem || ""}
      onChange={(e) => onChange({ ...q, matchItem: e.target.value })}
      placeholder="Item to match (e.g. coastal path)"
      className="w-full text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
    />
    <div className="flex gap-2 items-center">
      <span className="text-xs text-slate-500 shrink-0">Correct match:</span>
      <select
        value={q.answer || ""}
        onChange={(e) => onChange({ ...q, answer: e.target.value })}
        className="flex-1 text-xs border border-green-300 bg-green-50 rounded-lg px-2 py-1.5 focus:outline-none"
      >
        <option value="">— Select —</option>
        {groupMatchOptions.map((opt) => (
          <option key={opt.label} value={opt.label}>{opt.label}. {opt.text}</option>
        ))}
      </select>
    </div>
  </div>
);

/** Map / Plan / Diagram */
const MapDiagramEditor = ({ q, onChange }) => (
  <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50">
    <div className="flex items-center justify-between">
      <span className="w-7 h-7 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center text-xs font-black text-teal-700">
        {q.questionNumber}
      </span>
      <MarksInput value={q.marks} onChange={(v) => onChange({ ...q, marks: v })} />
    </div>
    <input
      value={q.locationLabel || ""}
      onChange={(e) => onChange({ ...q, locationLabel: e.target.value })}
      placeholder="Location/label in diagram (e.g. 'the café', 'Part A')"
      className="w-full text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-300 bg-white"
    />
    <input
      value={q.answer || ""}
      onChange={(e) => onChange({ ...q, answer: e.target.value })}
      placeholder="✅ Correct answer (e.g. letter or word)"
      className="w-full text-xs border border-green-300 bg-green-50 rounded-lg px-3 py-1.5 focus:outline-none"
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION GROUP EDITOR
// ─────────────────────────────────────────────────────────────────────────────

const QuestionGroupEditor = ({ group, partNum, onChange, onRemove, groupIndex, totalGroups }) => {
  const typeInfo = QUESTION_TYPES.find((t) => t.value === group.type);

  const updateQuestion = (i, q) => {
    const qs = [...group.questions];
    qs[i] = q;
    onChange({ ...group, questions: qs });
  };

  const addMatchOption = () =>
    onChange({
      ...group,
      matchOptions: [
        ...group.matchOptions,
        { label: String.fromCharCode(65 + group.matchOptions.length), text: "" },
      ],
    });

  const updateMatchOption = (i, text) => {
    const opts = [...group.matchOptions];
    opts[i] = { ...opts[i], text };
    onChange({ ...group, matchOptions: opts });
  };

  const changeType = (newType) => {
    const updatedQs = group.questions.map((q) => ({
      ...makeQuestion(q.questionNumber, newType),
      marks: q.marks,
    }));
    onChange({
      ...group,
      type: newType,
      instruction: getDefaultInstruction(newType),
      questions: updatedQs,
    });
  };

  const totalMarks = group.questions.reduce((s, q) => s + (q.marks || 1), 0);
  const isVisual = ["plan_map_diagram"].includes(group.type);
  const isMatching = group.type === "matching";
  const isMCQMulti = group.type === "mcq_multiple";
  const isMCQSingle = group.type === "mcq_single";
  const isCompletion = !isMCQSingle && !isMCQMulti && !isMatching && !isVisual;

  return (
    <div className="border-2 border-slate-200 rounded-2xl bg-white overflow-hidden">
      {/* Group header */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-slate-800 to-slate-700">
        <span className="text-lg">{typeInfo?.icon}</span>
        <div className="flex-1 min-w-0">
          <input
            value={group.heading}
            onChange={(e) => onChange({ ...group, heading: e.target.value })}
            className="text-sm font-bold text-white bg-transparent border-0 focus:outline-none w-full placeholder:text-slate-400"
            placeholder="Group heading (e.g. Questions 1–5)"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-amber-400/20 border border-amber-400/40 text-amber-300 rounded-md px-2 py-0.5 font-bold">
            ⭐ {totalMarks} marks
          </span>
          {totalGroups > 1 && (
            <button
              onClick={onRemove}
              className="text-xs text-red-400 hover:text-red-200 font-semibold px-2 py-1 rounded-lg border border-red-400/30 hover:bg-red-400/10 transition-all"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Type selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {QUESTION_TYPES.map((qt) => {
            const isPreset = PART_PRESETS[partNum]?.includes(qt.value);
            return (
              <button
                key={qt.value}
                onClick={() => changeType(qt.value)}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-semibold border transition-all text-left ${
                  group.type === qt.value
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
                }`}
              >
                <span>{qt.icon}</span>
                <span className="leading-tight">{qt.label}</span>
                {isPreset && group.type !== qt.value && (
                  <span className="ml-auto text-[9px] text-green-600 font-bold">★</span>
                )}
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-slate-400">★ = Common in this part</p>

        {/* Instruction */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
            Group Instruction
          </label>
          <textarea
            value={group.instruction}
            onChange={(e) => onChange({ ...group, instruction: e.target.value })}
            rows={2}
            className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          />
        </div>

        {/* Bold instruction (optional) */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
            Bold/Highlighted Part of Instruction (optional)
          </label>
          <input
            value={group.boldInstruction || ""}
            onChange={(e) => onChange({ ...group, boldInstruction: e.target.value })}
            placeholder="e.g. NO MORE THAN TWO WORDS"
            className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Matching options pool */}
        {isMatching && (
          <div className="space-y-2 border border-orange-200 bg-orange-50 rounded-xl p-4">
            <label className="block text-xs font-bold text-orange-700 mb-2">
              Answer Options Pool (students match from these)
            </label>
            <input
              value={group.matchPrompt || ""}
              onChange={(e) => onChange({ ...group, matchPrompt: e.target.value })}
              placeholder="Prompt above options (e.g. 'Choose the correct description, A–H')"
              className="w-full text-xs border border-orange-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none mb-2"
            />
            {group.matchOptions.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-orange-200 text-orange-800 flex items-center justify-center text-[10px] font-black">
                  {opt.label}
                </span>
                <input
                  value={opt.text}
                  onChange={(e) => updateMatchOption(i, e.target.value)}
                  placeholder={`Option ${opt.label} text`}
                  className="flex-1 text-xs border border-orange-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none"
                />
              </div>
            ))}
            <button onClick={addMatchOption} className="text-xs text-orange-600 font-semibold hover:underline">
              + Add Option
            </button>
          </div>
        )}

        {/* Image upload for visual types */}
        {(isVisual || group.type === "plan_map_diagram") && (
          <div className="space-y-2 border border-teal-200 bg-teal-50 rounded-xl p-4">
            <label className="block text-xs font-bold text-teal-700">Map/Plan/Diagram Image</label>
            <input
              value={group.imageUrl || ""}
              onChange={(e) => onChange({ ...group, imageUrl: e.target.value })}
              placeholder="Image URL (upload and paste CDN link)"
              className="w-full text-xs border border-teal-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none"
            />
            <input
              value={group.imageCaption || ""}
              onChange={(e) => onChange({ ...group, imageCaption: e.target.value })}
              placeholder="Image caption / title (e.g. 'Map of the village centre')"
              className="w-full text-xs border border-teal-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none"
            />
            {group.imageUrl && (
              <img src={group.imageUrl} alt="preview" className="rounded-xl border mt-2 max-h-40 object-contain" />
            )}
          </div>
        )}

        {/* MCQ Multiple – choose count */}
        {isMCQMulti && (
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-600">Students must choose:</label>
            <input
              type="number"
              min={2}
              max={5}
              value={group.chooseCount || 2}
              onChange={(e) => onChange({ ...group, chooseCount: Number(e.target.value) })}
              className="w-16 text-center text-sm border border-purple-300 rounded-lg px-1 py-1 focus:outline-none"
            />
            <span className="text-xs text-slate-400">answers</span>
          </div>
        )}

        {/* Table title/headers for table_completion */}
        {group.type === "table_completion" && (
          <div className="space-y-2 border border-slate-200 bg-slate-50 rounded-xl p-4">
            <label className="block text-xs font-bold text-slate-600">Table Title (optional)</label>
            <input
              value={group.tableTitle || ""}
              onChange={(e) => onChange({ ...group, tableTitle: e.target.value })}
              placeholder="e.g. Employee Training Schedule"
              className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white"
            />
            <label className="block text-xs font-bold text-slate-600 mt-2">Column Headers (comma-separated)</label>
            <input
              value={(group.tableHeaders || []).join(", ")}
              onChange={(e) => onChange({ ...group, tableHeaders: e.target.value.split(",").map((h) => h.trim()) })}
              placeholder="e.g. Type, Location, Price"
              className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white"
            />
          </div>
        )}

        <SectionDivider label={`${group.questions.length} Questions`} />

        {/* Questions */}
        <div className="space-y-3">
          {group.questions.map((q, i) => (
            <div key={q.questionNumber}>
              {isCompletion && (
                <CompletionQuestionEditor
                  q={q}
                  onChange={(updated) => updateQuestion(i, updated)}
                  showImageField={false}
                />
              )}
              {isMCQSingle && (
                <MCQSingleEditor q={q} onChange={(updated) => updateQuestion(i, updated)} />
              )}
              {isMCQMulti && (
                <MCQMultipleEditor
                  q={q}
                  onChange={(updated) => updateQuestion(i, updated)}
                  chooseCount={group.chooseCount || 2}
                />
              )}
              {isMatching && (
                <MatchingQuestionEditor
                  q={q}
                  onChange={(updated) => updateQuestion(i, updated)}
                  groupMatchOptions={group.matchOptions || []}
                />
              )}
              {isVisual && (
                <MapDiagramEditor q={q} onChange={(updated) => updateQuestion(i, updated)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION EDITOR (Part 1–4)
// ─────────────────────────────────────────────────────────────────────────────

const SectionEditor = ({ section, onChange }) => {
  const addGroup = () => {
    const existingQNums = section.questionGroups.flatMap((g) => g.questions.map((q) => q.questionNumber));
    const nextQNum = Math.max(...existingQNums, section.questionRange.from - 1) + 1;
    if (nextQNum > section.questionRange.to) {
      alert(`Part ${section.partNumber} already has all ${section.questionRange.to - section.questionRange.from + 1} questions allocated!`);
      return;
    }
    const remaining = section.questionRange.to - nextQNum + 1;
    const count = Math.min(remaining, 5);
    const newGroup = {
      id: Date.now() + Math.random(),
      type: PART_PRESETS[section.partNumber]?.[1] || "mcq_single",
      heading: `Questions ${nextQNum}–${nextQNum + count - 1}`,
      instruction: getDefaultInstruction(PART_PRESETS[section.partNumber]?.[1] || "mcq_single"),
      boldInstruction: "",
      imageUrl: "",
      imageCaption: "",
      tableTitle: "",
      tableHeaders: ["Column 1", "Column 2"],
      flowTitle: "",
      matchPrompt: "",
      matchOptions: [{ label: "A", text: "" }],
      chooseCount: 2,
      questions: Array.from({ length: count }, (_, i) => makeQuestion(nextQNum + i, PART_PRESETS[section.partNumber]?.[1] || "mcq_single")),
    };
    onChange({ ...section, questionGroups: [...section.questionGroups, newGroup] });
  };

  const updateGroup = (i, g) => {
    const gs = [...section.questionGroups];
    gs[i] = g;
    onChange({ ...section, questionGroups: gs });
  };

  const removeGroup = (i) => {
    onChange({ ...section, questionGroups: section.questionGroups.filter((_, idx) => idx !== i) });
  };

  const totalMarks = section.questionGroups
    .flatMap((g) => g.questions)
    .reduce((s, q) => s + (q.marks || 1), 0);

  const totalQuestions = section.questionGroups.flatMap((g) => g.questions).length;

  return (
    <div className="space-y-6">
      {/* Part meta card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-black text-slate-800">Part {section.partNumber} Setup</h2>
            <p className="text-xs text-slate-400">Questions {section.questionRange.from}–{section.questionRange.to}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-amber-50 border border-amber-200 text-amber-700 rounded-full px-3 py-1 font-bold">
              ⭐ {totalMarks} total marks
            </span>
            <span className={`text-xs rounded-full px-3 py-1 font-bold border ${
              totalQuestions === 10
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}>
              {totalQuestions}/10 questions
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Part Title</label>
            <input
              value={section.title}
              onChange={(e) => onChange({ ...section, title: e.target.value })}
              placeholder="e.g. Part 1"
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Top Instruction</label>
            <input
              value={section.instruction}
              onChange={(e) => onChange({ ...section, instruction: e.target.value })}
              placeholder="e.g. Listen and answer questions 1–10."
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="sm:col-span-2">
            <AudioUpload
              value={section.audioUrl}
              onChange={(url) => onChange({ ...section, audioUrl: url })}
              label={`Part ${section.partNumber} Audio *`}
            />
          </div>
        </div>
      </div>

      {/* Alerts / Callouts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <AlertsEditor
          alerts={section.alerts || []}
          onChange={(alerts) => onChange({ ...section, alerts })}
        />
      </div>

      {/* Question Groups */}
      {section.questionGroups.map((group, i) => (
        <QuestionGroupEditor
          key={group.id}
          group={group}
          partNum={section.partNumber}
          groupIndex={i}
          totalGroups={section.questionGroups.length}
          onChange={(g) => updateGroup(i, g)}
          onRemove={() => removeGroup(i)}
        />
      ))}

      {/* Add group button */}
      <button
        onClick={addGroup}
        className="w-full border-2 border-dashed border-slate-300 rounded-2xl py-4 text-sm font-semibold text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
      >
        + Add Question Group
        <span className="block text-[10px] font-normal text-slate-400 mt-0.5">
          Add a second set of questions with a different type (e.g. MCQ after form completion)
        </span>
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW STEP
// ─────────────────────────────────────────────────────────────────────────────

const ReviewStep = ({ form, onGoToStep, onSave, saving, isEditMode }) => {
  const totalMarks = form.sections
    .flatMap((s) => s.questionGroups || [])
    .flatMap((g) => g.questions)
    .reduce((s, q) => s + (q.marks || 1), 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-r from-slate-800 to-slate-700">
        <h2 className="text-base font-black text-white">Review & Save</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {isEditMode ? "Review your changes before saving" : "Check everything before publishing"}
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Series", value: form.seriesId || "—" },
            { label: "Title", value: form.title || "—" },
            { label: "Difficulty", value: form.difficulty },
            { label: "Total Marks", value: `⭐ ${totalMarks}` },
          ].map((x) => (
            <div key={x.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{x.label}</p>
              <p className="text-sm font-black text-slate-800 mt-0.5 truncate">{x.value}</p>
            </div>
          ))}
        </div>

        {/* Parts summary */}
        <div className="space-y-2">
          {form.sections.map((s) => {
            const qs = (s.questionGroups || []).flatMap((g) => g.questions);
            const marks = qs.reduce((acc, q) => acc + (q.marks || 1), 0);
            const types = [...new Set((s.questionGroups || []).map((g) => g.type))];
            return (
              <div key={s.partNumber} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                  {s.partNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800">{s.title}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {types.map((t) => {
                      const info = QUESTION_TYPES.find((qt) => qt.value === t);
                      return (
                        <span key={t} className="text-[9px] font-semibold bg-blue-50 text-blue-600 border border-blue-200 rounded px-1.5 py-0.5">
                          {info?.icon} {info?.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-amber-600">⭐ {marks} marks</p>
                  <p className="text-[10px] text-slate-400">{qs.length} questions</p>
                  <p className={`text-[10px] ${s.audioUrl ? "text-green-600" : "text-red-500"}`}>
                    {s.audioUrl ? "✅ Audio set" : "⚠️ No audio"}
                  </p>
                </div>
                <button onClick={() => onGoToStep(s.partNumber)} className="text-xs text-blue-500 underline shrink-0">
                  Edit
                </button>
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onSave(false)}
            disabled={saving}
            className="flex-1 py-3 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            {saving ? "Saving…" : isEditMode ? "Save Changes" : "Save as Draft"}
          </button>
          <button
            onClick={() => onSave(true)}
            disabled={saving}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
          >
            {saving ? "Saving…" : isEditMode ? "Update & Publish" : "Publish Test"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ListeningTestCreator({ initial, onSaved }) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState(() => {
    if (initial?._id) {
      return {
        _id: initial._id,
        seriesId: initial.seriesId || "",
        testNumber: initial.testNumber || 1,
        title: initial.title || "",
        difficulty: initial.difficulty || "Medium",
        isPublished: initial.isPublished || false,
        isFreeScoring: initial.isFreeScoring || false,
        sections: initial.sections?.length ? initial.sections : [1, 2, 3, 4].map(makeSection),
      };
    }
    return {
      seriesId: "",
      testNumber: 1,
      title: "",
      difficulty: "Medium",
      isPublished: false,
      isFreeScoring: false,
      sections: [1, 2, 3, 4].map(makeSection),
    };
  });

  const updateSection = (i, s) => {
    const next = [...form.sections];
    next[i] = s;
    setForm({ ...form, sections: next });
  };

  const validate = () => {
    if (!form.seriesId.trim()) return "Series ID is required";
    if (!form.title.trim()) return "Title is required";
    return null;
  };

  const save = async (publish = false) => {
    const err = validate();
    if (err) { setToast({ msg: err, type: "error" }); return; }
    setSaving(true);
    try {
      const payload = { ...form, isPublished: publish };
      let res;
      if (form._id) {
        res = await adminTestUpdate("listening", form._id, payload);
        setToast({ msg: `Test updated!${publish ? " (Published)" : " (Draft)"}`, type: "success" });
      } else {
        res = await adminTestCreate("listening", payload);
        setToast({ msg: `Test created!${publish ? " (Published)" : " (Draft)"}`, type: "success" });
      }
      onSaved?.(res.data._id);
    } catch (e) {
      setToast({ msg: e?.response?.data?.message || e?.message || "Something went wrong", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const secIdx = step - 1;
  const isEditMode = !!form._id;

  // Total marks across all sections
  const grandTotalMarks = form.sections
    .flatMap((s) => s.questionGroups || [])
    .flatMap((g) => g.questions)
    .reduce((s, q) => s + (q.marks || 1), 0);

  return (
    <div className="space-y-6">
      {/* Step bar + marks pill */}
      <div className="bg-white rounded-2xl border border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <StepBar steps={STEPS} current={step} />
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700 rounded-full px-3 py-1.5">
          ⭐ {grandTotalMarks} / 40 marks
        </div>
      </div>

      {/* STEP 0: Basic Info */}
      {step === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-800">Basic Information</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEditMode ? "Update test details" : "Set up the test identity and settings"}
            </p>
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-5">
            <div>
              <Label required>Series ID</Label>
              <Input value={form.seriesId} onChange={(v) => setForm({ ...form, seriesId: v })} placeholder="e.g. IELTS-MILL-series-13" />
            </div>
            <div>
              <Label required>Test Number</Label>
              <Input type="number" value={form.testNumber} onChange={(v) => setForm({ ...form, testNumber: parseInt(v) || 1 })} placeholder="e.g. 4" />
            </div>
            <div className="sm:col-span-2">
              <Label required>Test Title</Label>
              <Input value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="e.g. Cambridge IELTS 18 Academic Listening Test 2" />
            </div>
            <div>
              <Label required>Difficulty</Label>
              <Select
                value={form.difficulty}
                onChange={(v) => setForm({ ...form, difficulty: v })}
                options={[
                  { value: "Easy", label: "Easy" },
                  { value: "Medium", label: "Medium" },
                  { value: "Hard", label: "Hard" },
                ]}
              />
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <Toggle checked={form.isFreeScoring} onChange={(v) => setForm({ ...form, isFreeScoring: v })} label="Free Scoring (shown to free-tier students)" />
              <Toggle checked={form.isPublished} onChange={(v) => setForm({ ...form, isPublished: v })} label={isEditMode ? "Currently published" : "Publish immediately"} />
            </div>
          </div>
        </div>
      )}

      {/* STEPS 1–4: Parts */}
      {step >= 1 && step <= 4 && (
        <SectionEditor
          section={form.sections[secIdx]}
          onChange={(s) => updateSection(secIdx, s)}
        />
      )}

      {/* STEP 5: Review */}
      {step === 5 && (
        <ReviewStep
          form={form}
          onGoToStep={setStep}
          onSave={save}
          saving={saving}
          isEditMode={isEditMode}
        />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setStep((p) => Math.max(0, p - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
        >
          ← Previous
        </button>
        {step < STEPS.length - 1 && (
          <button
            onClick={() => setStep((p) => p + 1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
          >
            Next →
          </button>
        )}
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}