"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Label,
  Input,
  Textarea,
  Select,
  Toggle,
  Btn,
  StepBar,
  ImageUpload,
  Toast,
} from "../../components/Shared/AdminUi";
import { QuestionGroupEditor } from "../../pages/admin/Questionbuilder";
import { adminTestCreate, adminTestUpdate } from "../../action/admin";

const makeGroup = (startQ) => ({
  questionBlock: {
    heading: `Questions ${startQ} – ${startQ + 4}`,
    instruction: "Choose the correct letter, A, B or C.",
    boldInstruction: "A, B or C",
  },
  questions: Array.from({ length: 5 }, (_, i) => ({
    questionNumber: startQ + i,
    type: "mcq_single",
    stem: "",
    options: [
      { label: "A", text: "" },
      { label: "B", text: "" },
      { label: "C", text: "" },
    ],
    answer: "",
  })),
});

const makePassage = (n) => {
  const start = (n - 1) * 13 + 1;
  return {
    passageNumber: n,
    title: "",
    subtitle: "",
    bodyText: "",
    wordCount: 0,
    diagramUrl: "",
    questionRange: { from: start, to: start + 12 },
    questionGroups: [makeGroup(start)],
  };
};

const STEPS = [
  "Basic Info",
  "Passage 1",
  "Passage 2",
  "Passage 3",
  "Review & Save",
];

export default function ReadingTestCreator({ initial, onSaved }) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState(() => {
    if (initial?._id) {
      // Edit mode
      return {
        _id: initial._id,
        seriesId: initial.seriesId || "",
        testNumber: initial.testNumber || 1,
        title: initial.title || "",
        testType: initial.testType || "Academic",
        difficulty: initial.difficulty || "Medium",
        isPublished: initial.isPublished || false,
        isFreeScoring: initial.isFreeScoring || false,
        passages: initial.passages || [1, 2, 3].map(makePassage),
      };
    } else {
      // Create mode
      return {
        seriesId: "",
        testNumber: 1,
        title: "",
        testType: "Academic",
        difficulty: "Medium",
        isPublished: false,
        isFreeScoring: false,
        passages: [1, 2, 3].map(makePassage),
      };
    }
  });

  const updatePassage = (i, p) => {
    const next = [...form.passages];
    next[i] = p;
    setForm({ ...form, passages: next });
  };

  // Word count helper
  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const passageIdx = step - 1;
  const passage = form.passages[passageIdx];
  const isEditMode = !!form._id;

  const save = async (publish = false) => {
    setSaving(true);
    try {
      const payload = { ...form, isPublished: publish };
      let res;
      if (form._id) {
        // Update existing test
        res = await adminTestUpdate("reading", form._id, payload);
        setToast({
          msg: `Reading test updated!${publish ? " (Published)" : " (Draft)"}`,
          type: "success",
        });
      } else {
        // Create new test
        res = await adminTestCreate("reading", payload);
        setToast({
          msg: `Reading test created!${publish ? " (Published)" : " (Draft)"}`,
          type: "success",
        });
      }

      onSaved?.(res.data._id);
    } catch (e) {
      const error = e;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      console.error(message);
      setToast({ msg: message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 px-6 py-4">
        <StepBar steps={STEPS} current={step} />
      </div>

      {/* ── STEP 0: Basic Info ── */}
      {step === 0 && (
        <Card>
          <CardHeader
            title="Basic Information"
            subtitle={
              isEditMode
                ? "Update test details"
                : "Set up the test identity and settings"
            }
          />
          <CardBody className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label required>Series ID</Label>
              <Input
                value={form.seriesId}
                onChange={(v) => setForm({ ...form, seriesId: v })}
                placeholder="e.g. iltsmill-series-13"
                // disabled={isEditMode}
              />
              {/* <p className="text-[10px] text-slate-400 mt-1">
                {isEditMode ? "Cannot change series ID" : "Must match an existing series"}
              </p> */}
            </div>
            <div>
              <Label required>Test Number</Label>
              <Input
                type="number"
                value={form.testNumber}
                onChange={(v) =>
                  setForm({ ...form, testNumber: parseInt(v) || 1 })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label required>Test Title</Label>
              <Input
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
                placeholder="e.g. Reading Test - 04"
              />
            </div>
            <div>
              <Label>Test Type</Label>
              <Select
                value={form.testType}
                onChange={(v) => setForm({ ...form, testType: v })}
                options={[
                  { value: "Academic", label: "Academic" },
                  { value: "General", label: "General Training" },
                ]}
              />
            </div>
            <div>
              <Label>Difficulty</Label>
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
              <Toggle
                checked={form.isFreeScoring}
                onChange={(v) => setForm({ ...form, isFreeScoring: v })}
                label="Free Scoring"
              />
              <Toggle
                checked={form.isPublished}
                onChange={(v) => setForm({ ...form, isPublished: v })}
                label={
                  isEditMode ? "Currently published" : "Publish immediately"
                }
              />
            </div>
          </CardBody>
        </Card>
      )}

      {/* ── STEPS 1-3: Passages ── */}
      {step >= 1 && step <= 3 && passage && (
        <div className="space-y-5">
          {/* Passage meta */}
          <Card>
            <CardHeader
              title={`Passage ${passage.passageNumber}`}
              subtitle={`Questions ${passage.questionRange.from} – ${passage.questionRange.to}`}
            />
            <CardBody className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label required>Passage Title</Label>
                  <Input
                    value={passage.title}
                    onChange={(v) =>
                      updatePassage(passageIdx, { ...passage, title: v })
                    }
                    placeholder="e.g. The Future of Urban Transport"
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={passage.subtitle || ""}
                    onChange={(v) =>
                      updatePassage(passageIdx, { ...passage, subtitle: v })
                    }
                    placeholder="e.g. A look at sustainable cities"
                  />
                </div>
                <div>
                  <Label>Questions From</Label>
                  <Input
                    type="number"
                    value={passage.questionRange.from}
                    onChange={(v) =>
                      updatePassage(passageIdx, {
                        ...passage,
                        questionRange: {
                          ...passage.questionRange,
                          from: parseInt(v) || 1,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Questions To</Label>
                  <Input
                    type="number"
                    value={passage.questionRange.to}
                    onChange={(v) =>
                      updatePassage(passageIdx, {
                        ...passage,
                        questionRange: {
                          ...passage.questionRange,
                          to: parseInt(v) || 13,
                        },
                      })
                    }
                  />
                </div>
              </div>

              {/* Passage body text */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label required>Passage Text</Label>
                  <span className="text-xs text-slate-400">
                    {countWords(passage.bodyText)} words
                    {passage.wordCount ? ` / ${passage.wordCount} target` : ""}
                  </span>
                </div>
                <Textarea
                  value={passage.bodyText}
                  onChange={(v) =>
                    updatePassage(passageIdx, {
                      ...passage,
                      bodyText: v,
                      wordCount: countWords(v),
                    })
                  }
                  placeholder="Paste or type the full reading passage here…"
                  rows={12}
                  className="font-serif text-base leading-relaxed"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Tip: You can use **bold**, _italic_, and paragraph breaks to
                  format the passage.
                </p>
              </div>

              {/* Optional diagram */}
              <ImageUpload
                value={passage.diagramUrl || ""}
                onChange={(url) =>
                  updatePassage(passageIdx, { ...passage, diagramUrl: url })
                }
                label="Passage Diagram / Map (optional)"
              />
            </CardBody>
          </Card>

          {/* Question groups */}
          <Card>
            <CardHeader
              title="Question Groups"
              subtitle="Add multiple question blocks with different types"
              action={
                <Btn
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const nextStart = passage.questionRange.to + 1;
                    updatePassage(passageIdx, {
                      ...passage,
                      questionGroups: [
                        ...passage.questionGroups,
                        makeGroup(nextStart),
                      ],
                    });
                  }}>
                  + Add Group
                </Btn>
              }
            />
            <CardBody className="space-y-5">
              {passage.questionGroups.map((group, gi) => (
                <QuestionGroupEditor
                  key={gi}
                  groupIndex={gi}
                  block={group.questionBlock}
                  questions={group.questions}
                  onBlockChange={(b) => {
                    const groups = [...passage.questionGroups];
                    groups[gi] = { ...groups[gi], questionBlock: b };
                    updatePassage(passageIdx, {
                      ...passage,
                      questionGroups: groups,
                    });
                  }}
                  onQuestionsChange={(qs) => {
                    const groups = [...passage.questionGroups];
                    groups[gi] = { ...groups[gi], questions: qs };
                    updatePassage(passageIdx, {
                      ...passage,
                      questionGroups: groups,
                    });
                  }}
                  onDelete={
                    gi > 0
                      ? () => {
                          updatePassage(passageIdx, {
                            ...passage,
                            questionGroups: passage.questionGroups.filter(
                              (_, j) => j !== gi,
                            ),
                          });
                        }
                      : undefined
                  }
                  startingQNum={passage.questionRange.from}
                />
              ))}
            </CardBody>
          </Card>
        </div>
      )}

      {/* ── STEP 4: Review ── */}
      {step === 4 && (
        <Card>
          <CardHeader
            title="Review & Save"
            subtitle={
              isEditMode
                ? "Review your changes before saving"
                : "Check everything before saving"
            }
          />
          <CardBody className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Title", value: form.title },
                { label: "Type", value: form.testType },
                { label: "Difficulty", value: form.difficulty },
              ].map((x) => (
                <div key={x.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    {x.label}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5">
                    {x.value}
                  </p>
                </div>
              ))}
            </div>
            {form.passages.map((p) => {
              const totalQ = p.questionGroups.reduce(
                (s, g) => s + g.questions.length,
                0,
              );
              return (
                <div
                  key={p.passageNumber}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Passage {p.passageNumber}: {p.title || "(no title)"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {countWords(p.bodyText)} words · {totalQ} questions ·{" "}
                      {p.questionGroups.length} group
                      {p.questionGroups.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(p.passageNumber)}
                    className="text-xs text-red-500 underline">
                    Edit
                  </button>
                </div>
              );
            })}
            <div className="flex gap-3 pt-2">
              <Btn
                variant="secondary"
                size="lg"
                onClick={() => save(false)}
                disabled={saving}>
                {saving
                  ? "Saving…"
                  : isEditMode
                    ? "Save Changes"
                    : "Save as Draft"}
              </Btn>
              <Btn
                variant="primary"
                size="lg"
                onClick={() => save(true)}
                disabled={saving}>
                {saving
                  ? "Saving…"
                  : isEditMode
                    ? "Update & Publish"
                    : "Publish Test"}
              </Btn>
            </div>
          </CardBody>
        </Card>
      )}

      <div className="flex items-center justify-between pt-2">
        <Btn
          variant="secondary"
          onClick={() => setStep((p) => Math.max(0, p - 1))}
          disabled={step === 0}>
          ← Previous
        </Btn>
        {step < STEPS.length - 1 && (
          <Btn variant="primary" onClick={() => setStep((p) => p + 1)}>
            Next →
          </Btn>
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
}
