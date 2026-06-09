"use client";
import React, { useState } from "react";

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────

const synonyms = [
  { no: 1,  word: "Important",       s1: "crucial",          s2: "vital",               s3: "essential",          s4: "significant" },
  { no: 2,  word: "Increase",        s1: "rise",             s2: "grow",                s3: "escalate",           s4: "surge" },
  { no: 3,  word: "Decrease",        s1: "decline",          s2: "reduce",              s3: "drop",               s4: "diminish" },
  { no: 4,  word: "Problem",         s1: "issue",            s2: "challenge",           s3: "concern",            s4: "drawback" },
  { no: 5,  word: "Solution",        s1: "remedy",           s2: "measure",             s3: "mitigate",           s4: "approach" },
  { no: 6,  word: "Advantage",       s1: "benefit",          s2: "merit",               s3: "strength",           s4: "positive aspect" },
  { no: 7,  word: "Disadvantage",    s1: "drawback",         s2: "downside",            s3: "limitation",         s4: "negative aspect" },
  { no: 8,  word: "Cause",           s1: "reason",           s2: "factor",              s3: "source",             s4: "trigger" },
  { no: 9,  word: "Effect",          s1: "impact",           s2: "consequence",         s3: "outcome",            s4: "result" },
  { no: 10, word: "Society",         s1: "community",        s2: "population",          s3: "public",             s4: "general public" },
  { no: 11, word: "People",          s1: "individuals",      s2: "citizens",            s3: "residents",          s4: "members of society" },
  { no: 12, word: "Government",      s1: "authorities",      s2: "the state",           s3: "policymakers",       s4: "public sector" },
  { no: 13, word: "Help",            s1: "assist",           s2: "support",             s3: "aid",                s4: "facilitate" },
  { no: 14, word: "Develop",         s1: "improve",          s2: "enhance",             s3: "advance",            s4: "expand" },
  { no: 15, word: "Think",           s1: "believe",          s2: "argue",               s3: "claim",              s4: "maintain" },
  { no: 16, word: "Improve",         s1: "enhance",          s2: "boost",               s3: "upgrade",            s4: "strengthen" },
  { no: 17, word: "Reduce",          s1: "minimize",         s2: "lower",               s3: "limit",              s4: "cut down" },
  { no: 18, word: "Important role",  s1: "key role",         s2: "vital role",          s3: "major role",         s4: "significant role" },
  { no: 19, word: "Use",             s1: "utilize",          s2: "employ",              s3: "apply",              s4: "make use of" },
  { no: 20, word: "Need",            s1: "require",          s2: "demand",              s3: "necessity",          s4: "call for" },
  { no: 21, word: "Get",             s1: "obtain",           s2: "acquire",             s3: "gain",               s4: "receive" },
  { no: 22, word: "Change",          s1: "alter",            s2: "modify",              s3: "transform",          s4: "shift" },
  { no: 23, word: "Support (noun)",  s1: "assistance",       s2: "backing",             s3: "aid",                s4: "encouragement" },
  { no: 24, word: "Dangerous",       s1: "harmful",          s2: "risky",               s3: "hazardous",          s4: "unsafe" },
  { no: 25, word: "Safe",            s1: "secure",           s2: "harmless",            s3: "protected",          s4: "risk-free" },
  { no: 26, word: "Big",             s1: "large",            s2: "major",               s3: "significant",        s4: "considerable" },
  { no: 27, word: "Small",           s1: "minor",            s2: "limited",             s3: "slight",             s4: "minimal" },
  { no: 28, word: "Many",            s1: "numerous",         s2: "several",             s3: "a large number of",  s4: "plenty of" },
  { no: 29, word: "Few",             s1: "limited",          s2: "a small number of",   s3: "scarce",             s4: "minimal" },
  { no: 30, word: "Important Issue", s1: "major issue",      s2: "serious problem",     s3: "key concern",        s4: "pressing issue" },
  { no: 31, word: "Solve",           s1: "address",          s2: "tackle",              s3: "resolve",            s4: "deal with" },
  { no: 32, word: "Encourage",       s1: "promote",          s2: "motivate",            s3: "foster",             s4: "support" },
  { no: 33, word: "Prevent",         s1: "avoid",            s2: "stop",                s3: "restrict",           s4: "hinder" },
  { no: 34, word: "Allow",           s1: "permit",           s2: "enable",              s3: "let",                s4: "give opportunity to" },
  { no: 35, word: "Improve",         s1: "enhance living",   s2: "raise quality of life", s3: "better lifestyle", s4: "improve wellbeing" },
  { no: 36, word: "Result in",       s1: "lead to",          s2: "cause",               s3: "bring about",        s4: "give rise to" },
  { no: 39, word: "Nowadays",        s1: "these days",       s2: "currently",           s3: "at present",         s4: "in modern times" },
  { no: 40, word: "In my opinion",   s1: "I believe",        s2: "I think",             s3: "from my perspective", s4: "in my view" },
  { no: 41, word: "Important factor",s1: "key factor",       s2: "major factor",        s3: "significant factor", s4: "crucial element" },
  { no: 42, word: "Bad",             s1: "negative",         s2: "harmful",             s3: "damaging",           s4: "undesirable" },
  { no: 43, word: "Good",            s1: "positive",         s2: "beneficial",          s3: "advantageous",       s4: "favorable" },
  { no: 44, word: "Job",             s1: "occupation",       s2: "profession",          s3: "career",             s4: "employment" },
  { no: 45, word: "Study",           s1: "education",        s2: "learning",            s3: "academic study",     s4: "schooling" },
  { no: 47, word: "Environment",     s1: "natural world",    s2: "ecosystem",           s3: "surroundings",       s4: "environment" },
  { no: 48, word: "Health",          s1: "wellbeing",        s2: "physical health",     s3: "mental health",      s4: "fitness" },
  { no: 49, word: "Responsibility",  s1: "duty",             s2: "obligation",          s3: "accountability",     s4: "role" },
  { no: 50, word: "Future",          s1: "coming years",     s2: "long term",           s3: "upcoming period",    s4: "Long run" },
];

const task2Topics = [
  {
    no: 1, title: "Advertising", type: "Opinion",
    question: "Some people believe that advertising encourages people to buy things they do not need. To what extent do you agree or disagree?",
    ts1: { points: ["Manipulate consumer decisions"], examples: ["emotions beat logic", "celebrity endorsements"] },
    ts2: { points: ["Creates artificial needs"], examples: ["minor problems exaggerated", "presenting products as essential solutions"] },
    lexical: "Target potential customers, promote products effectively, use celebrity endorsement, present products as essential solutions.",
  },
  {
    no: 2, title: "Animal Rights", type: "Discussion",
    question: "Many people believe that animals should have the same rights as humans, while others think humans must use animals for food and research. Discuss both views and give your opinion.",
    ts1: { points: ["Emotions and awareness"], examples: ["they can feel pain and suffer", "morally unacceptable and inhumane"] },
    ts2: { points: ["Meet essential needs"], examples: ["important source of nutrition", "medical research and medicine"] },
    lexical: "Use animals for research, raise ethical concerns, treat animals humanely, serve human purposes, morally unacceptable treatment, conduct medical research.",
  },
  {
    no: 3, title: "Cities", type: "Problem/Solution",
    question: "In many cities around the world, traffic congestion is becoming a major problem. What are the causes of this issue, and what solutions can you suggest?",
    ts1: { points: ["Rapid increase in private vehicles"], examples: ["populations grow", "more people can afford cars"] },
    ts2: { points: ["Improve and expand public transportation"], examples: ["affordable, reliable buses", "metro systems can encourage"] },
    lexical: "Rely on private vehicles, improve public transport systems, face daily commuting problems, reduce road traffic.",
  },
  {
    no: 4, title: "Crime", type: "Discussion",
    question: "Some people think that the best way to reduce crime is to give longer prison sentences. Others believe that there are better ways to reduce crime. Discuss both views and give your own opinion.",
    ts1: { points: ["Most effective way to reduce crime"], examples: ["creates fear", "discouraging potential criminals"] },
    ts2: { points: ["Rehabilitation"], examples: ["education, job training", "address the root causes of crime"] },
    lexical: "Commit serious crimes, prevent criminal behaviour, discourage potential offenders, focus on rehabilitation programs, address root causes of crime.",
  },
  {
    no: 5, title: "Education", type: "Discussion",
    question: "Some people think the main purpose of education is to prepare individuals to be useful members of society. Others believe education helps people achieve personal ambitions. Discuss both views and give your own opinion.",
    ts1: { points: ["Skilled and competitive workforce"], examples: ["schools and universities teach skills, discipline"] },
    ts2: { points: ["People achieve personal ambitions"], examples: ["develop talents and pursue careers that match their interests"] },
    lexical: "Gain practical skills, achieve academic success, prepare for future careers, support personal development, improve the education system.",
  },
  {
    no: 6, title: "Environment", type: "Discussion",
    question: "Many people believe that individuals can do little to help protect the environment, while others think that individual actions can make a significant difference. Discuss both views and give your opinion.",
    ts1: { points: ["Individual efforts are ineffective"], examples: ["environmental damage driven mainly by governments and industries"] },
    ts2: { points: ["Individual behaviour plays a crucial role"], examples: ["millions reducing waste creates a significant combined effect"] },
    lexical: "Protect the environment, reduce carbon emissions, adopt a sustainable lifestyle, tackle environmental issues, raise public awareness.",
  },
  {
    no: 7, title: "Family", type: "Cause & Opinion",
    question: "In some countries, more adults are choosing to live with their parents after finishing education rather than moving out. Why is this happening, and do you think it is a positive or negative development?",
    ts1: { points: ["Increasing cost of housing"], examples: ["young people simply cannot afford rent", "financial problems after study"] },
    ts2: { points: ["Negative despite financial advantages"], examples: ["limits independence", "hinders personal development"] },
    lexical: "Rely on financial support, become financially independent, face high living costs, follow cultural traditions, limit personal independence.",
  },
  {
    no: 8, title: "Gender", type: "Discussion",
    question: "Some people think that men and women should be paid equally when they do the same job. Others believe that pay should depend on performance rather than gender. Discuss both views and give your opinion.",
    ts1: { points: ["Promote gender equality"], examples: ["both performing the same role", "should receive identical salaries regardless of gender"] },
    ts2: { points: ["Performance-based pay encourages efficiency"], examples: ["rewards strong output", "deserve good salary based on merit"] },
    lexical: "Face workplace discrimination, ensure fair opportunities, reward strong performance, improve workplace productivity.",
  },
  {
    no: 9, title: "Genetic Engineering", type: "Discussion",
    question: "Genetic engineering is an important issue in modern science. Some people think it will improve people's lives in many ways, while others are concerned about its risks. Discuss both views and give your opinion.",
    ts1: { points: ["Significantly improve human health"], examples: ["medicines and vaccines", "gene therapy"] },
    ts2: { points: ["Serious ethical and safety risks"], examples: ["misuse creating 'designer babies'", "threatens human existence"] },
    lexical: "Bring medical benefits, raise ethical issues, pose potential risks, lead to misuse of technology.",
  },
  {
    no: 10, title: "Global Issues", type: "Problem/Solution",
    question: "Global warming is one of the biggest threats to our environment today. What are the causes of global warming, and what measures can governments and individuals take to tackle it?",
    ts1: { points: ["Human activities as main cause"], examples: ["burning of fossil fuels", "deforestation"] },
    ts2: { points: ["Governments and individuals can act"], examples: ["invest in renewable energy", "adopting eco-friendly habits"] },
    lexical: "Cause climate change, release greenhouse gases, reduce environmental damage, take effective measures, protect the planet.",
  },
  {
    no: 11, title: "Government & Society", type: "Opinion",
    question: "Some people believe that governments should spend more money on public services rather than on the arts. To what extent do you agree or disagree?",
    ts1: { points: ["Essential for people's daily lives"], examples: ["services improve living standards", "reduces social inequality"] },
    ts2: { points: ["Arts necessary for a balanced society"], examples: ["create jobs and attract tourists"] },
    lexical: "Widen social inequality, maintain cultural identity, contribute to economic growth.",
  },
  {
    no: 12, title: "Guns and Weapons", type: "Discussion",
    question: "Some people believe that everyone has the right to own a gun for self-defense, while others think this leads to more violence and crime. Discuss both views and give your opinion.",
    ts1: { points: ["Provide personal protection"], examples: ["defend against criminals or intruders", "gives a sense of security"] },
    ts2: { points: ["Increases violence and crime"], examples: ["criminals can obtain guns illegally", "more accidents, murders, and domestic violence"] },
    lexical: "Ensure personal safety, reduce violent crime, regulate gun ownership, protect citizens, prevent misuse of weapons.",
  },
  {
    no: 13, title: "Health", type: "Problem/Solution",
    question: "Many people today are suffering from illnesses related to stress. What are the main causes of stress in modern life, and how can this problem be tackled?",
    ts1: { points: ["Work pressure and lifestyle demands"], examples: ["long working hours & job insecurity", "fast-paced lifestyles and financial problems"] },
    ts2: { points: ["Personal strategies and government support"], examples: ["exercising, meditating", "promoting mental health programs, flexible work hours"] },
    lexical: "Suffer from stress, face work pressure, affect mental health, maintain work-life balance, adopt healthy habits, receive government support.",
  },
  {
    no: 14, title: "Housing & Architecture", type: "Discussion",
    question: "Some people think new houses should be built in the same style as the older houses in the area. Others believe people should have the freedom to design their own houses. Discuss both views and give your opinion.",
    ts1: { points: ["Preserve the area's character"], examples: ["cultural heritage and traditional look", "more attractive for tourism"] },
    ts2: { points: ["Suit modern needs and tastes"], examples: ["creativity, innovation, energy-efficient solutions", "meets personal needs and lifestyles"] },
    lexical: "Follow local styles, improve living conditions, reflect cultural heritage.",
  },
  {
    no: 15, title: "Language", type: "Opinion",
    question: "In many countries, English has become the main language of communication. Do the advantages of having one common language outweigh the disadvantages?",
    ts1: { points: ["Communication and development"], examples: ["business, travel, and education", "promotes cultural exchange between nations"] },
    ts2: { points: ["Local languages and identities may decline"], examples: ["prioritize English over mother tongues", "those who cannot learn English face difficulties"] },
    lexical: "Facilitate global communication, lose cultural identity, face language barriers, connect globally, support international development.",
  },
  {
    no: 16, title: "Money", type: "Discussion",
    question: "Some people think that happiness can be achieved through wealth and material possessions. Others think that true happiness comes from relationships and experiences. Discuss both views and give your opinion.",
    ts1: { points: ["Wealth and material possessions bring happiness"], examples: ["provide comfort, security", "joy, status, and social recognition"] },
    ts2: { points: ["Happiness from relationships and experiences"], examples: ["emotional support, love, and long-lasting joy", "traveling, learning, or hobbies"] },
    lexical: "Achieve financial success, bring happiness, depend on relationships, improve quality of life, gain life satisfaction, bring financial security.",
  },
  {
    no: 17, title: "Personality", type: "Discussion",
    question: "Some people believe that personality is something people are born with, while others think it can be developed through experience. Discuss both views and give your opinion.",
    ts1: { points: ["Determined by genetics"], examples: ["depends on characteristics of parents", "family environment and inherited traits"] },
    ts2: { points: ["Developed through experience and learning"], examples: ["life experiences, education, social interactions", "skills like confidence, leadership and communication"] },
    lexical: "Depend on experiences, influence character, improve personal traits, build social skills, improve personal qualities.",
  },
  {
    no: 18, title: "Sports & Leisure", type: "Discussion",
    question: "Some people think that sports play an important role in society, while others believe they are only a form of entertainment. Discuss both views and give your opinion.",
    ts1: { points: ["Reducing health problems and building skills"], examples: ["improves physical and mental health", "teamwork, discipline, and leadership"] },
    ts2: { points: ["Serve as a form of entertainment"], examples: ["relaxation and enjoyment", "revenue through broadcasting, sponsorships, tourism"] },
    lexical: "Improve physical health, take part in sports, build team spirit, provide entertainment, play a social role.",
  },
  {
    no: 19, title: "Television, Internet, Phones", type: "Opinion",
    question: "Nowadays, more people spend their free time using smartphones, computers, and the internet instead of socializing in person. Do the advantages of this trend outweigh the disadvantages?",
    ts1: { points: ["Enhances communication"], examples: ["social media and messaging apps", "making free time more productive"] },
    ts2: { points: ["Reduces face-to-face interaction"], examples: ["weakens real-life social relationships", "eye strain, stress, and poor sleep"] },
    lexical: "Affect social relationships, increase screen time, enhance communication methods, damage social relationships.",
  },
  {
    no: 20, title: "Tourism", type: "Opinion",
    question: "Tourism brings many economic benefits to a country, but it can also cause environmental and cultural damage. To what extent do you agree or disagree?",
    ts1: { points: ["Country's economic development"], examples: ["jobs in hotels, transport, and local businesses", "taxes and foreign currency earnings"] },
    ts2: { points: ["Harms environment and local culture"], examples: ["leads to pollution, damage to natural sites", "local traditions may be commercialized"] },
    lexical: "Boost the economy, create job opportunities, damage the environment, affect local culture, attract foreign visitors.",
  },
  {
    no: 21, title: "Traditional vs Modern", type: "Discussion",
    question: "Some people believe it is important to preserve traditional culture, while others think modern life requires people to move away from traditions. Discuss both views and give your opinion.",
    ts1: { points: ["Protect cultural identity"], examples: ["preserve traditions", "helps people understand history and values"] },
    ts2: { points: ["Difficult to follow all traditional customs"], examples: ["outdated and limits personal freedom", "modern lifestyles demand flexibility and innovation"] },
    lexical: "Preserve cultural identity, maintain traditional values, understand historical roots, limit personal freedom, adapt to modern lifestyles.",
  },
  {
    no: 22, title: "Transport", type: "Problem/Solution",
    question: "The increasing number of cars in cities has led to serious pollution and traffic problems. What are the main causes of this, and how can governments encourage people to use public transport?",
    ts1: { points: ["Rapid growth in private car use"], examples: ["urban populations increase", "more people can afford cars"] },
    ts2: { points: ["Improve and expand public transportation"], examples: ["affordable, reliable buses", "metro systems can encourage"] },
    lexical: "Rely on private vehicles, improve public transport systems, face daily commuting problems, reduce road traffic.",
  },
  {
    no: 23, title: "Water", type: "Problem/Solution",
    question: "Water scarcity is becoming a major problem in many parts of the world. What are the causes of this problem, and what solutions can be implemented?",
    ts1: { points: ["Population growth & climate change"], examples: ["demand for clean water rises", "droughts reduce rainfall in many regions"] },
    ts2: { points: ["Better management and conservation"], examples: ["improve water infrastructure and control wastage", "individuals can save water responsibly"] },
    lexical: "Face water shortages, waste water resources, protect natural resources, improve water management.",
  },
  {
    no: 24, title: "Work", type: "Discussion",
    question: "Some people believe that job satisfaction is more important than job security, while others think having a permanent job is better. Discuss both views and give your opinion.",
    ts1: { points: ["Motivation and quality of life"], examples: ["more engaged, perform better", "suffer less stress"] },
    ts2: { points: ["Provides long-term financial stability"], examples: ["permanent job ensures a steady income", "plan for the future and meet family responsibilities"] },
    lexical: "Find job satisfaction, work in good conditions, achieve career goals, gain professional experience, ensure financial stability, plan for the future.",
  },
];

// ─────────────────────────────────────────────
//  CONFIG
// ─────────────────────────────────────────────

const TYPE_CFG = {
  "Opinion":         { bg: "bg-orange-50",  text: "text-orange-600", border: "border-orange-200", accent: "#f97316" },
  "Discussion":      { bg: "bg-red-50",     text: "text-red-600",    border: "border-red-200",    accent: "#ef4444" },
  "Problem/Solution":{ bg: "bg-amber-50",   text: "text-amber-700",  border: "border-amber-200",  accent: "#d97706" },
  "Cause & Opinion": { bg: "bg-rose-50",    text: "text-rose-600",   border: "border-rose-200",   accent: "#f43f5e" },
};

const SYN_COLORS = [
  "bg-red-50 text-red-700",
  "bg-orange-50 text-orange-700",
  "bg-amber-50 text-amber-700",
  "bg-rose-50 text-rose-700",
];

// ─────────────────────────────────────────────
//  ICONS
// ─────────────────────────────────────────────

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
    <circle cx="9" cy="9" r="6" /><path d="M15 15l-3-3" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}
    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────
//  TOPIC CARD
// ─────────────────────────────────────────────

function TopicCard({ topic, isOpen, onToggle }) {
  const tc = TYPE_CFG[topic.type] ?? TYPE_CFG["Opinion"];

  return (
    <div
      className={`
        group bg-white rounded-2xl border overflow-hidden
        transition-all duration-300 ease-out
        ${isOpen
          ? "border-red-300 shadow-lg shadow-red-100/60"
          : "border-[#e5e7eb] hover:border-red-200 hover:shadow-md hover:shadow-red-50/80 hover:-translate-y-[1px]"}
      `}
    >
      {/* ── Header ── */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-4 text-left group/btn"
      >
        {/* Number badge */}
        <span className={`
          shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          text-sm font-bold text-white
          transition-all duration-300
          ${isOpen
            ? "bg-gradient-to-br from-red-500 to-orange-500 shadow-md shadow-red-200"
            : "bg-[#f3f4f6] text-[#6b7280] group-hover/btn:bg-gradient-to-br group-hover/btn:from-red-500 group-hover/btn:to-orange-500 group-hover/btn:text-white group-hover/btn:shadow-md group-hover/btn:shadow-red-200"}
        `}>
          {topic.no}
        </span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-0.5">
            <span className={`font-semibold text-[#111827] text-[15px] transition-colors duration-200 ${isOpen ? "text-red-600" : "group-hover/btn:text-red-600"}`}>
              {topic.title}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${tc.bg} ${tc.text} ${tc.border}`}>
              {topic.type}
            </span>
          </div>
          <p className={`text-xs leading-relaxed transition-colors duration-200
            ${isOpen ? "text-[#374151]" : "text-[#9ca3af] group-hover/btn:text-[#6b7280]"} line-clamp-1`}>
            {topic.question}
          </p>
        </div>

        {/* Chevron */}
        <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
          ${isOpen ? "bg-red-50 text-red-500" : "bg-[#f9fafb] text-[#9ca3af] group-hover/btn:bg-red-50 group-hover/btn:text-red-400"}`}>
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      {/* ── Expanded body ── */}
      <div className={`transition-all duration-300 ease-out overflow-hidden
        ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 border-t border-[#f3f4f6]">

          {/* Question block */}
          <div className="mt-5 mb-5 relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-red-500 to-orange-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mb-1.5">Question</p>
            <p className="text-sm text-[#374151] leading-relaxed">{topic.question}</p>
          </div>

          {/* TS columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[topic.ts1, topic.ts2].map((ts, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-4 transition-all duration-200 hover:shadow-sm
                  ${idx === 0
                    ? "bg-red-50/60 border-red-100 hover:border-red-200"
                    : "bg-orange-50/60 border-orange-100 hover:border-orange-200"}`}
              >
                <div className={`flex items-center gap-2 mb-3`}>
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-white
                    ${idx === 0 ? "bg-red-500" : "bg-orange-500"}`}>
                    TS
                  </span>
                  <span className={`text-xs font-bold ${idx === 0 ? "text-red-600" : "text-orange-600"}`}>
                    Topic Sentence {idx + 1}
                  </span>
                </div>

                {ts.points.map((p, pi) => (
                  <p key={pi} className="text-sm font-semibold text-[#111827] mb-2 leading-snug">{p}</p>
                ))}

                <div className="space-y-1.5 mt-2">
                  {ts.examples.map((ex, ei) => (
                    <div key={ei} className="flex items-start gap-2">
                      <span className={`text-[10px] font-bold mt-[3px] shrink-0 ${idx === 0 ? "text-red-400" : "text-orange-400"}`}>EX</span>
                      <p className="text-xs text-[#374151] leading-relaxed">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Lexical resource */}
          <div className="rounded-xl bg-[#f9fafb] border border-[#e5e7eb] px-5 py-3.5 flex items-start gap-3">
            <span className="shrink-0 mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth={1.8} className="w-3 h-3">
                <path d="M2 4h8M2 7h5" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af] mb-1">Lexical Resource</p>
              <p className="text-xs text-[#374151] leading-relaxed">{topic.lexical}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SYNONYM TABLE
// ─────────────────────────────────────────────

function SynonymTable({ search }) {
  const filtered = search
    ? synonyms.filter((r) =>
        [r.word, r.s1, r.s2, r.s3, r.s4].some((v) => v.toLowerCase().includes(search.toLowerCase()))
      )
    : synonyms;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Synonym Bank</h2>
          <p className="text-sm text-[#6b7280] mt-1">50 essential IELTS words — 4 synonyms each to boost your Lexical Resource score</p>
        </div>
        <span className="self-start sm:self-auto text-xs font-semibold text-[#6b7280] bg-[#f3f4f6] px-3 py-1.5 rounded-full whitespace-nowrap">
          {filtered.length} / {synonyms.length} words
        </span>
      </div>

      {/* Tip */}
      <div className="flex items-start gap-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl px-5 py-3.5 mb-6">
        <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-red-500 to-orange-500 shrink-0" />
        <p className="text-sm text-[#374151]">
          Avoid repetition — swap common words with these synonyms to improve your
          <strong className="text-red-600"> Lexical Resource</strong> band score in Task 2.
        </p>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-gradient-to-r from-red-500 to-orange-500">
                <th className="px-4 py-3.5 text-left text-xs font-bold text-white/80 uppercase tracking-wider w-12">No.</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-white uppercase tracking-wider">Common Word</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-white/90 uppercase tracking-wider">Synonym 1</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-white/90 uppercase tracking-wider">Synonym 2</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-white/90 uppercase tracking-wider">Synonym 3</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-white/90 uppercase tracking-wider">Synonym 4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {filtered.map((row, i) => (
                <tr
                  key={row.no}
                  className={`
                    group transition-colors duration-150 cursor-default
                    ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}
                    hover:bg-red-50/40
                  `}
                >
                  <td className="px-4 py-3 text-xs text-[#9ca3af] font-medium">{row.no}</td>
                  <td className="px-5 py-3">
                    <span className="font-semibold text-[#111827] text-sm group-hover:text-red-600 transition-colors duration-150">
                      {row.word}
                    </span>
                  </td>
                  {[row.s1, row.s2, row.s3, row.s4].map((syn, si) => (
                    <td key={si} className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium
                        transition-all duration-200 hover:scale-105 cursor-default
                        ${SYN_COLORS[si]}`}>
                        {syn}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-[#9ca3af] text-sm">
                    No results for <span className="font-semibold text-[#374151]">"{search}"</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────

const TABS = [
  { label: "Task 2 Topics", count: task2Topics.length },
  { label: "Synonym Bank",  count: synonyms.length },
];

const allTypes = ["All", ...Array.from(new Set(task2Topics.map((t) => t.type)))];

export default function WritingResources() {
  const [activeTab,   setActiveTab]   = useState(0);
  const [search,      setSearch]      = useState("");
  const [openTopic,   setOpenTopic]   = useState(null);
  const [typeFilter,  setTypeFilter]  = useState("All");

  const filteredTopics = task2Topics.filter((t) => {
    const matchType = typeFilter === "All" || t.type === typeFilter;
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.question.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f9fafb]">

      {/* ══════════════════ HERO ══════════════════ */}
      <div className="w-full bg-[#0f172a] relative overflow-hidden">

        {/* Background glows */}
        <div className="pointer-events-none absolute -top-32 right-0 w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #ef4444 0%, transparent 65%)" }} />
        <div className="pointer-events-none absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 65%)" }} />
        <div className="pointer-events-none absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #ef4444 0%, transparent 70%)" }} />

        <div className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-0">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Writing Resources</span>
          </div>

          {/* Title row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3">
                IELTS Writing&nbsp;
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Task 2
                </span>
              </h1>
              <p className="text-white/50 text-base max-w-2xl leading-relaxed">
                24 topic-based idea banks with topic sentences, real examples, and key vocabulary —
                plus 50 essential synonyms to maximise your band score.
              </p>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              {[
                { v: "24",     l: "Topics" },
                { v: "4",      l: "Question Types" },
                { v: "50",     l: "Synonyms" },
                { v: "Band 7+",l: "Target Score" },
              ].map((s) => (
                <div key={s.l}
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center min-w-[80px]
                             hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default">
                  <p className="text-lg font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">{s.v}</p>
                  <p className="text-white/40 text-[11px] mt-0.5 font-medium">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-t border-white/10">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => { setActiveTab(i); setSearch(""); }}
                className={`flex items-center gap-2 px-6 py-3.5 text-sm font-semibold border-b-2 transition-all duration-200
                  ${activeTab === i
                    ? "border-red-500 text-white"
                    : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"}`}
              >
                {tab.label}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold transition-all duration-200
                  ${activeTab === i ? "bg-red-500/30 text-red-300" : "bg-white/10 text-white/30"}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════ CONTENT ══════════════════ */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-8">

        {/* ── Toolbar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder={activeTab === 0 ? "Search topics or keywords…" : "Search words or synonyms…"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#e5e7eb] rounded-xl text-sm
                         focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400
                         text-[#111827] placeholder:text-[#9ca3af] transition-all duration-200 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#e5e7eb]
                           hover:bg-red-100 flex items-center justify-center transition-colors duration-150">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 text-[#6b7280]">
                  <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Type filters — only on topics tab */}
          {activeTab === 0 && (
            <div className="flex flex-wrap gap-2">
              {allTypes.map((type) => {
                const tc = type === "All" ? null : TYPE_CFG[type];
                const active = typeFilter === type;
                return (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200
                      ${active
                        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-transparent shadow-md shadow-red-200 scale-[1.02]"
                        : tc
                        ? `${tc.bg} ${tc.text} ${tc.border} hover:shadow-sm hover:scale-[1.02]`
                        : "bg-white text-[#374151] border-[#e5e7eb] hover:border-red-200 hover:shadow-sm"}`}
                  >
                    {type}
                    {type !== "All" && (
                      <span className="ml-1.5 opacity-60 font-medium">
                        {task2Topics.filter((t) => t.type === type).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Topics Tab ── */}
        {activeTab === 0 && (
          <>
            {/* Results count */}
            <p className="text-xs text-[#9ca3af] mb-4 font-medium">
              Showing <span className="text-[#374151] font-semibold">{filteredTopics.length}</span> of {task2Topics.length} topics
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.no}
                  topic={topic}
                  isOpen={openTopic === topic.no}
                  onToggle={() => setOpenTopic(openTopic === topic.no ? null : topic.no)}
                />
              ))}
            </div>

            {filteredTopics.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#f3f4f6] flex items-center justify-center mb-4">
                  <SearchIcon />
                </div>
                <p className="text-[#374151] font-semibold mb-1">No topics found</p>
                <p className="text-[#9ca3af] text-sm">Try a different keyword or clear the filter</p>
              </div>
            )}
          </>
        )}

        {/* ── Synonyms Tab ── */}
        {activeTab === 1 && <SynonymTable search={search} />}
      </div>
    </div>
  );
}