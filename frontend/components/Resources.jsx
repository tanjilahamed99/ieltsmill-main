'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const resources = [
  { icon: '📖', title: 'Reading Practice',   desc: 'Full-length IELTS reading passages with answers and tips',              accentBg: 'bg-blue-600/10',    accentBorder: 'border-blue-600/20',    accentText: 'text-blue-500'   },
  { icon: '✍️', title: 'Writing Templates',  desc: 'Task 1 & Task 2 high-scoring essay templates',                          accentBg: 'bg-emerald-600/10', accentBorder: 'border-emerald-600/20', accentText: 'text-emerald-500'},
  { icon: '🎧', title: 'Listening Audio',    desc: 'Authentic IELTS-style listening practice with transcripts',              accentBg: 'bg-violet-600/10',  accentBorder: 'border-violet-600/20',  accentText: 'text-violet-500' },
  { icon: '🗣️', title: 'Speaking Topics',   desc: 'Latest Part 1, 2, 3 speaking cue cards with sample answers',            accentBg: 'bg-[#c8963e]/10',   accentBorder: 'border-[#c8963e]/20',   accentText: 'text-[#c8963e]'  },
  { icon: '📝', title: 'Practice Tests',     desc: 'Full mock tests with band score estimation',                             accentBg: 'bg-rose-700/10',    accentBorder: 'border-rose-700/20',    accentText: 'text-rose-500'   },
];

export default function Resources() {
  return (
    <section className="relative overflow-hidden py-24 bg-ink">

      {/* BG orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 rounded-[50%] bg-[radial-gradient(ellipse,rgba(200,150,62,0.06)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="label-tag justify-center">Free Resources</div>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] text-white leading-[1.1] mb-4">
            Dive Into Our Free<br />
            <span className="gold-text">IELTS Materials</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-120 mx-auto">
            Start preparing today with our high-quality IELTS practice resources — no registration required.
          </p>
        </div>

        {/* ── Resource cards ── */}
        <div className="grid md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {resources.map(r => (
            <Link
              key={r.title}
              href="#"
              className="card-lift group block no-underline"
            >
              <div className="rounded-3xl px-6 py-8 text-center border border-[rgba(200,150,62,0.15)] bg-white/4 transition-all duration-300 hover:bg-[rgba(200,150,62,0.08)] hover:border-[rgba(200,150,62,0.4)] h-full">

                {/* Icon bubble */}
                <div className={`w-16 h-16 rounded-[20px] ${r.accentBg} border ${r.accentBorder} flex items-center justify-center text-3xl mx-auto mb-5`}>
                  {r.icon}
                </div>

                <h3 className="font-bold text-sm text-white mb-2">{r.title}</h3>
                <p className="text-xs text-white/45 leading-[1.7] mb-4">{r.desc}</p>

                <div className={`flex items-center justify-center gap-1.5 text-xs font-bold ${r.accentText}`}>
                  Access Free <ArrowRight size={12} />
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}