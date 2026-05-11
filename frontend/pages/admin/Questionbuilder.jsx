"use client";
import {
  Label,
  Input,
  Textarea,
  Select,
  Btn,
  QNum,
  Collapsible,
  Card,
} from "../../components/Shared/AdminUi";

const Q_TYPE_OPTIONS = [
  { value: "form_completion", label: "Form Completion (fill form table)" },
  { value: "note_completion", label: "Note Completion (fill notes/summary)" },
  { value: "sentence_completion", label: "Sentence Completion" },
  { value: "mcq_single", label: "MCQ – Single Answer (A/B/C)" },
  { value: "mcq_multiple", label: "MCQ – Multiple Answers" },
  { value: "true_false_ng", label: "True / False / Not Given" },
  { value: "short_answer", label: "Short Answer" },
  { value: "matching", label: "Matching" },
];

const FormFieldEditor = ({ field, onChange }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl">
    <div>
      <Label>Label (left cell)</Label>
      <Input
        value={field.label}
        onChange={(v) => onChange({ ...field, label: "." })}
        placeholder="e.g. Name:"
      />
    </div>
    <div>
      <Label>Prefix (before input)</Label>
      <Input
        value={field.prefix || ""}
        onChange={(v) => onChange({ ...field, prefix: v })}
        placeholder='e.g. "Richard"'
      />
    </div>
    <div>
      <Label>Suffix (after input)</Label>
      <Input
        value={field.suffix || ""}
        onChange={(v) => onChange({ ...field, suffix: v })}
        placeholder='e.g. "Freeman"'
      />
    </div>
    <div>
      <Label>Symbol prefix</Label>
      <Input
        value={field.prefixSymbol || ""}
        onChange={(v) => onChange({ ...field, prefixSymbol: v })}
        placeholder='e.g. "£"'
      />
    </div>
  </div>
);

// ─── MCQ option editor ────────────────────────────────────────────────────────
const MCQEditor = ({ options, onChange }) => {
  const update = (i, text) => {
    const next = [...options];
    next[i] = { ...next[i], text };
    onChange(next);
  };
  const add = () =>
    onChange([
      ...options,
      { label: String.fromCharCode(65 + options.length), text: "" },
    ]);
  const remove = (i) => onChange(options.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
            {opt.label}
          </span>
          <Input
            value={opt.text}
            onChange={(v) => update(i, v)}
            placeholder={`Option ${opt.label}`}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-slate-300 hover:text-red-500 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
      {options.length < 5 && (
        <Btn variant="ghost" size="sm" onClick={add}>
          + Add Option
        </Btn>
      )}
    </div>
  );
};

// ─── Single Question Editor ───────────────────────────────────────────────────
const QuestionEditor = ({
  question,
  index,
  onChange,
  onDelete,
  showFormFields = true, // listening/reading have different layouts
}) => {
  const isFormType = [
    "form_completion",
    "note_completion",
    "sentence_completion",
  ].includes(question?.type);
  const isMCQ = ["mcq_single", "mcq_multiple"].includes(question?.type);
  const isTFNG = question?.type === "true_false_ng";
  const isShort = question?.type === "short_answer";

  const updateField = (i, f) => {
    const ff = [...(question.formFields || [])];
    ff[i] = f;
    onChange({ ...question, formFields: ff });
  };

  return (
    <Collapsible
      title={`Question ${question?.questionNumber}`}
      subtitle={question?.type.replace(/_/g, " ")}
      badge={question?.type}
      onDelete={onDelete}>
      {/* Q number + type row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label required>Question Number</Label>
          <Input
            type="number"
            value={question?.questionNumber}
            onChange={(v) =>
              onChange({ ...question, questionNumber: parseInt(v) || 1 })
            }
          />
        </div>
        <div>
          <Label required>Question Type</Label>
          <Select
            value={question?.type}
            onChange={(v) => onChange({ ...question, type: v })}
            options={Q_TYPE_OPTIONS}
          />
        </div>
      </div>

      {/* Form fields (for fill-in types) */}
      {isFormType && showFormFields && (
        <div className="space-y-2">
          <Label>Form Field</Label>
          {(
            question.formFields || [
              { questionNumber: question?.questionNumber, label: "" },
            ]
          ).map((f, i) => (
            <FormFieldEditor
              key={i}
              field={f}
              onChange={(nf) => updateField(i, nf)}
            />
          ))}
        </div>
      )}

      {/* MCQ stem + options */}
      {isMCQ && (
        <>
          <div>
            <Label required>Question Stem</Label>
            <Textarea
              value={question.stem || ""}
              onChange={(v) => onChange({ ...question, stem: v })}
              placeholder="e.g. What is the main purpose of the speaker's talk?"
              rows={2}
            />
          </div>
          <div>
            <Label required>Answer Options</Label>
            <MCQEditor
              options={
                question.options || [
                  { label: "A", text: "" },
                  { label: "B", text: "" },
                  { label: "C", text: "" },
                ]
              }
              onChange={(opts) => onChange({ ...question, options: opts })}
            />
          </div>
        </>
      )}

      {/* True/False/NG */}
      {isTFNG && (
        <div>
          <Label required>Statement</Label>
          <Textarea
            value={question.statementText || ""}
            onChange={(v) => onChange({ ...question, statementText: v })}
            placeholder="e.g. The company was founded in the 19th century."
            rows={2}
          />
        </div>
      )}

      {/* Short answer */}
      {isShort && (
        <div>
          <Label required>Question</Label>
          <Textarea
            value={question.stem || ""}
            onChange={(v) => onChange({ ...question, stem: v })}
            placeholder="e.g. What is the name of the director?"
            rows={2}
          />
        </div>
      )}

      {/* Correct Answer */}
      <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
        <Label required>Correct Answer</Label>
        {isTFNG ? (
          <Select
            value={String(question?.answer || "")}
            onChange={(v) => onChange({ ...question, answer: v })}
            options={[
              { value: "True", label: "True" },
              { value: "False", label: "False" },
              { value: "Not Given", label: "Not Given" },
            ]}
          />
        ) : isMCQ && question?.type === "mcq_multiple" ? (
          <>
            <Input
              value={
                Array.isArray(question?.answer)
                  ? question?.answer.join(", ")
                  : String(question?.answer || "")
              }
              onChange={(v) =>
                onChange({
                  ...question,
                  answer: v.split(",").map((s) => s.trim()),
                })
              }
              placeholder="e.g. A, C  (comma separated)"
            />
          </>
        ) : (
          <Input
            value={String(question?.answer || "")}
            onChange={(v) => onChange({ ...question, answer: v })}
            placeholder="e.g. James  or  B  or  True"
            className="bg-white border-green-300 focus:border-green-500"
          />
        )}
        <p className="text-[10px] text-green-600 mt-1">
          ⚠ This is never shown to students. Only used for auto-scoring.
        </p>
      </div>
    </Collapsible>
  );
};

// ─── Question Group (used in reading - multiple groups per passage) ────────────
export const QuestionGroupEditor = ({
  groupIndex,
  block,
  questions,
  onBlockChange,
  onQuestionsChange,
  onDelete,
  startingQNum = 1,
}) => {
  const addQuestion = () => {
    const nextNum =
      questions.length > 0
        ? Math.max(...questions.map((q) => q?.questionNumber)) + 1
        : startingQNum;
    onQuestionsChange([
      ...questions,
      {
        questionNumber: nextNum,
        type: "mcq_single",
        answer: "",
        options: [
          { label: "A", text: "" },
          { label: "B", text: "" },
          { label: "C", text: "" },
        ],
      },
    ]);
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-5 py-3 bg-indigo-50 border-b border-indigo-100 flex items-center justify-between">
        <span className="text-sm font-bold text-indigo-700">
          Question Group {groupIndex + 1}
        </span>
        {onDelete && (
          <Btn variant="danger" size="sm" onClick={onDelete}>
            Remove Group
          </Btn>
        )}
      </div>
      <div className="p-5 space-y-4">
        {/* Block header fields */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label required>Heading</Label>
            <Input
              value={block.heading}
              onChange={(v) => onBlockChange({ ...block, heading: v })}
              placeholder="e.g. Questions 1 – 10"
            />
          </div>
          <div>
            <Label>Table / Section Title</Label>
            <Input
              value={block.tableTitle || ""}
              onChange={(v) => onBlockChange({ ...block, tableTitle: v })}
              placeholder="e.g. ORDER FORM"
            />
          </div>
        </div>
        <div>
          <Label required>Instruction</Label>
          <Textarea
            value={block.instruction}
            onChange={(v) => onBlockChange({ ...block, instruction: v })}
            placeholder="e.g. Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer."
            rows={2}
          />
        </div>
        <div>
          <Label>Bold part of instruction (optional)</Label>
          <Input
            value={block.boldInstruction || ""}
            onChange={(v) => onBlockChange({ ...block, boldInstruction: v })}
            placeholder="e.g. NO MORE THAN TWO WORDS AND/OR A NUMBER"
          />
        </div>
        {/* Example row */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label>Example row – Label</Label>
            <Input
              value={block.exampleRow?.label || ""}
              onChange={(v) =>
                onBlockChange({
                  ...block,
                  exampleRow: { ...block.exampleRow, label: v },
                })
              }
              placeholder="e.g. Reason for call:"
            />
          </div>
          <div>
            <Label>Example row – Value</Label>
            <Input
              value={block.exampleRow?.value || ""}
              onChange={(v) =>
                onBlockChange({
                  ...block,
                  exampleRow: { ...block.exampleRow, value: v },
                })
              }
              placeholder="e.g. problems with WEBSITE"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {questions.map((q, qi) => (
            <QuestionEditor
              key={qi}
              question={q}
              index={qi}
              onChange={(nq) => {
                const next = [...questions];
                next[qi] = nq;
                onQuestionsChange(next);
              }}
              onDelete={() =>
                onQuestionsChange(questions.filter((_, j) => j !== qi))
              }
            />
          ))}
        </div>
        <Btn variant="secondary" size="sm" onClick={addQuestion}>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Question
        </Btn>
      </div>
    </div>
  );
};

export default QuestionEditor;
