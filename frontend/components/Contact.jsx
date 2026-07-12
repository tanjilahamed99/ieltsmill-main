"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, ChevronDown, Send } from "lucide-react";

const faqs = [
  {
    q: "What is the class schedule at Macron Worldwide?",
    a: "We offer morning, afternoon and evening batches 6 days a week. Weekend batches are also available for working professionals and students.",
  },
  {
    q: "Do you offer online classes?",
    a: "Yes! We offer both offline (in-center) and live online classes via Zoom. Online students get the same materials and support as in-center students.",
  },
  {
    q: "What is the Band Score Guarantee?",
    a: "If you complete the full course and don't achieve your target band score, you can retake the course for FREE — no questions asked. T&C apply.",
  },
  {
    q: "How do I register?",
    a: "You can register by visiting our center in Narsingdi, calling/WhatsApp us, or filling the form below. A free demo class is available before you enroll.",
  },
  {
    q: "Do you help with university applications?",
    a: "Yes, our study abroad team provides end-to-end support — university selection, SOP writing, application, visa, and pre-departure guidance.",
  },
];

const INFO_CARDS = [
  {
    icon: Phone,
    label: "Call / WhatsApp",
    value: "01303-255116",
    href: "tel:01303255116",
    accentBg: "bg-emerald-600/10",
    accentText: "text-emerald-600",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@macronworldwide.com",
    href: "mailto:info@macronworldwide.com",
    accentBg: "bg-blue-600/10",
    accentText: "text-blue-600",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Narsingdi, Dhaka Division",
    href: "#",
    accentBg: "bg-[#c8963e]/10",
    accentText: "text-[#c8963e]",
  },
  {
    icon: null,
    label: "Facebook",
    value: "macron.narsingdi",
    href: "https://www.facebook.com/macron.narsingdi/",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-500",
    emoji: "📘",
  },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const inputBase =
    "w-full bg-white/[0.08] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[#c8963e] focus:bg-white/[0.12] font-[inherit]";

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="label-tag justify-center">Get In Touch</div>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] text-ink leading-[1.1] mb-4">
            Start Your Journey <span className="gold-text">Today</span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed max-w-120 mx-auto">
            Book a free demo class or speak to our counselors. We&apos;re here
            to help you achieve your goals.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-14 items-start">
          {/* ── LEFT — info + FAQs ── */}
          <div>
            {/* Info cards */}
            <div className="grid md:grid-cols-2 gap-3.5 mb-12">
              {INFO_CARDS.map(
                ({
                  icon: Icon,
                  label,
                  value,
                  href,
                  accentBg,
                  accentText,
                  emoji,
                }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="card-lift no-underline">
                    <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-[18px] bg-white border border-[#e8e2d9]">
                      <div
                        className={`w-11 h-11 rounded-xl flex-shrink-0 ${accentBg} flex items-center justify-center`}>
                        {emoji ? (
                          <span className="text-xl">{emoji}</span>
                        ) : (
                          Icon && <Icon size={18} className={accentText} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                          {label}
                        </div>
                        <div className="text-[13px] font-bold text-[#08101e] truncate">
                          {value}
                        </div>
                      </div>
                    </div>
                  </a>
                ),
              )}
            </div>

            {/* FAQs */}
            <h3 className="font-display text-2xl text-[#08101e] mb-6">
              Frequently Asked Questions
            </h3>
            <div className="flex flex-col gap-2.5">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl overflow-hidden border transition-colors duration-200 ${
                    openFaq === i
                      ? "border-[rgba(200,150,62,0.4)]"
                      : "border-[#e8e2d9]"
                  }`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-transparent border-none cursor-pointer text-left">
                    <span className="text-sm font-semibold text-[#08101e] leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#c8963e] flex-shrink-0 transition-transform duration-250 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 pt-3.5 text-[13px] text-slate-500 leading-[1.75] border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — form ── */}
          <div className="lg:sticky lg:top-24 rounded-[32px] px-7 py-11 sm:px-11 bg-gradient-to-br from-[#08101e] to-[#0f1f38] border border-[rgba(200,150,62,0.2)]">
            <h3 className="font-display text-[30px] text-white mb-2">
              Book Your Free Demo
            </h3>
            <p className="text-sm text-white/50 mb-9">
              Fill in your details and we&apos;ll contact you within 24 hours.
            </p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="font-extrabold text-white text-xl mb-2.5">
                  Thank You!
                </h4>
                <p className="text-sm text-white/55">
                  We&apos;ll contact you on WhatsApp very soon.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-[13px] font-semibold text-white/60 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputBase}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[13px] font-semibold text-white/60 mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="01XXX-XXXXXX"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className={inputBase}
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="block text-[13px] font-semibold text-white/60 mb-2">
                    Course Interest
                  </label>
                  <select
                    value={form.course}
                    onChange={(e) =>
                      setForm({ ...form, course: e.target.value })
                    }
                    className={`${inputBase} [color-scheme:dark]`}>
                    <option value="">Select a course</option>
                    <option>IELTS Academic</option>
                    <option>IELTS General Training</option>
                    <option>TOEFL iBT</option>
                    <option>PTE Academic</option>
                    <option>OET</option>
                    <option>Spoken English</option>
                    <option>Study Abroad Counseling</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[13px] font-semibold text-white/60 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    placeholder="Any specific questions?"
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className={`${inputBase} resize-none`}
                  />
                </div>

                <button
                  onClick={() => setSubmitted(true)}
                  className="btn-gold justify-center mt-2 w-full text-[15px]">
                  Send My Request <Send size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
