"use client";

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
import { QuestionGroupEditor } from "./Questionbuilder";

const makeSection = (partNum) => ({
  partNumber: partNum,
  title: `Part ${partNum}`,
  instruction: `Listen and answer questions ${(partNum - 1) * 10 + 1} - ${partNum * 10}.`,
  questionRange: { from: (partNum - 1) * 10 + 1, to: partNum * 10 },
  audioUrl: "",
  questionBlock: {
    heading: `Questions ${(partNum - 1) * 10 + 1} – ${partNum * 10}`,
    instruction:
      "Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    boldInstruction: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
    tableTitle: "",
    exampleRow: { label: "", value: "" },
  },
  questions: Array.from({ length: 10 }, (_, i) => ({
    questionNumber: (partNum - 1) * 10 + i + 1,
    type: "form_completion",
    formFields: [{ questionNumber: (partNum - 1) * 10 + i + 1, label: "" }],
    answer: "",
  })),
});

const STEPS = [
  "Basic Info",
  "Part 1",
  "Part 2",
  "Part 3",
  "Part 4",
  "Review & Save",
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function ListeningTestCreator({ initial, onSaved }) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Initialize form with either edit data or defaults
  const [form, setForm] = useState(() => {
    if (initial?._id) {
      // Edit mode: use existing test data
      return {
        _id: initial._id,
        seriesId: initial.seriesId || "",
        testNumber: initial.testNumber || 1,
        title: initial.title || "",
        difficulty: initial.difficulty || "Medium",
        isPublished: initial.isPublished || false,
        isFreeScoring: initial.isFreeScoring || false,
        sections: initial.sections || [1, 2, 3, 4].map(makeSection),
      };
    } else {
      // Create mode: use defaults
      return {
        seriesId: "",
        testNumber: 1,
        title: "",
        difficulty: "Medium",
        isPublished: false,
        isFreeScoring: false,
        sections: [1, 2, 3, 4].map(makeSection),
      };
    }
  });

  const updateSection = (i, s) => {
    const next = [...form.sections];
    next[i] = s;
    setForm({ ...form, sections: next });
  };

  const validate = () => {
    if (!form.seriesId.trim()) return "Series ID is required";
    if (!form.title.trim()) return "Title is required";
    for (const s of form.sections) {
      if (!s.audioUrl.trim())
        return `Part ${s.partNumber}: Audio URL is required`;
      if (s.questions.length !== 10)
        return `Part ${s.partNumber}: Must have exactly 10 questions`;
    }
    return null;
  };

  const save = async (publish = false) => {
    const err = validate();
    if (err) {
      setToast({ msg: err, type: "error" });
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, isPublished: publish };

      let res;
      if (form._id) {
        // Update existing test
        res = await adminTestUpdate("listening", form._id, payload);
        setToast({
          msg: `Listening test updated!${publish ? " (Published)" : " (Draft)"}`,
          type: "success",
        });
      } else {
        // Create new test
        res = await adminTestCreate("listening", payload);
        setToast({
          msg: `Listening test created!${publish ? " (Published)" : " (Draft)"}`,
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

  const secIdx = step - 1;
  const section = form.sections[secIdx];
  const isEditMode = !!form._id;

  return (
    <div className="space-y-6">
      {/* Step bar */}
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
              />
            </div>
            <div>
              <Label required>Test Number</Label>
              <Input
                type="number"
                value={form.testNumber}
                onChange={(v) =>
                  setForm({ ...form, testNumber: parseInt(v) || 1 })
                }
                placeholder="e.g. 4"
              />
            </div>
            <div className="sm:col-span-2">
              <Label required>Test Title</Label>
              <Input
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
                placeholder="e.g. Listening Test - 04"
              />
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
              <Toggle
                checked={form.isFreeScoring}
                onChange={(v) => setForm({ ...form, isFreeScoring: v })}
                label="Free Scoring (shown to students)"
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

      {/* ── STEPS 1-4: Parts ── */}
      {step >= 1 && step <= 4 && section && (
        <div className="space-y-5">
          {/* Part meta */}
          <Card>
            <CardHeader
              title={`Part ${section.partNumber}`}
              subtitle={`Questions ${section.questionRange.from} – ${section.questionRange.to}`}
            />
            <CardBody className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label required>Part Title</Label>
                <Input
                  value={section.title}
                  onChange={(v) =>
                    updateSection(secIdx, { ...section, title: v })
                  }
                  placeholder="e.g. Part 1"
                />
              </div>
              <div>
                <Label required>Top Instruction</Label>
                <Input
                  value={section.instruction}
                  onChange={(v) =>
                    updateSection(secIdx, { ...section, instruction: v })
                  }
                  placeholder="e.g. Listen and answer questions 1 - 10."
                />
              </div>
              <div className="sm:col-span-2">
                <AudioUpload
                  value={section.audioUrl}
                  onChange={(url) =>
                    updateSection(secIdx, { ...section, audioUrl: url })
                  }
                  label={`Part ${section.partNumber} Audio *`}
                />
              </div>
            </CardBody>
          </Card>

          {/* Question group */}
          <Card>
            <CardHeader
              title="Questions"
              subtitle="All 10 questions for this part"
            />
            <CardBody>
              <QuestionGroupEditor
                groupIndex={0}
                block={section.questionBlock}
                questions={section.questions}
                onBlockChange={(b) =>
                  updateSection(secIdx, { ...section, questionBlock: b })
                }
                onQuestionsChange={(qs) =>
                  updateSection(secIdx, { ...section, questions: qs })
                }
                startingQNum={section.questionRange.from}
              />
            </CardBody>
          </Card>
        </div>
      )}

      {/* ── STEP 5: Review ── */}
      {step === 5 && (
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
                { label: "Series ID", value: form.seriesId },
                { label: "Title", value: form.title },
                { label: "Difficulty", value: form.difficulty },
              ].map((x) => (
                <div key={x.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {x.label}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5">
                    {x.value}
                  </p>
                </div>
              ))}
            </div>
            {form.sections.map((s) => (
              <div
                key={s.partNumber}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {s.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {s.questions.length} questions ·{" "}
                    {s.audioUrl ? "✅ Audio set" : "⚠️ No audio"}
                  </p>
                </div>
                <button
                  onClick={() => setStep(s.partNumber)}
                  className="text-xs text-red-500 underline">
                  Edit
                </button>
              </div>
            ))}
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

      {/* Navigation */}
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
