"use client";
import { ArrowRight, MapPin } from "lucide-react";

const countries = [
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    unis: "130+ Universities",
    req: "IELTS 6.0 – 7.5",
  },
  {
    flag: "🇨🇦",
    name: "Canada",
    unis: "100+ Universities",
    req: "IELTS 6.0 – 7.0",
  },
  {
    flag: "🇦🇺",
    name: "Australia",
    unis: "43+ Universities",
    req: "IELTS 6.0 – 7.5",
  },
  {
    flag: "🇺🇸",
    name: "United States",
    unis: "200+ Universities",
    req: "TOEFL 80 – 100",
  },
  {
    flag: "🇩🇪",
    name: "Germany",
    unis: "60+ Universities",
    req: "IELTS 6.0 – 6.5",
  },
  { flag: "🇫🇮", name: "Finland", unis: "13+ Universities", req: "IELTS 6.0+" },
  { flag: "🇸🇪", name: "Sweden", unis: "30+ Universities", req: "IELTS 6.5+" },
  {
    flag: "🇳🇿",
    name: "New Zealand",
    unis: "8+ Universities",
    req: "IELTS 6.0 – 6.5",
  },
];

const services = [
  {
    icon: "🎓",
    title: "University Selection",
    desc: "Find the best-fit university based on your profile, budget and career goals.",
  },
  {
    icon: "📄",
    title: "Application & SOP",
    desc: "Expert help writing your Statement of Purpose, CV and recommendation letters.",
  },
  {
    icon: "🛂",
    title: "Visa Counseling",
    desc: "Complete student visa documentation assistance with high approval rate.",
  },
  {
    icon: "✈️",
    title: "Pre-Departure",
    desc: "Accommodation, insurance, travel tips and orientation before you fly.",
  },
];

export default function StudyAbroad() {
  return (
    <section id="study-abroad" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="label-tag justify-center">Study Abroad</div>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] text-ink leading-[1.1] mb-4">
            Your Gateway to
            <br />
            <span className="gold-text">Global Education</span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed max-w-130 mx-auto">
            From Bangladesh to the world — we help you get into top universities
            abroad with end-to-end admission and visa support.
          </p>
        </div>

        {/* ── Countries grid ── */}
        <div className="grid grid-cols-1 md:grid-cols- sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {countries.map((c) => (
            <div
              key={c.name}
              className="card-lift bg-white rounded-[20px] px-5 py-7 border border-[#e8e2d9] text-center">
              <div className="text-4xl mb-3">{c.flag}</div>
              <div className="font-bold text-[15px] text-ink mb-1.5">
                {c.name}
              </div>
              <div className="text-xs text-slate-400 mb-2.5">{c.unis}</div>
              <span className="inline-block text-[11px] font-bold text-gold bg-[rgba(200,150,62,0.1)] border border-[rgba(200,150,62,0.25)] px-3 py-1 rounded-full">
                {c.req}
              </span>
            </div>
          ))}
        </div>

        {/* ── Dark panel ── */}
        <div className="rounded-4xl overflow-hidden border border-[rgba(200,150,62,0.2)] bg-linear-to-br from-ink to-[#0f1f38]">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-120">
            {/* Left — copy */}
            <div className="flex flex-col justify-center px-8 py-14 sm:px-14">
              <div className="label-tag bg-[rgba(200,150,62,0.12)] border-[rgba(200,150,62,0.3)]">
                Complete Support
              </div>
              <h3 className="font-display text-[clamp(32px,3vw,46px)] text-white leading-[1.1] mb-5">
                We Handle
                <br />
                <span className="gold-text">Everything</span>
              </h3>
              <p className="text-white/55 text-[15px] leading-[1.8] mb-7">
                Don&apos;t navigate the complex study abroad process alone. Our
                experienced counselors have helped hundreds of students from
                Narsingdi and across Dhaka Division realize their dreams.
              </p>
              <div className="flex items-center gap-2.5 text-white/60 text-[13px] mb-8">
                <MapPin size={15} className="text-gold" />
                Serving students across Narsingdi, Dhaka Division
              </div>
              <a href="#contact" className="btn-gold self-start">
                Free Counseling Session <ArrowRight size={16} />
              </a>
            </div>

            {/* Right — service cards */}
            <div className="grid md:grid-cols-2 gap-5 content-center px-6 py-10 sm:px-12 lg:pl-6 lg:py-12">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="rounded-[20px] p-6 border border-[rgba(200,150,62,0.15)] bg-white/5 transition-all duration-300 hover:bg-[rgba(200,150,62,0.08)] hover:border-[rgba(200,150,62,0.35)]">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h4 className="font-bold text-[15px] text-white mb-2">
                    {s.title}
                  </h4>
                  <p className="text-xs text-white/50 leading-[1.7]">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
