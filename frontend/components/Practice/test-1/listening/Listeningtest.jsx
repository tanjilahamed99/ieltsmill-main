"use client";
import { useTestData } from "@/hooks/useTestData";
import { useState, useEffect, useRef, useCallback } from "react";

const AUDIO_SRC = "/replace-your-audio";
const TOTAL_SEC = 40 * 60;

const CORRECT = {
  1: "Parkinson",
  2: "Cowley",
  3: "BN5 2QP",
  4: "1.5m",
  5: "0.6m",
  6: "furniture",
  7: "clothing",
  8: "£2,000",
  9: "B",
  10: "B",
  11: "A",
  12: "C",
  13: "B",
  14: "A",
  15: "C",
  16: "B",
  17: "C",
  18: "B",
  19: "C",
  20: "A",
  21: "D",
  22: "B",
  23: "C",
  24: "A",
  25: "",
  26: "",
  27: "",
  28: "",
  29: "",
  30: "",
  31: "",
  32: "",
  33: "",
  34: "",
  35: "",
  36: "",
  37: "",
  38: "",
  39: "",
  40: "",
};

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// ═══════════════════════════════════════════════════════════════
// HIGHLIGHT SYSTEM  (ported from reading page)
// ═══════════════════════════════════════════════════════════════

// Split any text node tree into highlighted / plain spans
function buildSpans(text, highlights) {
  if (!highlights.length) return [{ text, highlighted: false }];
  let pts = new Set([0, text.length]);
  highlights.forEach((h) => {
    pts.add(h.start);
    pts.add(h.end);
  });
  pts = Array.from(pts).sort((a, b) => a - b);
  return pts.slice(0, -1).map((start, i) => {
    const end = pts[i + 1];
    const highlighted = highlights.some(
      (h) => h.start <= start && h.end >= end,
    );
    return { text: text.slice(start, end), highlighted };
  });
}

// Highlightable text block — wraps any string, renders marks
function HighlightableText({ id, text, highlights, onSelect }) {
  const ref = useRef(null);

  const handlePointerUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
    const range = sel.getRangeAt(0);
    if (!ref.current?.contains(range.commonAncestorContainer)) return;

    const rect = range.getBoundingClientRect();
    const pre = document.createRange();
    pre.setStart(ref.current, 0);
    pre.setEnd(range.startContainer, range.startOffset);
    const start = pre.toString().length;
    const selected = sel.toString();

    onSelect({
      zoneId: id,
      start,
      end: start + selected.length,
      rect: {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      },
    });
  }, [id, onSelect]);

  const spans = buildSpans(
    text,
    highlights.filter((h) => h.zoneId === id),
  );

  return (
    <span
      ref={ref}
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
      style={{ cursor: "text", userSelect: "text", WebkitUserSelect: "text" }}>
      {spans.map((s, i) =>
        s.highlighted ? (
          <mark key={i} className="lt-mark">
            {s.text}
          </mark>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </span>
  );
}

// Floating popup — identical logic to reading page
function SelectionPopup({
  selection,
  isHighlighted,
  onHighlight,
  onClear,
  onDismiss,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ top: -999, left: -999, ready: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pw = el.offsetWidth || 160;
    const ph = el.offsetHeight || 44;
    const { rect } = selection;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const centerX = (rect.left + rect.right) / 2 + scrollX;
    let top = rect.top + scrollY - ph - 12;
    if (top < scrollY + 8) top = rect.bottom + scrollY + 12;
    let left = centerX - pw / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
    setPos({ top, left, ready: true });
  }, [selection]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onDismiss();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onDismiss]);

  return (
    <div
      ref={ref}
      className="lt-popup"
      style={{
        top: pos.top,
        left: pos.left,
        opacity: pos.ready ? 1 : 0,
        pointerEvents: pos.ready ? "auto" : "none",
      }}>
      {!isHighlighted ? (
        <button className="lt-pop-btn lt-pop-hl" onClick={onHighlight}>
          ✏ Highlight
        </button>
      ) : (
        <button className="lt-pop-btn lt-pop-cl" onClick={onClear}>
          ✕ Clear
        </button>
      )}
    </div>
  );
}

// Hook — manages all highlights + selection state
function useHighlights() {
  const [highlights, setHighlights] = useState([]);
  const [selection, setSelection] = useState(null);

  const isHighlighted = selection
    ? highlights.some(
        (h) =>
          h.zoneId === selection.zoneId &&
          h.start <= selection.start &&
          h.end >= selection.end,
      )
    : false;

  const handleSelect = useCallback((sel) => setSelection(sel), []);

  const handleHighlight = useCallback(() => {
    if (!selection) return;
    const newH = {
      id: Date.now().toString(),
      zoneId: selection.zoneId,
      start: selection.start,
      end: selection.end,
    };
    setHighlights((prev) => {
      const rest = prev.filter(
        (h) =>
          !(
            h.zoneId === newH.zoneId &&
            h.end > newH.start &&
            h.start < newH.end
          ),
      );
      return [...rest, newH].sort((a, b) => a.start - b.start);
    });
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  }, [selection]);

  const handleClear = useCallback(() => {
    if (!selection) return;
    setHighlights((prev) =>
      prev.filter(
        (h) =>
          !(
            h.zoneId === selection.zoneId &&
            h.start < selection.end &&
            h.end > selection.start
          ),
      ),
    );
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  }, [selection]);

  const dismiss = useCallback(() => {
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  }, []);

  const clearAll = useCallback(() => {
    setHighlights([]);
    setSelection(null);
  }, []);

  return {
    highlights,
    selection,
    isHighlighted,
    handleSelect,
    handleHighlight,
    handleClear,
    dismiss,
    clearAll,
  };
}

// ═══════════════════════════════════════════════════════════════
// SHARED PRIMITIVES
// ═══════════════════════════════════════════════════════════════

function TInput({ num, vals, onChange, width = "160px" }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 mx-1">
      <span className="text-sm font-bold text-gray-400 select-none">{num}</span>
      <input
        type="text"
        value={vals[num] ?? ""}
        onChange={(e) => onChange(num, e.target.value)}
        style={{ width }}
        className="border-0 border-b-2 border-gray-300 bg-transparent outline-none text-base text-gray-900 focus:border-gray-800 placeholder:text-gray-200 transition-colors px-1 pb-0.5"
        placeholder=".................."
      />
    </span>
  );
}

function MCQOption({
  label,
  text,
  selected,
  onClick,
  highlights,
  onSelect,
  zoneId,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-3 w-full text-left px-4 py-3 text-base transition-all border rounded-md ${
        selected
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
      }`}>
      <span
        className={`mt-0.5 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-sm font-bold ${
          selected
            ? "border-white bg-white text-gray-900"
            : "border-gray-300 text-gray-500"
        }`}>
        {label}
      </span>
      <span className="leading-relaxed">
        <HighlightableText
          id={zoneId}
          text={text}
          highlights={highlights}
          onSelect={onSelect}
        />
      </span>
    </button>
  );
}

function MCQBlock({
  num,
  question,
  options,
  vals,
  onChange,
  highlights,
  onSelect,
}) {
  const labels = ["A", "B", "C", "D"];
  return (
    <div className="mb-6">
      <p className="text-base text-gray-800 mb-3 leading-relaxed font-medium">
        <span className="font-bold text-gray-900 mr-2">{num}.</span>
        <HighlightableText
          id={`q${num}`}
          text={question}
          highlights={highlights}
          onSelect={onSelect}
        />
      </p>
      <div className="space-y-2 pl-6">
        {options.map((o, i) => (
          <MCQOption
            key={o}
            label={labels[i]}
            text={o}
            zoneId={`q${num}opt${i}`}
            selected={vals[num] === labels[i]}
            onClick={() =>
              onChange(num, vals[num] === labels[i] ? "" : labels[i])
            }
            highlights={highlights}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ part, qRange, instruction, sub }) {
  return (
    <div className="mb-6 pb-4 border-b-2 border-gray-100">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
          {part}
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-sm font-semibold text-gray-500">
          Questions {qRange}
        </span>
      </div>
      <p className="text-lg font-semibold text-gray-800">{instruction}</p>
      {sub && <p className="text-sm text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1
// ═══════════════════════════════════════════════════════════════
function Section1({ vals, onChange, highlights, onSelect }) {
  const B = (n, w) => (
    <TInput num={n} vals={vals} onChange={onChange} width={w} />
  );
  const H = (id, text) => (
    <HighlightableText
      id={id}
      text={text}
      highlights={highlights}
      onSelect={onSelect}
    />
  );

  return (
    <div className="space-y-10">
      <div>
        <SectionHeader
          part="Part 1"
          qRange="1–8"
          instruction="Complete the form below."
          sub="Write NO MORE THAN TWO WORDS OR A NUMBER for each answer."
        />
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-600">
              Denham's Shipping Agency — Customer Quotation Form
            </span>
          </div>
          <div className="px-5 py-6 space-y-5 text-base text-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <p className="leading-9">
                {H("s1-name", "Name: Tim")} {B(1, "150px")}
              </p>
              <p className="leading-9">
                {H("s1-post", "Postcode:")} {B(3, "130px")}
              </p>
              <p className="sm:col-span-2 leading-9">
                {H("s1-addr", "Address to be collected from")} {B(2, "150px")}{" "}
                {H("s1-uni", "University, Brighton")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Size of Container
                </p>
                <div className="space-y-3 pl-2">
                  <p>{H("s1-len", "Length: 2.5m")}</p>
                  <p className="leading-9">
                    {H("s1-wid", "Width:")} {B(4, "120px")}
                  </p>
                  <p className="leading-9">
                    {H("s1-dep", "Depth:")} {B(5, "120px")}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Contents
                </p>
                <div className="space-y-3 pl-2">
                  <p>{H("s1-books", "Books")}</p>
                  <p className="leading-9">{B(6, "180px")}</p>
                  <p className="leading-9">{B(7, "180px")}</p>
                  <p className="pt-2 border-t border-gray-100 leading-9">
                    {H("s1-val", "Total estimated value:")} {B(8, "130px")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionHeader
          part="Part 1 (cont.)"
          qRange="9–10"
          instruction="Choose the correct letter A, B or C."
        />
        <div className="space-y-5">
          <MCQBlock
            num={9}
            vals={vals}
            onChange={onChange}
            highlights={highlights}
            onSelect={onSelect}
            question="What is the minimum recommended cover by the agency?"
            options={["Premium", "Standard", "Economy"]}
          />
          <MCQBlock
            num={10}
            vals={vals}
            onChange={onChange}
            highlights={highlights}
            onSelect={onSelect}
            question="Where does the customer want the goods delivered?"
            options={["Port", "Home", "Business"]}
          />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2
// ═══════════════════════════════════════════════════════════════
function Section2({ vals, onChange, highlights, onSelect }) {
  const statements = [
    { n: 11, text: "The man's major is Hotel Management" },
    { n: 12, text: "The woman majors in French" },
    {
      n: 13,
      text: "The woman has a full-academic scholarship to support her study",
    },
    { n: 14, text: "The man has a part-time job as a waiter at a restaurant" },
    { n: 15, text: "The man's part-time job is not very busy" },
  ];
  const mcqs = [
    {
      n: 16,
      q: "Where are they planning to go the next morning?",
      opts: ["Park", "Art museum", "Shopping centre"],
    },
    {
      n: 17,
      q: "What kind of restaurant do they want to visit for lunch?",
      opts: ["Italian", "Indonesian", "Indian"],
    },
    {
      n: 18,
      q: "Why does the man want to visit the zoo in the afternoon?",
      opts: [
        "The zoo will be closed the rest of the week.",
        "The zoo is free to visitors that day only.",
        "There are unusual animals on display.",
      ],
    },
    {
      n: 19,
      q: "Why does the woman want to go shopping instead?",
      opts: [
        "She wants to buy mementos of their visit.",
        "She saw some great prices at a shopping centre.",
        "She wants to buy a gift for her friend.",
      ],
    },
    {
      n: 20,
      q: "How do they plan to get to the seashore?",
      opts: ["By taxi", "By bus", "By subway"],
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <SectionHeader
          part="Part 2"
          qRange="11–15"
          instruction="Write the correct letter, A, B or C, next to questions 11–15."
        />
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-2">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 grid grid-cols-3 gap-2 text-sm font-semibold text-gray-600">
            <span>
              <span className="font-bold text-gray-800">A</span> — Accurate
            </span>
            <span>
              <span className="font-bold text-gray-800">B</span> — Inaccurate
            </span>
            <span>
              <span className="font-bold text-gray-800">C</span> — Not Given
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {statements.map(({ n, text }) => (
              <div
                key={n}
                className="flex items-center justify-between gap-4 px-5 py-4">
                <p className="text-base text-gray-800 flex-1 leading-relaxed">
                  <span className="font-bold text-gray-900 mr-2">{n}.</span>
                  <HighlightableText
                    id={`stmt${n}`}
                    text={text}
                    highlights={highlights}
                    onSelect={onSelect}
                  />
                </p>
                <input
                  type="text"
                  maxLength={1}
                  value={vals[n] ?? ""}
                  onChange={(e) => onChange(n, e.target.value.toUpperCase())}
                  className="w-12 h-10 border-2 border-gray-300 rounded text-center text-base font-bold text-gray-900 bg-transparent outline-none focus:border-gray-800 transition-colors flex-shrink-0"
                  placeholder="?"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <SectionHeader
          part="Part 2 (cont.)"
          qRange="16–20"
          instruction="Choose the correct letter A, B or C."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mcqs.map((q) => (
            <MCQBlock
              key={q.n}
              num={q.n}
              question={q.q}
              options={q.opts}
              vals={vals}
              onChange={onChange}
              highlights={highlights}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3
// ═══════════════════════════════════════════════════════════════
function Section3({ vals, onChange, highlights, onSelect }) {
  const B = (n, w = "190px") => (
    <TInput num={n} vals={vals} onChange={onChange} width={w} />
  );
  const H = (id, text) => (
    <HighlightableText
      id={id}
      text={text}
      highlights={highlights}
      onSelect={onSelect}
    />
  );

  const mcqs = [
    {
      n: 21,
      q: "Astrid says she is ………",
      opts: [
        "Unhappy with Dr Adams",
        "Happy with Dr Adams",
        "In the same tutorial group as Boris",
        "In a different seminar group to Boris",
      ],
    },
    {
      n: 22,
      q: "In the last lecture, Astrid took ………",
      opts: [
        "Fewer notes than she thought",
        "More notes than she thought",
        "Too many notes",
        "Not many notes",
      ],
    },
    {
      n: 23,
      q: "Henry wants to copy Astrid's notes because ………",
      opts: [
        "Astrid's are neater than his",
        "He missed the lecture",
        "He was listening rather than writing",
        "He didn't understand the lecture",
      ],
    },
    {
      n: 24,
      q: "Astrid says Henry cannot copy her notes because ………",
      opts: [
        "Her handwriting is difficult to read",
        "They are too long",
        "The photocopier is broken",
        "He should have taken his own notes",
      ],
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <SectionHeader
          part="Part 3"
          qRange="21–24"
          instruction="Choose the correct letter A, B, C or D."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mcqs.map((q) => (
            <MCQBlock
              key={q.n}
              num={q.n}
              question={q.q}
              options={q.opts}
              vals={vals}
              onChange={onChange}
              highlights={highlights}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionHeader
          part="Part 3 (cont.)"
          qRange="25–30"
          instruction="Complete the information below."
          sub="Write NO MORE THAN TWO WORDS for each answer."
        />
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-600">
              Notes
            </span>
          </div>
          <div className="px-5 py-6 text-base text-gray-800 space-y-4 leading-10">
            <p>
              {H("s3-25", "Astrid is good at")} {B(25)}
            </p>
            <p>
              {H("s3-26", "Adam's book was about space and")} {B(26)}
            </p>
            <p>
              {H("s3-27", "Some intelligent people find it difficult to read")}{" "}
              {B(27)}
            </p>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                Henry
              </p>
              <p>
                {H("s3-28", "• Useless at reading")} {B(28)}
              </p>
              <p className="mt-2">
                {H("s3-29", "• Brilliant at")} {B(29)}{" "}
                {H("s3-30", "and putting ideas down in the")} {B(30, "150px")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4
// ═══════════════════════════════════════════════════════════════
function Section4({ vals, onChange, highlights, onSelect }) {
  const B = (n, w = "150px") => (
    <TInput num={n} vals={vals} onChange={onChange} width={w} />
  );
  const H = (id, text) => (
    <HighlightableText
      id={id}
      text={text}
      highlights={highlights}
      onSelect={onSelect}
    />
  );

  return (
    <div>
      <SectionHeader
        part="Part 4"
        qRange="31–40"
        instruction="Complete the summary below."
        sub="Write ONE WORD OR A NUMBER for each answer."
      />
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-600">
            Irish People
          </span>
        </div>
        <div className="px-5 py-6 text-base text-gray-800">
          <p className="leading-[3.2rem]">
            {H("s4-1", "In 1849 Irish people were largely")} {B(31)}{" "}
            {H("s4-2", "and living in the countryside. There was a serious")}{" "}
            {B(32)}{" "}
            {H(
              "s4-3",
              "in the agricultural system. All crops were grown to pay the rent of the land and all that was grown to eat was",
            )}{" "}
            {B(33, "130px")}
            {H(
              "s4-4",
              ". A great famine struck the Irish people. From 1845 to 1848 the crops failed so",
            )}{" "}
            {B(34)} {H("s4-5", "million people died or left the country by")}{" "}
            {B(35)}
            {H("s4-6", ". The population continued to go")} {B(36)}{" "}
            {H(
              "s4-7",
              "until 1961. The people left their homes and went to England,",
            )}{" "}
            {B(37)} {H("s4-8", "or Australia. Ireland has the highest")} {B(38)}{" "}
            {H("s4-9", "rate of any country in Europe for the last")} {B(39)}{" "}
            {H("s4-10", "centuries. Almost every family in Ireland has")}{" "}
            {B(40)} {H("s4-11", "abroad.")}
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// INTRO MODAL
// ═══════════════════════════════════════════════════════════════
function IntroModal({ onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden">
        <div className="px-8 py-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            IELTS Full Test 1
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Listening Test
          </h2>
          <p className="text-base text-gray-500 mb-6">
            40 minutes · 40 questions · 4 sections
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 mb-6 text-sm text-amber-800 space-y-1.5">
            <p className="font-bold mb-2">Before you begin</p>
            <p>• Ensure your headphones / speakers are working</p>
            <p>• Audio plays automatically — listen carefully</p>
            <p>
              • <span className="font-semibold">Select any text</span> to
              highlight it for reference
            </p>
            <p>• The test auto-submits after 40 minutes</p>
          </div>
          <button
            onClick={onStart}
            className="w-full py-3.5 rounded-lg text-white text-base font-bold bg-gray-900 hover:bg-gray-700 transition">
            ▶ Start Listening Test
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AUDIO BAR
// ═══════════════════════════════════════════════════════════════
function AudioBar({ audioRef, playing, setPlaying, cur, dur }) {
  const pct = dur ? (cur / dur) * 100 : 0;
  const seek = (e) => {
    if (!audioRef.current || !dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime = ((e.clientX - r.left) / r.width) * dur;
  };
  const toggle = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="listening-container flex items-center gap-4">
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-900 text-white hover:bg-gray-700 transition">
          {playing ? (
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M8 5.14v14l11-7z" />
            </svg>
          )}
        </button>
        <div
          className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer"
          onClick={seek}>
          <div
            className="h-full bg-gray-800 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-mono text-gray-500 flex-shrink-0 tabular-nums">
          {fmt(Math.floor(cur))} / {fmt(Math.floor(dur || 0))}
        </span>
        <span className="text-sm text-gray-400 flex-shrink-0 hidden sm:block">
          🔊 plays once
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TABS BAR
// ═══════════════════════════════════════════════════════════════
function TabsBar({
  active,
  setActive,
  vals,
  timeLeft,
  onSubmit,
  hlCount,
  onClearAll,
}) {
  const tabs = ["Section 1", "Section 2", "Section 3", "Section 4"];
  const ranges = [
    [1, 10],
    [11, 20],
    [21, 30],
    [31, 40],
  ];
  const count = (s, e) => {
    let c = 0;
    for (let i = s; i <= e; i++)
      if (vals[i] !== undefined && vals[i] !== "") c++;
    return c;
  };
  const urgent = timeLeft < 300;

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="listening-container flex items-center gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((t, i) => {
          const [s, e] = ranges[i];
          const done = count(s, e);
          const isActive = active === i;
          return (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}>
              <span>{t}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}>
                {done}/10
              </span>
            </button>
          );
        })}
        <div className="flex-1" />
        {hlCount > 0 && (
          <button
            onClick={onClearAll}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold text-gray-500 border border-gray-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition mr-2">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M20 20H7L3 16l11-11 6 6-2.5 2.5" />
              <path d="M6 14l4 4" />
            </svg>
            {hlCount} highlight{hlCount !== 1 ? "s" : ""}
          </button>
        )}
        <span
          className={`font-mono text-base font-bold tabular-nums flex-shrink-0 ${urgent ? "text-red-600" : "text-gray-700"}`}>
          {fmt(timeLeft)}
        </span>
        <button
          onClick={onSubmit}
          className="flex-shrink-0 ml-3 px-4 py-2 rounded-md text-sm font-bold text-white bg-gray-900 hover:bg-gray-700 transition">
          Submit
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DONE SCREEN
// ═══════════════════════════════════════════════════════════════
function DoneScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full border-2 border-gray-900 flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-7 h-7 text-gray-900"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Listening Complete
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Section submitted
        </h2>
        <p className="text-base text-gray-500">Loading Reading section…</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ROOT COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function ListeningTest({ onComplete }) {
  const audioRef = useRef(null);
  const [phase, setPhase] = useState("intro");
  const [active, setActive] = useState(0);
  const [vals, setVals] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SEC);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);

  const {} = useTestData();

  const {
    highlights,
    selection,
    isHighlighted,
    handleSelect,
    handleHighlight,
    handleClear,
    dismiss,
    clearAll,
  } = useHighlights();

  useEffect(() => {
    if (phase !== "test") return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase !== "test") return;
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setCur(el.currentTime);
    const onMeta = () => setDur(el.duration);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
    };
  }, [phase]);

  const handleStart = () => {
    setPhase("test");
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setPlaying(true);
      }
    }, 400);
  };

  const onChange = (n, v) => setVals((p) => ({ ...p, [n]: v }));

  const handleSubmit = () => {
    if (audioRef.current) audioRef.current.pause();
    setPlaying(false);
    setPhase("done");
    setTimeout(() => {
      if (onComplete) onComplete(vals);
    }, 2000);
  };

  const totalAnswered = Object.values(vals).filter((v) => v !== "").length;
  const sectionProps = { vals, onChange, highlights, onSelect: handleSelect };

  if (phase === "done") return <DoneScreen />;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />
      {phase === "intro" && <IntroModal onStart={handleStart} />}

      {phase === "test" && (
        <div className="sticky top-0 z-40 shadow-sm">
          <AudioBar
            audioRef={audioRef}
            playing={playing}
            setPlaying={setPlaying}
            cur={cur}
            dur={dur}
          />
          <TabsBar
            active={active}
            setActive={setActive}
            vals={vals}
            timeLeft={timeLeft}
            onSubmit={handleSubmit}
            hlCount={highlights.length}
            onClearAll={clearAll}
          />
        </div>
      )}

      {phase === "test" && (
        <main className="flex-1 w-full px-4 py-8 listening-main">
          {/* Highlight hint */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-800 rounded-full transition-all duration-500"
                  style={{ width: `${(totalAnswered / 40) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-400 tabular-nums font-medium whitespace-nowrap">
                {totalAnswered} / 40
              </span>
            </div>
            <span className="text-xs text-gray-400 hidden sm:flex items-center gap-1.5 flex-shrink-0">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Select any text to highlight
            </span>
          </div>

          <div key={active}>
            {active === 0 && <Section1 {...sectionProps} />}
            {active === 1 && <Section2 {...sectionProps} />}
            {active === 2 && <Section3 {...sectionProps} />}
            {active === 3 && <Section4 {...sectionProps} />}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
            <button
              disabled={active === 0}
              onClick={() => setActive((a) => a - 1)}
              className="px-6 py-3 rounded-lg border border-gray-200 text-base font-medium text-gray-600 disabled:opacity-30 hover:border-gray-400 transition">
              ← Previous
            </button>
            {active < 3 ? (
              <button
                onClick={() => setActive((a) => a + 1)}
                className="px-6 py-3 rounded-lg bg-gray-900 text-white text-base font-medium hover:bg-gray-700 transition">
                Next Section →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-lg bg-gray-900 text-white text-base font-medium hover:bg-gray-700 transition">
                Submit Test ✓
              </button>
            )}
          </div>
        </main>
      )}

      {/* Floating highlight popup */}
      {selection && phase === "test" && (
        <SelectionPopup
          selection={selection}
          isHighlighted={isHighlighted}
          onHighlight={handleHighlight}
          onClear={handleClear}
          onDismiss={dismiss}
        />
      )}

      <style>{`
        /* Layout */
        .listening-container, .listening-main { width: 100%; max-width: 100%; margin: 0 auto; }
        @media (min-width: 1024px) {
          .listening-container, .listening-main { width: 80%; max-width: 1200px; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Highlight mark */
        .lt-mark {
          background: #FEF08A;
          color: #713F12;
          border-radius: 3px;
          padding: 0 2px;
          font: inherit;
          cursor: pointer;
        }
        .lt-mark:hover { background: #FDE047; }

        /* Floating popup */
        .lt-popup {
          position: absolute;
          z-index: 500;
          display: flex;
          background: #1E293B;
          border-radius: 10px;
          padding: 5px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.28);
          transition: opacity 0.12s ease;
        }
        .lt-popup::after {
          content: '';
          position: absolute;
          bottom: -6px; left: 50%; transform: translateX(-50%);
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #1E293B;
        }
        .lt-pop-btn {
          display: flex; align-items: center; gap: 7px;
          border: none; border-radius: 7px;
          padding: 9px 18px;
          font-size: 13px; font-weight: 700;
          cursor: pointer; transition: filter 0.15s;
          white-space: nowrap;
        }
        .lt-pop-btn:hover { filter: brightness(0.93); }
        .lt-pop-hl { background: #FEF08A; color: #713F12; }
        .lt-pop-cl { background: #FEE2E2; color: #991B1B; }
      `}</style>
    </div>
  );
}

export { CORRECT };
