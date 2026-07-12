"use client";
import {
  BookOpen,
  Monitor,
  User2,
  FileCheck,
  Globe,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: User2,
    title: "Expert Faculty",
    desc: "IELTS-certified trainers with 8+ years of coaching experience and proven track records.",
    accent: "#2563eb",
    accentBg: "bg-blue-600/10",
    accentText: "text-blue-600",
  },
  {
    icon: Monitor,
    title: "Smart Learning",
    desc: "AI-assisted practice tests, recorded classes, and online study portals available 24/7.",
    accent: "#059669",
    accentBg: "bg-emerald-600/10",
    accentText: "text-emerald-600",
  },
  {
    icon: Globe,
    title: "Study Abroad Guidance",
    desc: "Complete visa counseling for UK, Canada, Australia, USA, Germany and more.",
    accent: "#c8963e",
    accentBg: "bg-[#c8963e]/10",
    accentText: "text-[#c8963e]",
  },
  {
    icon: FileCheck,
    title: "Mock Tests & Evaluation",
    desc: "Weekly full-length mock tests with detailed band-score feedback and improvement plans.",
    accent: "#7c3aed",
    accentBg: "bg-violet-600/10",
    accentText: "text-violet-600",
  },
  {
    icon: BookOpen,
    title: "Personalized Curriculum",
    desc: "Customized study plans based on your starting level, timeline, and target score.",
    accent: "#be123c",
    accentBg: "bg-rose-700/10",
    accentText: "text-rose-700",
  },
  {
    icon: Headphones,
    title: "24/7 Student Support",
    desc: "Dedicated WhatsApp support group for all enrolled students, including doubt sessions.",
    accent: "#d97706",
    accentBg: "bg-amber-600/10",
    accentText: "text-amber-600",
  },
];

const steps = [
  {
    num: "01",
    title: "Diagnostic Test",
    desc: "Free diagnostic test to assess your current level and identify weak areas.",
  },
  {
    num: "02",
    title: "Personalized Plan",
    desc: "Custom study roadmap designed around your schedule and target exam date.",
  },
  {
    num: "03",
    title: "Expert Coaching",
    desc: "Join expert-led classes with targeted skill practice and daily exercises.",
  },
  {
    num: "04",
    title: "Mock & Achieve",
    desc: "Regular mock exams with detailed feedback. Walk into your exam with confidence.",
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="label-tag justify-center">Why Macron Worldwide?</div>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] text-ink leading-[1.1] mb-5">
            Everything You Need
            <br />
            to <span className="gold-text">Succeed</span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed max-w-140 mx-auto">
            From your first diagnostic to your final exam, Macron Worldwide is
            with you at every step of your language journey.
          </p>
        </div>

        {/* ── Features grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map(({ icon: Icon, title, desc, accentBg, accentText }) => (
            <div
              key={title}
              className="card-lift p-8 rounded-3xl bg-cream border border-[#e8e2d9] transition-all duration-300">
              <div
                className={`w-14 h-14 rounded-2xl ${accentBg} flex items-center justify-center mb-5`}>
                <Icon size={26} className={accentText} />
              </div>
              <h3 className="font-display text-xl text-ink mb-2.5">{title}</h3>
              <p className="text-sm text-slate-500 leading-[1.75]">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── Steps dark card ── */}
        <div className="relative overflow-hidden rounded-4xl px-6 py-16 sm:px-14 sm:py-16 bg-linear-to-br from-ink to-[#0f1f38] border border-[#c8963e]/20">
          {/* BG orb */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-100 h-100 rounded-full bg-[radial-gradient(circle,rgba(200,150,62,0.08)_0%,transparent_70%)]" />

          {/* Steps header */}
          <div className="relative text-center mb-14">
            <div className="label-tag justify-center bg-[rgba(200,150,62,0.12)] border-[rgba(200,150,62,0.3)]">
              Your Journey
            </div>
            <h2 className="font-display text-[clamp(32px,3.5vw,48px)] text-white leading-[1.1]">
              4 Steps to Your <span className="gold-text">Target Score</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connector line — desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[75%] w-1/2 h-px bg-linear-to-r from-[rgba(200,150,62,0.5)] to-transparent" />
                )}

                {/* Number badge */}
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-gold to-gold-light flex items-center justify-center mb-5 shadow-[0_8px_24px_rgba(200,150,62,0.35)]">
                  <span className="font-display text-xl font-bold text-ink">
                    {step.num}
                  </span>
                </div>

                <h4 className="font-bold text-[17px] text-white mb-2.5">
                  {step.title}
                </h4>
                <p className="text-[13px] text-white/55 leading-[1.7]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="relative text-center mt-12">
            <a href="#contact" className="btn-gold text-[15px]">
              Start with Free Diagnostic →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
