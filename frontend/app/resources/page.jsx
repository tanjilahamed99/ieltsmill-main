import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const resourceCategories = [
  {
    slug: "reading",
    title: "Reading",
    description:
      "Academic & General Training passages with timed practice, annotated answer keys, and skimming strategies.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-7 h-7">
        <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h6A2.5 2.5 0 0 1 13 6.5v11A2.5 2.5 0 0 1 10.5 20h-6A2.5 2.5 0 0 1 2 17.5v-11Z" />
        <path d="M13 6.5A2.5 2.5 0 0 1 15.5 4h4A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-4A2.5 2.5 0 0 1 13 17.5v-11Z" />
        <path d="M5.5 8h4M5.5 11h4M5.5 14h2" strokeLinecap="round" />
        <path d="M15.5 8h3M15.5 11h3M15.5 14h1.5" strokeLinecap="round" />
      </svg>
    ),
    count: 120,
    unit: "passages",
    color: "from-red-500 to-orange-500",
    lightBg: "bg-red-50",
    lightText: "text-red-600",
  },
  //   {
  //     slug: "listening",
  //     title: "Listening",
  //     description:
  //       "Full Section 1–4 audio sets with transcripts, note-completion drills, and map-labelling guides.",
  //     icon: (
  //       <svg
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth={1.6}
  //         className="w-7 h-7">
  //         <path d="M3 11a9 9 0 0 1 18 0v4a3 3 0 0 1-3 3h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2V11a7 7 0 0 0-14 0v1h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a3 3 0 0 1-3-3v-4Z" />
  //       </svg>
  //     ),
  //     count: 80,
  //     unit: "audio sets",
  //     color: "from-orange-500 to-amber-400",
  //     lightBg: "bg-orange-50",
  //     lightText: "text-orange-600",
  //   },
  //   {
  //     slug: "speaking",
  //     title: "Speaking",
  //     description:
  //       "Part 1–3 cue cards, model answers at Band 6–9, fluency tips, and pronunciation micro-lessons.",
  //     icon: (
  //       <svg
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth={1.6}
  //         className="w-7 h-7">
  //         <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
  //         <path d="M19 10a7 7 0 0 1-14 0" strokeLinecap="round" />
  //         <path d="M12 19v3M9 22h6" strokeLinecap="round" />
  //       </svg>
  //     ),
  //     count: 200,
  //     unit: "cue cards",
  //     color: "from-red-600 to-rose-500",
  //     lightBg: "bg-rose-50",
  //     lightText: "text-rose-600",
  //   },
  {
    slug: "writing",
    title: "Writing",
    description:
      "Task 1 & Task 2 sample essays with examiner comments, graph-description templates, and coherence guides.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-7 h-7">
        <path d="M12 20h9" strokeLinecap="round" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
      </svg>
    ),
    count: 150,
    unit: "sample essays",
    color: "from-orange-600 to-red-500",
    lightBg: "bg-amber-50",
    lightText: "text-amber-700",
  },
  {
    slug: "vocabulary",
    title: "Vocabulary",
    description:
      "Topic-based word lists, collocation drills, academic word families, and spaced-repetition flashcards.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-7 h-7">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
    count: 3000,
    unit: "words",
    color: "from-red-500 to-orange-400",
    lightBg: "bg-red-50",
    lightText: "text-red-600",
  },
  {
    slug: "grammar",
    title: "Grammar",
    description:
      "Band-targeted grammar rules, error-correction exercises, and complex sentence construction walkthroughs.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-7 h-7">
        <path
          d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"
          strokeLinecap="round"
        />
        <path d="M9 20h6" strokeLinecap="round" />
        <path d="M12 4v16" strokeLinecap="round" />
      </svg>
    ),
    count: 60,
    unit: "lessons",
    color: "from-orange-500 to-red-600",
    lightBg: "bg-orange-50",
    lightText: "text-orange-600",
  },
  {
    slug: "tips-strategies",
    title: "Tips & Strategies",
    description:
      "Examiner-backed tactics for every question type, time-management frameworks, and band-boosting checklists.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-7 h-7">
        <path
          d="M9.663 17h4.673M12 3v1M6.072 6.072l-.707.707M3 12H2M6.072 17.928l-.707-.707M21 12h-1M17.928 6.072l.707.707M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
          strokeLinecap="round"
        />
      </svg>
    ),
    count: 40,
    unit: "guides",
    color: "from-orange-400 to-red-500",
    lightBg: "bg-amber-50",
    lightText: "text-amber-700",
  },
];

const stats = [
  { value: "10K+", label: "Practice Questions" },
  { value: "500+", label: "Audio Recordings" },
  { value: "Band 9", label: "Model Answers" },
  { value: "Free", label: "Core Resources" },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-surface text-text flex flex-col">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-dark pt-20 pb-24 px-4">
        {/* subtle gradient blob */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-120 h-120 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #ef4444 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 -left-20 w-[320px] h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* pill badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-grad inline-block" />
            IELTS Resource Library
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Everything you need to{" "}
            <span className="bg-grad bg-clip-text text-transparent">
              ace your IELTS
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            Structured practice materials, expert strategies, and full-length
            mock tests — all in one place.
          </p>

          {/* stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-xl py-4 px-3 text-center">
                <p className="text-2xl font-bold bg-grad bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Cards ── */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-text">Browse by category</h2>
            <p className="text-muted text-sm mt-1">
              Select a skill area to explore materials
            </p>
          </div>
          <span className="text-sm text-muted hidden sm:block">
            {resourceCategories.length} categories
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {resourceCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/resources/${cat.slug}`}
              className="group relative flex flex-col bg-white rounded-2xl border border-border overflow-hidden
                         hover:shadow-lg hover:-translate-y-0.5 hover:border-transparent transition-all duration-200">
              {/* top gradient bar */}
              <div className={`h-1 w-full bg-linear-to-r ${cat.color}`} />

              {cat.featured && (
                <span className="absolute top-3 right-3 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-grad text-white">
                  Popular
                </span>
              )}

              <div className="p-5 flex flex-col flex-1">
                {/* icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.lightBg} ${cat.lightText}`}>
                  {cat.icon}
                </div>

                <h3 className="text-base font-semibold text-text mb-1.5">
                  {cat.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-1">
                  {cat.description}
                </p>

                {/* footer row */}
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted">
                    <span className="font-semibold text-text">
                      {cat.count.toLocaleString()}
                    </span>{" "}
                    {cat.unit}
                  </span>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${cat.lightText}
                                group-hover:gap-2 transition-all duration-150`}>
                    Explore
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      className="w-3.5 h-3.5">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 mb-5">
        <div className="bg-grad rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-white text-center sm:text-left">
            <h3 className="text-2xl font-bold mb-1">
              Ready to start a full mock test?
            </h3>
            <p className="text-white/75 text-sm">
              Simulate real exam conditions and get instant band score
              estimates.
            </p>
          </div>
          <Link
            href="/resources/mock-tests"
            className="shrink-0 bg-white text-red-600 font-semibold px-7 py-3 rounded-xl
                       hover:bg-red-50 transition-colors duration-150 text-sm">
            Start Mock Test
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
