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
import { adminTestCreate, adminTestUpdate } from "../../action/admin";

const TASK_TYPES = [
  // Academic Task 1
  { value: "bar_chart", label: "Bar Chart", category: "Academic Task 1" },
  { value: "line_graph", label: "Line Graph", category: "Academic Task 1" },
  { value: "pie_chart", label: "Pie Chart", category: "Academic Task 1" },
  { value: "table", label: "Table", category: "Academic Task 1" },
  {
    value: "process_diagram",
    label: "Process Diagram",
    category: "Academic Task 1",
  },
  {
    value: "map_comparison",
    label: "Map Comparison",
    category: "Academic Task 1",
  },
  {
    value: "mixed_diagram",
    label: "Mixed Diagram",
    category: "Academic Task 1",
  },
  // General Task 1
  {
    value: "letter_formal",
    label: "Formal Letter",
    category: "General Task 1",
  },
  {
    value: "letter_informal",
    label: "Informal Letter",
    category: "General Task 1",
  },
  {
    value: "letter_semi_formal",
    label: "Semi-formal Letter",
    category: "General Task 1",
  },
  // Task 2
  { value: "opinion_essay", label: "Opinion Essay", category: "Task 2" },
  { value: "discussion_essay", label: "Discussion Essay", category: "Task 2" },
  {
    value: "problem_solution",
    label: "Problem & Solution",
    category: "Task 2",
  },
  {
    value: "advantages_disadvantages",
    label: "Advantages & Disadvantages",
    category: "Task 2",
  },
  {
    value: "two_part_question",
    label: "Two-Part Question",
    category: "Task 2",
  },
];

const makeTask = (n) => ({
  taskNumber: n,
  taskTitle: `Task ${n}`,
  prompt: "",
  wordLimit: n === 1 ? 150 : 250,
  timeGuide: n === 1 ? 20 : 40,
  taskType: n === 1 ? "bar_chart" : "opinion_essay",
  diagramUrls: [],
  modelAnswer: "",
  modelAnswerBand: 0,
});

const STEPS = ["Basic Info", "Task 1", "Task 2", "Review & Save"];

export default function WritingTestCreator({
  initial,
  onSaved,
}) {
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
        tasks: initial.tasks || [makeTask(1), makeTask(2)],
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
        tasks: [makeTask(1), makeTask(2)],
      };
    }
  });

  const taskIdx = step - 1;
  const task = form.tasks[taskIdx];
  const isEditMode = !!form._id;

  const updateTask = (i, t) => {
    const next = [...form.tasks];
    next[i] = t;
    setForm({ ...form, tasks: next });
  };

  const save = async (publish = false) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        isPublished: publish,
      };

      let res;
      if (form._id) {
        // Update existing test
        res = await adminTestUpdate("writing", form._id, payload);
        setToast({
          msg: `Writing test updated!${publish ? " (Published)" : " (Draft)"}`,
          type: "success",
        });
      } else {
        // Create new test
        res = await adminTestCreate("writing", payload);
        setToast({
          msg: `Writing test created!${publish ? " (Published)" : " (Draft)"}`,
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

  // Task type options grouped
  const taskTypeOptions = TASK_TYPES.filter((t) => {
    if (taskIdx === 0) {
      return form.testType === "Academic"
        ? t.category === "Academic Task 1"
        : t.category === "General Task 1";
    }
    return t.category === "Task 2";
  }).map((t) => ({ value: t.value, label: t.label }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 px-6 py-4">
        <StepBar steps={STEPS} current={step} />
      </div>

      {/* ── Step 0: Basic Info ── */}
      {step === 0 && (
        <Card>
          <CardHeader
            title="Basic Information"
            subtitle={isEditMode ? "Update test details" : "Set up the test identity and settings"}
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
              />
            </div>
            <div className="sm:col-span-2">
              <Label required>Test Title</Label>
              <Input
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
                placeholder="e.g. Writing Test - 04"
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
                label={isEditMode ? "Currently published" : "Publish immediately"}
              />
            </div>
          </CardBody>
        </Card>
      )}

      {/* ── Steps 1-2: Tasks ── */}
      {step >= 1 && step <= 2 && task && (
        <div className="space-y-5">
          <Card>
            <CardHeader
              title={`Task ${task.taskNumber}`}
              subtitle={
                task.taskNumber === 1
                  ? `Min ${task.wordLimit} words · ${task.timeGuide} min`
                  : `Min ${task.wordLimit} words · ${task.timeGuide} min`
              }
            />
            <CardBody className="space-y-5">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label required>Task Title</Label>
                  <Input
                    value={task.taskTitle}
                    onChange={(v) =>
                      updateTask(taskIdx, { ...task, taskTitle: v })
                    }
                    placeholder={`Task ${task.taskNumber}`}
                  />
                </div>
                <div>
                  <Label required>Task Type</Label>
                  <Select
                    value={task.taskType}
                    onChange={(v) =>
                      updateTask(taskIdx, {
                        ...task,
                        taskType: v,
                      })
                    }
                    options={taskTypeOptions}
                  />
                </div>
                <div>
                  <Label>Min Word Count</Label>
                  <Input
                    type="number"
                    value={task.wordLimit}
                    onChange={(v) =>
                      updateTask(taskIdx, {
                        ...task,
                        wordLimit: parseInt(v) || 150,
                      })
                    }
                  />
                </div>
              </div>

              {/* Task prompt */}
              <div>
                <Label required>Task Prompt</Label>
                <Textarea
                  value={task.prompt}
                  onChange={(v) => updateTask(taskIdx, { ...task, prompt: v })}
                  placeholder={
                    task.taskNumber === 1
                      ? "e.g. The bar chart below shows the number of visitors to three museums in London between 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
                      : "e.g. Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?"
                  }
                  rows={5}
                />
              </div>

              {/* Diagram images (Task 1 Academic / map comparisons) */}
              {[
                "bar_chart",
                "line_graph",
                "pie_chart",
                "table",
                "process_diagram",
                "map_comparison",
                "mixed_diagram",
              ].includes(task.taskType) && (
                <div className="space-y-3">
                  <Label>Diagram / Chart Images</Label>
                  <p className="text-xs text-slate-400">
                    Upload 1-2 images for the chart/diagram shown in this task
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[0, 1].map((imgIdx) => (
                      <ImageUpload
                        key={imgIdx}
                        value={task.diagramUrls?.[imgIdx] || ""}
                        onChange={(url) => {
                          const urls = [...(task.diagramUrls || ["", ""])];
                          urls[imgIdx] = url;
                          updateTask(taskIdx, { ...task, diagramUrls: urls });
                        }}
                        label={`Diagram ${imgIdx + 1}${imgIdx === 1 ? " (optional)" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Model answer (admin-only) */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-xs font-bold text-amber-700">
                    Admin Only – Model Answer
                  </span>
                </div>
                <div className="grid sm:grid-cols-4 gap-3 mb-3">
                  <div className="sm:col-span-3">
                    <Label>Band Score for model answer</Label>
                    <Input
                      type="number"
                      value={task.modelAnswerBand || 0}
                      onChange={(v) =>
                        updateTask(taskIdx, {
                          ...task,
                          modelAnswerBand: parseFloat(v) || 0,
                        })
                      }
                      placeholder="e.g. 8.5"
                    />
                  </div>
                </div>
                <Label>Model Answer Text</Label>
                <Textarea
                  value={task.modelAnswer || ""}
                  onChange={(v) =>
                    updateTask(taskIdx, { ...task, modelAnswer: v })
                  }
                  placeholder="Paste the model band 9 answer here. Never shown to students."
                  rows={6}
                  className="bg-white"
                />
                <p className="text-[10px] text-amber-600 mt-1">
                  ⚠ This is never sent to students. Used for admin reference and
                  AI scoring calibration.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* ── Step 3: Review ── */}
      {step === 3 && (
        <Card>
          <CardHeader
            title="Review & Save"
            subtitle={isEditMode ? "Review your changes before saving" : "Check everything before saving"}
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
            {form.tasks.map((t) => (
              <div
                key={t.taskNumber}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Task {t.taskNumber}: {t.taskType.replace(/_/g, " ")}
                  </p>
                  <p className="text-xs text-slate-400">
                    {t.prompt ? `${t.prompt.slice(0, 60)}…` : "(no prompt)"} ·
                    Min {t.wordLimit} words
                    {(t.diagramUrls?.filter(Boolean).length || 0) > 0
                      ? ` · ${t.diagramUrls.filter(Boolean).length} diagram(s)`
                      : ""}
                  </p>
                </div>
                <button
                  onClick={() => setStep(t.taskNumber)}
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
                {saving ? "Saving…" : isEditMode ? "Save Changes" : "Save as Draft"}
              </Btn>
              <Btn
                variant="primary"
                size="lg"
                onClick={() => save(true)}
                disabled={saving}>
                {saving ? "Saving…" : isEditMode ? "Update & Publish" : "Publish Test"}
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