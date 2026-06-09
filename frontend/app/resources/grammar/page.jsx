"use client";
import React, { useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────
//  GRAMMAR DATA
// ─────────────────────────────────────────────────────────────────

const grammarTopics = [
  {
    id: "tense",
    label: "Tense (কাল)",
    emoji: "⏱️",
    wordCount: "10 Tenses",
    color: {
      tag: "bg-red-100 text-red-700",
      accent: "from-red-500 to-orange-500",
      icon: "bg-red-50",
      chevron: "bg-red-50 text-red-500",
      tip: "bg-red-50 border-red-100 text-red-800",
      tipLabel: "text-red-600",
    },
    intro:
      "বাংলায় tense বোঝার সহজ উপায়: কাজটি কখন হয়েছে তা বোঝায়। IELTS Writing Task 1 ও 2-এ সঠিক tense ব্যবহার band score সরাসরি প্রভাবিত করে।",
    content: { type: "tense" },
  },
  {
    id: "sva",
    label: "Subject–Verb Agreement (কর্তা-ক্রিয়া মিল)",
    emoji: "🔗",
    wordCount: "8 Rules",
    color: {
      tag: "bg-orange-100 text-orange-700",
      accent: "from-orange-500 to-amber-500",
      icon: "bg-orange-50",
      chevron: "bg-orange-50 text-orange-500",
      tip: "bg-orange-50 border-orange-100 text-orange-800",
      tipLabel: "text-orange-600",
    },
    intro:
      "Subject খুঁজে বের করার নিয়ম: Verb-এর আগে প্রশ্ন করুন 'কে?' বা 'কী?'। যে উত্তর আসবে সেটাই Subject। তারপর Subject singular/plural বুঝে verb মেলান।",
    content: { type: "sva" },
  },
  {
    id: "voice",
    label: "Active & Passive Voice (কর্তৃবাচ্য ও কর্মবাচ্য)",
    emoji: "🔄",
    wordCount: "5 Patterns",
    color: {
      tag: "bg-amber-100 text-amber-700",
      accent: "from-amber-500 to-yellow-500",
      icon: "bg-amber-50",
      chevron: "bg-amber-50 text-amber-500",
      tip: "bg-amber-50 border-amber-100 text-amber-800",
      tipLabel: "text-amber-600",
    },
    intro:
      "IELTS Academic Writing-এ passive voice প্রচুর ব্যবহার হয় কারণ এটি formal এবং objective শোনায়। Passive বানানোর সূত্র সহজে মনে রাখুন।",
    content: { type: "voice" },
  },
  {
    id: "articles",
    label: "Articles — a, an, the (পদান্বয়ী অব্যয়)",
    emoji: "📌",
    wordCount: "4 Rules",
    color: {
      tag: "bg-red-100 text-red-700",
      accent: "from-red-500 to-rose-500",
      icon: "bg-red-50",
      chevron: "bg-red-50 text-red-500",
      tip: "bg-red-50 border-red-100 text-red-800",
      tipLabel: "text-red-600",
    },
    intro:
      "বাংলায় article নেই, তাই এটি বাংলাভাষীদের জন্য সবচেয়ে কঠিন ক্ষেত্র। নিচের তিনটি প্রশ্ন মাথায় রাখলেই সহজ হয়।",
    content: { type: "articles" },
  },
  {
    id: "conditionals",
    label: "Conditionals (শর্তমূলক বাক্য)",
    emoji: "🔀",
    wordCount: "5 Types",
    color: {
      tag: "bg-orange-100 text-orange-700",
      accent: "from-orange-500 to-red-500",
      icon: "bg-orange-50",
      chevron: "bg-orange-50 text-orange-500",
      tip: "bg-orange-50 border-orange-100 text-orange-800",
      tipLabel: "text-orange-600",
    },
    intro:
      "IELTS Writing Task 2 ও Speaking Part 3-এ conditionals ব্যবহার করলে sophisticated language দেখানো যায়। এটি Grammatical Range-এর প্রমাণ।",
    content: { type: "conditionals" },
  },
  {
    id: "modals",
    label: "Modal Verbs (সহায়ক ক্রিয়া)",
    emoji: "💬",
    wordCount: "9 Modals",
    color: {
      tag: "bg-red-100 text-red-700",
      accent: "from-red-600 to-orange-500",
      icon: "bg-red-50",
      chevron: "bg-red-50 text-red-500",
      tip: "bg-red-50 border-red-100 text-red-800",
      tipLabel: "text-red-600",
    },
    intro:
      "Modal verb-এর পরে সবসময় base form (V¹) আসে। Modal-এর সাথে কখনো -s/-es বা -ed যোগ হয় না। IELTS Writing-এ modal দিয়ে opinion express করা যায়।",
    content: { type: "modals" },
  },
  {
    id: "relative",
    label: "Relative Clauses (সম্বন্ধসূচক উপবাক্য)",
    emoji: "🔎",
    wordCount: "2 Types",
    color: {
      tag: "bg-amber-100 text-amber-700",
      accent: "from-amber-500 to-orange-500",
      icon: "bg-amber-50",
      chevron: "bg-amber-50 text-amber-500",
      tip: "bg-amber-50 border-amber-100 text-amber-800",
      tipLabel: "text-amber-600",
    },
    intro:
      "Complex sentence লেখার সবচেয়ে কার্যকর উপায় হলো relative clause। IELTS Writing-এ এটি Grammatical Range-এর প্রমাণ দেয়।",
    content: { type: "relative" },
  },
  {
    id: "reported",
    label: "Reported Speech (পরোক্ষ উক্তি)",
    emoji: "📢",
    wordCount: "Backshift Rules",
    color: {
      tag: "bg-orange-100 text-orange-700",
      accent: "from-orange-600 to-red-500",
      icon: "bg-orange-50",
      chevron: "bg-orange-50 text-orange-500",
      tip: "bg-orange-50 border-orange-100 text-orange-800",
      tipLabel: "text-orange-600",
    },
    intro:
      "IELTS Listening-এ reported speech note করতে হয়। Speaking Part 2-এ কাউকে quote করতে এই backshift rules ব্যবহার হয়।",
    content: { type: "reported" },
  },
];

// ─────────────────────────────────────────────────────────────────
//  CONTENT DATA
// ─────────────────────────────────────────────────────────────────

const tenseData = [
  {
    tense: "Simple Present",
    formula: "S + V(s/es)",
    signals: "always, usually, every day",
    example: "She writes reports daily.",
  },
  {
    tense: "Present Continuous",
    formula: "S + am/is/are + V-ing",
    signals: "now, currently, at the moment",
    example: "The graph is showing a rise.",
  },
  {
    tense: "Present Perfect",
    formula: "S + have/has + V³",
    signals: "since, for, already, yet, just",
    example: "Prices have increased since 2010.",
  },
  {
    tense: "Present Perfect Cont.",
    formula: "S + have/has been + V-ing",
    signals: "for, since, how long",
    example: "She has been studying for 3 hours.",
  },
  {
    tense: "Simple Past",
    formula: "S + V² / V-ed",
    signals: "yesterday, last year, ago, in 2005",
    example: "The population rose sharply in 1990.",
  },
  {
    tense: "Past Continuous",
    formula: "S + was/were + V-ing",
    signals: "while, when, at that time",
    example: "They were discussing the issue.",
  },
  {
    tense: "Past Perfect",
    formula: "S + had + V³",
    signals: "before, after, already, by the time",
    example: "She had finished before he arrived.",
  },
  {
    tense: "Simple Future",
    formula: "S + will/shall + V¹",
    signals: "tomorrow, next year, soon",
    example: "The trend will continue next decade.",
  },
  {
    tense: "Future Continuous",
    formula: "S + will be + V-ing",
    signals: "at this time tomorrow, next week",
    example: "They will be working on it tomorrow.",
  },
  {
    tense: "Future Perfect",
    formula: "S + will have + V³",
    signals: "by + future time",
    example: "By 2030, it will have risen further.",
  },
];

const svaRules = [
  {
    title: "Basic Singular Rule",
    bangla: "একক বিষয় → একক verb",
    formula: "She/He/It + V(s/es)",
    correct: "She writes well. / The student attends class.",
    wrong: "She write well. / The student attend class.",
  },
  {
    title: "Plural Subject",
    bangla: "বহুবচন বিষয় → বহুবচন verb",
    formula: "They/Students + V (no -s)",
    correct: "They write reports. / Students study hard.",
    wrong: "They writes reports. / Students studies hard.",
  },
  {
    title: "Collective Nouns",
    bangla: "দলবাচক বিশেষ্য → সাধারণত একক",
    formula: "team / group / committee + is / was",
    correct: "The team is ready. / The committee has decided.",
    wrong: "The team are ready. (informal only)",
  },
  {
    title: "There is / There are",
    bangla: "There-এর পরের noun দেখে verb ঠিক করুন",
    formula: "There is + singular | There are + plural",
    correct: "There is a problem. / There are many issues.",
    wrong: "There is many issues. / There are a problem.",
  },
  {
    title: "Intervening Phrase",
    bangla: "মাঝের phrase উপেক্ষা করুন",
    formula: "S + [of the / with the...] + V (match to S)",
    correct:
      "The quality of the reports is poor. / One of the students is absent.",
    wrong:
      "The quality of the reports are poor. / One of the students are absent.",
  },
  {
    title: "Either...or / Neither...nor",
    bangla: "কাছের subject অনুযায়ী verb",
    formula: "Neither X nor Y + V (match Y)",
    correct: "Neither the teacher nor the students are ready.",
    wrong: "Neither the students nor the teacher are ready.",
  },
  {
    title: "Indefinite Pronouns",
    bangla: "everyone, each, no one → সবসময় একক",
    formula: "everyone / each / nobody + is / has / does",
    correct: "Everyone has a role. / Each student is responsible.",
    wrong: "Everyone have a role. / Each students are responsible.",
  },
  {
    title: "Uncountable Nouns",
    bangla: "information, advice, news → সবসময় একক",
    formula: "Uncountable noun + is / was (never are/were)",
    correct: "The information is useful. / His advice was helpful.",
    wrong: "The information are useful. / His advice were helpful.",
  },
];

const voiceData = [
  {
    tense: "Simple Present",
    active: "write(s)",
    passive: "am/is/are + written",
  },
  { tense: "Simple Past", active: "wrote", passive: "was/were + written" },
  {
    tense: "Present Perfect",
    active: "have/has written",
    passive: "have/has been + written",
  },
  {
    tense: "Simple Future",
    active: "will write",
    passive: "will be + written",
  },
  {
    tense: "Modal",
    active: "can/must write",
    passive: "can/must be + written",
  },
];

const articlesData = [
  {
    article: "a",
    use: "First mention of a singular countable noun",
    example: "She wrote a report.",
    bangla: "প্রথমবার উল্লেখ",
  },
  {
    article: "an",
    use: "Before a vowel sound (not vowel letter)",
    example: "an hour / an MBA / a university",
    bangla: "স্বরধ্বনির আগে",
  },
  {
    article: "the",
    use: "Specific / unique / previously mentioned noun",
    example: "The report was published in 2020.",
    bangla: "নির্দিষ্ট বস্তু",
  },
  {
    article: "Ø (zero)",
    use: "Plural general, uncountable general, proper nouns",
    example: "Water is essential. / Countries trade goods.",
    bangla: "সাধারণ অর্থে",
  },
];

const conditionalsData = [
  {
    type: "Zero",
    ifClause: "If + Simple Present",
    mainClause: "Simple Present",
    meaning: "Always true facts",
    example: "If water boils, it evaporates.",
  },
  {
    type: "1st (Real)",
    ifClause: "If + Simple Present",
    mainClause: "will + V¹",
    meaning: "Likely future",
    example: "If you study, you will pass.",
  },
  {
    type: "2nd (Unreal)",
    ifClause: "If + Simple Past",
    mainClause: "would + V¹",
    meaning: "Imaginary present/future",
    example: "If I were rich, I would travel.",
  },
  {
    type: "3rd (Past unreal)",
    ifClause: "If + Past Perfect",
    mainClause: "would have + V³",
    meaning: "Impossible past",
    example: "If she had studied, she would have passed.",
  },
  {
    type: "Mixed",
    ifClause: "If + Past Perfect",
    mainClause: "would + V¹",
    meaning: "Past cause, present result",
    example: "If I had slept, I wouldn't be tired now.",
  },
];

const modalsData = [
  {
    modal: "must",
    bangla: "বাধ্যবাধকতা / নিশ্চিত অনুমান",
    strength: "100%",
    example: "Governments must invest in education.",
  },
  {
    modal: "should",
    bangla: "পরামর্শ / প্রত্যাশা",
    strength: "90%",
    example: "Students should manage their time.",
  },
  {
    modal: "will",
    bangla: "ভবিষ্যৎ / ইচ্ছা",
    strength: "90%",
    example: "This will have a positive impact.",
  },
  {
    modal: "can",
    bangla: "সক্ষমতা / সম্ভাবনা",
    strength: "70%",
    example: "Technology can solve many problems.",
  },
  {
    modal: "could",
    bangla: "অতীত সক্ষমতা / ভদ্র অনুরোধ",
    strength: "50%",
    example: "This could have a negative impact.",
  },
  {
    modal: "would",
    bangla: "শর্তযুক্ত / অতীত অভ্যাস",
    strength: "50%",
    example: "I would argue that education is key.",
  },
  {
    modal: "may",
    bangla: "আনুষ্ঠানিক সম্ভাবনা",
    strength: "40%",
    example: "The trend may continue next year.",
  },
  {
    modal: "might",
    bangla: "অনিশ্চিত সম্ভাবনা",
    strength: "30%",
    example: "This might affect the result.",
  },
  {
    modal: "need not",
    bangla: "প্রয়োজন নেই",
    strength: "—",
    example: "You needn't worry about minor errors.",
  },
];

const reportedData = [
  {
    direct: "Simple Present",
    reported: "Simple Past",
    directEx: '"I am tired," she said.',
    reportedEx: "She said she was tired.",
  },
  {
    direct: "Present Continuous",
    reported: "Past Continuous",
    directEx: '"I am studying," he said.',
    reportedEx: "He said he was studying.",
  },
  {
    direct: "Present Perfect",
    reported: "Past Perfect",
    directEx: '"I have finished," she said.',
    reportedEx: "She said she had finished.",
  },
  {
    direct: "Simple Past",
    reported: "Past Perfect",
    directEx: '"I went there," he said.',
    reportedEx: "He said he had gone there.",
  },
  {
    direct: "will → ",
    reported: "would",
    directEx: '"I will help," she said.',
    reportedEx: "She said she would help.",
  },
  {
    direct: "can → ",
    reported: "could",
    directEx: '"I can do it," he said.',
    reportedEx: "He said he could do it.",
  },
  {
    direct: "today → ",
    reported: "that day",
    directEx: '"I am busy today."',
    reportedEx: "She said she was busy that day.",
  },
  {
    direct: "tomorrow → ",
    reported: "the next day",
    directEx: '"I will call tomorrow."',
    reportedEx: "He said he would call the next day.",
  },
];

// ─────────────────────────────────────────────────────────────────
//  REUSABLE TABLE COMPONENT
// ─────────────────────────────────────────────────────────────────

function GrammarTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#e5e7eb]">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#0f172a]">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-xs font-bold text-white/60 uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-[#374151] border-b border-[#f3f4f6] align-top text-xs leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  CORRECT / WRONG PAIR
// ─────────────────────────────────────────────────────────────────

function ExamplePair({ correct, wrong }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
      <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <span>✓</span> Correct
        </p>
        <p className="text-xs text-[#374151] leading-relaxed">{correct}</p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <span>✗</span> Wrong
        </p>
        <p className="text-xs text-[#374151] leading-relaxed">{wrong}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  FORMULA BOX
// ─────────────────────────────────────────────────────────────────

function FormulaBox({ label, formula }) {
  return (
    <div className="bg-[#0f172a] rounded-xl px-4 py-3 mb-4 border border-white/5">
      {label && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">
          {label}
        </p>
      )}
      <p className="text-sm font-mono text-[#7dd3fc] leading-relaxed">
        {formula}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  IELTS TIP BOX
// ─────────────────────────────────────────────────────────────────

function TipBox({ color, label, children }) {
  return (
    <div className={`rounded-xl px-4 py-3 border mt-4 ${color}`}>
      <p className="text-xs font-bold mb-1">{label}</p>
      <p className="text-xs leading-relaxed">{children}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SVA RULE CARD (clickable)
// ─────────────────────────────────────────────────────────────────

function SVASection({ intro }) {
  const [active, setActive] = useState(null);
  const rule = active !== null ? svaRules[active] : null;

  return (
    <div>
      <p className="text-xs text-[#6b7280] leading-relaxed mb-4">{intro}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
        {svaRules.map((r, i) => (
          <div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className={`
              rounded-xl border cursor-pointer select-none transition-all duration-200 p-3 overflow-hidden relative
              ${
                active === i
                  ? "bg-gradient-to-br from-orange-500 to-amber-500 border-transparent"
                  : "bg-white border-[#e5e7eb] hover:border-orange-200 hover:shadow-sm hover:-translate-y-[1px]"
              }
            `}>
            <p
              className={`text-[10px] font-bold mb-1 ${active === i ? "text-white/50" : "text-[#d1d5db]"}`}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <p
              className={`text-xs font-bold leading-snug mb-0.5 ${active === i ? "text-white" : "text-[#111827]"}`}>
              {r.title}
            </p>
            <p
              className={`text-[10px] leading-snug ${active === i ? "text-white/70" : "text-[#9ca3af]"}`}>
              {r.bangla}
            </p>
          </div>
        ))}
      </div>
      {rule && (
        <div className="border border-[#f3f4f6] rounded-xl p-4 bg-[#fafafa] animate-fadeIn">
          <h4 className="text-sm font-bold text-[#111827] mb-3 flex items-center gap-2">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              {rule.title}
            </span>
          </h4>
          <FormulaBox label="Formula" formula={rule.formula} />
          <ExamplePair correct={rule.correct} wrong={rule.wrong} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  TOPIC CONTENT RENDERER
// ─────────────────────────────────────────────────────────────────

function TopicContent({ topic }) {
  const c = topic.content;
  const tc = topic.color;

  if (c.type === "tense") {
    return (
      <div>
        <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
          {topic.intro}
        </p>
        <GrammarTable
          headers={["Tense", "Formula", "Signal Words", "Example"]}
          rows={tenseData.map((r) => [
            `<strong>${r.tense}</strong>`,
            `<code class="text-red-500 text-[11px]">${r.formula}</code>`,
            `<span class="text-[#6b7280]">${r.signals}</span>`,
            `<em class="text-[#374151]">${r.example}</em>`,
          ])}
        />
        <TipBox color={tc.tip} label="⚡ IELTS Writing Task 1 Tip">
          Historical graph (past data) → Simple Past | Current/recent trend →
          Present Perfect | Future projection → Simple Future / will. এই তিনটি
          tense ঠিকমতো ব্যবহার করলে Grammatical Range &amp; Accuracy-তে ভালো
          score পাওয়া যায়।
        </TipBox>
      </div>
    );
  }

  if (c.type === "sva") {
    return <SVASection intro={topic.intro} />;
  }

  if (c.type === "voice") {
    return (
      <div>
        <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
          {topic.intro}
        </p>
        <FormulaBox
          label="Active → Passive (formula)"
          formula="Object + be (correct tense) + V³ + (by + Subject)"
        />
        <ExamplePair
          correct={`Active: Scientists discovered a new vaccine.\nPassive: A new vaccine was discovered (by scientists).`}
          wrong={`Wrong: A new vaccine was discover by scientists.\nWrong: A new vaccine discovered by scientists.`}
        />
        <div className="mt-4">
          <GrammarTable
            headers={["Tense", "Active", "Passive Formula"]}
            rows={voiceData.map((r) => [
              r.tense,
              `<span class="text-[#374151]">${r.active}</span>`,
              `<code class="text-amber-600 text-[11px]">${r.passive}</code>`,
            ])}
          />
        </div>
        <TipBox color={tc.tip} label="📝 IELTS Writing Tip">
          Writing Task 1-এ: "The chart shows..." (active) ও "It can be seen
          that..." (passive) — দুটো মিশিয়ে ব্যবহার করুন। Task 2-তে passive
          দিয়ে impersonal opinion দেওয়া যায়: "It is argued that..." / "It has
          been suggested that..."
        </TipBox>
      </div>
    );
  }

  if (c.type === "articles") {
    return (
      <div>
        <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
          {topic.intro}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {articlesData.map((a) => (
            <div
              key={a.article}
              className="border border-[#e5e7eb] rounded-xl p-3 text-center bg-white">
              <p className="text-2xl font-black text-red-500 mb-1">
                {a.article}
              </p>
              <p className="text-[10px] text-[#9ca3af] leading-snug mb-2">
                {a.bangla}
              </p>
              <p className="text-[10px] text-[#374151] leading-snug mb-2">
                {a.use}
              </p>
              <p className="text-[10px] italic text-[#6b7280] bg-[#f9fafb] rounded-lg px-2 py-1">
                {a.example}
              </p>
            </div>
          ))}
        </div>
        <ExamplePair
          correct={`The graph shows a significant rise. The rise occurred in 2010.\n"an" hour / "an" MBA / "a" university (vowel sound, not letter)`}
          wrong={`The information are useful. (❌ use "is")\nShe went to the school. (❌ general → use zero article)`}
        />
        <TipBox color={tc.tip} label="🔑 Key Test — বাংলাভাষীদের জন্য">
          মনে মনে জিজ্ঞেস করুন: কোনটি? নির্দিষ্ট হলে "the", প্রথমবার দেখা
          অনির্দিষ্ট হলে "a/an", সাধারণ অর্থে হলে কিছু না (Ø)।
        </TipBox>
      </div>
    );
  }

  if (c.type === "conditionals") {
    return (
      <div>
        <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
          {topic.intro}
        </p>
        <GrammarTable
          headers={["Type", "If-clause", "Main clause", "Meaning", "Example"]}
          rows={conditionalsData.map((r) => [
            `<strong>${r.type}</strong>`,
            `<code class="text-orange-500 text-[11px]">${r.ifClause}</code>`,
            `<code class="text-orange-500 text-[11px]">${r.mainClause}</code>`,
            `<span class="text-[#6b7280]">${r.meaning}</span>`,
            `<em class="text-[#374151]">${r.example}</em>`,
          ])}
        />
        <TipBox color={tc.tip} label="🔑 Key Rule">
          2nd Conditional-এ "If I was" নয়, সবসময় "If I <strong>were</strong>"
          — এটি formal/written English-এর নিয়ম এবং IELTS Writing ও Speaking-এ
          গুরুত্বপূর্ণ।
        </TipBox>
      </div>
    );
  }

  if (c.type === "modals") {
    return (
      <div>
        <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
          {topic.intro}
        </p>
        <FormulaBox
          label="Formula — always"
          formula="Subject + Modal + V¹ (base form) — never 'mights', 'cans', or 'musted'"
        />
        <GrammarTable
          headers={["Modal", "Meaning (বাংলা)", "Certainty", "IELTS Example"]}
          rows={modalsData.map((r) => [
            `<strong class="text-red-500">${r.modal}</strong>`,
            r.bangla,
            `<span class="text-[#9ca3af] font-mono text-[11px]">${r.strength}</span>`,
            `<em class="text-[#374151]">${r.example}</em>`,
          ])}
        />
        <TipBox color={tc.tip} label="📝 IELTS Writing Tip">
          Task 2 opinion paragraph-এ modal ব্যবহার করুন: "I would argue..."
          (formal) বা "It could be argued..." (impersonal)। এটি examiner-কে
          sophisticated language দেখায়।
        </TipBox>
      </div>
    );
  }

  if (c.type === "relative") {
    return (
      <div>
        <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
          {topic.intro}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          {[
            { word: "who", use: "মানুষ (person)" },
            { word: "which", use: "বস্তু (thing)" },
            { word: "that", use: "person/thing (defining only)" },
            { word: "whose", use: "মালিকানা (possession)" },
            { word: "where", use: "স্থান (place)" },
          ].map((w) => (
            <div
              key={w.word}
              className="border border-[#e5e7eb] rounded-xl p-3 text-center bg-white">
              <p className="text-base font-black text-amber-500 mb-1">
                {w.word}
              </p>
              <p className="text-[10px] text-[#6b7280] leading-snug">{w.use}</p>
            </div>
          ))}
        </div>
        <GrammarTable
          headers={["Type", "Commas?", "Can use 'that'?", "Example"]}
          rows={[
            [
              "<strong>Defining</strong>",
              "No commas",
              "Yes",
              "<em>The student who studies hard succeeds.</em>",
            ],
            [
              "<strong>Non-defining</strong>",
              "With commas",
              "No — who/which only",
              "<em>The report, which was published in 2020, is important.</em>",
            ],
          ]}
        />
        <ExamplePair
          correct={`The country that invested most grew fastest.\nLondon, which is the capital, is very crowded.`}
          wrong={`London, that is the capital, is crowded. (❌ non-defining cannot use "that")\nThe student which studies hard... (❌ "which" is for things, not people)`}
        />
      </div>
    );
  }

  if (c.type === "reported") {
    return (
      <div>
        <p className="text-xs text-[#6b7280] leading-relaxed mb-4">
          {topic.intro}
        </p>
        <GrammarTable
          headers={[
            "Direct Speech",
            "Reported (backshift)",
            "Direct Example",
            "Reported Example",
          ]}
          rows={reportedData.map((r) => [
            `<strong>${r.direct}</strong>`,
            `<code class="text-orange-500 text-[11px]">${r.reported}</code>`,
            `<em class="text-[#6b7280] text-[11px]">${r.directEx}</em>`,
            `<em class="text-[#374151] text-[11px]">${r.reportedEx}</em>`,
          ])}
        />
        <TipBox color={tc.tip} label="📢 Reporting Verbs for IELTS">
          said / told / explained / claimed / argued / suggested / admitted /
          denied / announced — এই verbs দিয়ে reported speech শুরু করুন। "said
          to" নয়, "told" ব্যবহার করুন।
        </TipBox>
      </div>
    );
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────
//  TOPIC SECTION (collapsible)
// ─────────────────────────────────────────────────────────────────

function TopicSection({ topic }) {
  const [open, setOpen] = useState(false);

  return (
    <section
      id={topic.id}
      className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-sm
                 hover:shadow-md hover:border-red-100 transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-6 py-4 text-left group/hdr hover:bg-red-50/30 transition-colors duration-200">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${topic.color.icon}`}>
          {topic.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-bold text-[#111827] group-hover/hdr:text-red-600 transition-colors duration-200 leading-snug">
            {topic.label}
          </h2>
          <p className="text-xs text-[#9ca3af] mt-0.5">
            Tap to expand — formulas, rules, and IELTS tips
          </p>
        </div>
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold border ${topic.color.tag}`}>
          {topic.wordCount}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
            ${open ? `${topic.color.chevron}` : "bg-[#f3f4f6] text-[#9ca3af] group-hover/hdr:bg-red-50 group-hover/hdr:text-red-400"}`}>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <path
              d="M4 6l4 4 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Accent bar */}
      <div
        className={`h-0.5 w-full bg-gradient-to-r ${topic.color.accent} ${open ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />

      {/* Body */}
      {open && (
        <div className="px-6 py-5">
          <TopicContent topic={topic} />
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────────────────────────

export default function GrammarPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return grammarTopics;
    const q = search.toLowerCase();
    return grammarTopics.filter(
      (t) =>
        t.label.toLowerCase().includes(q) ||
        t.intro.toLowerCase().includes(q) ||
        t.wordCount.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ══════════ HERO ══════════ */}
      <div className="w-full bg-[#0f172a] relative overflow-hidden">
        {/* Glows */}
        <div
          className="pointer-events-none absolute -top-32 right-0 w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, #ef4444 0%, transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 65%)",
          }}
        />

        <div className="relative w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-0">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
              Grammar
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3">
                IELTS{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Grammar Guide
                </span>
              </h1>
              <p className="text-white/50 text-base max-w-2xl leading-relaxed">
                Master the grammar structures that appear repeatedly in IELTS
                Listening, Reading, Writing &amp; Speaking — with formulas,
                tables, and বাংলা tips for every rule.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              {[
                { v: grammarTopics.length, l: "Topics" },
                { v: "40+", l: "Rules" },
                { v: "Tap", l: "Expand" },
                { v: "বাংলা", l: "Tips" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center min-w-[80px]
                             hover:bg-white/10 transition-all duration-200 cursor-default">
                  <p className="text-lg font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    {s.v}
                  </p>
                  <p className="text-white/40 text-[11px] mt-0.5 font-medium">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick-jump pills */}
          <div className="flex flex-wrap gap-2 pb-6 border-t border-white/10 pt-5">
            <span className="text-white/30 text-xs font-semibold self-center mr-1">
              Jump to:
            </span>
            {grammarTopics.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10
                           text-white/50 text-xs font-medium hover:bg-white/10 hover:text-white/80
                           hover:border-white/20 transition-all duration-200">
                <span>{t.emoji}</span>
                <span>{t.label.split("(")[0].trim()}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ TOOLBAR ══════════ */}
      <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="py-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-4 h-4">
                <circle cx="9" cy="9" r="6" />
                <path d="M15 15l-3-3" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search topic or rule…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white border border-[#e5e7eb] rounded-xl text-sm
                         focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400
                         text-[#111827] placeholder:text-[#9ca3af] transition-all duration-200 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#e5e7eb]
                           hover:bg-red-100 flex items-center justify-center transition-colors duration-150">
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-3 h-3 text-[#6b7280]">
                  <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Count */}
          <div className="flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-xl px-4 py-3 shadow-sm shrink-0">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
            <span className="text-sm text-[#374151]">
              <span className="font-bold text-[#111827]">
                {filtered.length}
              </span>
              <span className="text-[#9ca3af]">
                {" "}
                / {grammarTopics.length} topics
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ══════════ TOPIC LIST ══════════ */}
      <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 space-y-4">
        {filtered.map((topic) => (
          <TopicSection key={topic.id} topic={topic} />
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#e5e7eb] flex items-center justify-center mb-4 text-2xl">
              🔍
            </div>
            <p className="text-[#374151] font-semibold text-lg mb-1">
              No topics found
            </p>
            <p className="text-[#9ca3af] text-sm">
              Try a different grammar topic name
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500
                         text-white text-sm font-semibold hover:shadow-md hover:shadow-red-200
                         transition-all duration-200 hover:-translate-y-0.5">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
