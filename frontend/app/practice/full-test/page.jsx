import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import Link from "next/link";
import React from "react";

const fullTests = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Full Test ${i + 1}`,
  duration: "2 hrs 45 mins",
  sections: ["Listening", "Reading", "Writing"],
  difficulty: i < 3 ? "Beginner" : i < 7 ? "Intermediate" : "Advanced",
  questions: 40,
}));

const difficultyStyles = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

const sectionIcons = {
  Listening: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
    </svg>
  ),
  Reading: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Writing: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  Speaking: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  ),
};

const FullTestCard = ({ test }) => {
  return (
    <Link href={`/practice/full-test/${test.id}`} className="group block">
      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer">

        {/* Top gradient accent bar */}
        <div className="h-1.5 bg-grad" />

        {/* Card number badge */}
        <div className="absolute top-4 right-4">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-grad text-white text-sm font-bold shadow-sm">
            {test.id}
          </span>
        </div>

        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-text mb-1 group-hover:text-primary transition-colors">
            {test.title}
          </h3>

          {/* Difficulty badge */}
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${difficultyStyles[test.difficulty]}`}>
            {test.difficulty}
          </span>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-muted mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              {test.duration}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {test.questions} Questions
            </span>
          </div>

          {/* Sections pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {test.sections.map((section) => (
              <span
                key={section}
                className="flex items-center gap-1 text-xs text-muted bg-surface border border-border rounded-full px-2.5 py-1"
              >
                {sectionIcons[section]}
                {section}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-muted">Academic & General</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Start Test
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const page = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      {/* Hero section */}
      <div className="bg-grad py-12 px-4">
        <div className="max-w-5xl mx-auto text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-100 mb-2">
            Practice Tests
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-sm">
            IELTS Full Tests
          </h1>
          <p className="text-orange-100 max-w-xl mx-auto text-sm md:text-base">
            Simulate the real IELTS exam with full-length practice tests. Track your progress and identify your weak areas.
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              { value: "10", label: "Full Tests" },
              { value: "400+", label: "Questions" },
              { value: "4", label: "Sections Each" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold">{stat.value}</p>
                <p className="text-orange-100 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-text">All Practice Tests</h2>
          <span className="text-sm text-muted">10 tests available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fullTests.map((test) => (
            <FullTestCard key={test.id} test={test} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default page;