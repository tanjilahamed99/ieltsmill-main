"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const FAQItem = ({
  q,
  a,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors">
        <span className="text-sm font-semibold text-gray-800 leading-snug">
          {q}
        </span>
        <span className="shrink-0 text-gray-400">
          {open ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {a ||
            "The best way to prepare for the IELTS exam online is by using reliable platforms like ILTSMILL that offer mock tests, practice materials, expert feedback, and band score analysis to simulate the real test experience."}
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const faqs = [
    {
      q: "What is the best way to prepare for the IELTS exam online?",
      open: true,
    },
    { q: "Are ILTSMILL mock tests similar to the real IELTS exam?" },
    { q: "Can I improve my IELTS band score by practicing on ILTSMILL?" },
    { q: "Does ILTSMILL provide IELTS speaking and writing feedback?" },
    { q: "Is ILTSMILL suitable for both IELTS Academic and General Training?" },
    { q: "How can I access free IELTS Practice Questions?" },
    { q: "Can I use ILTSMILL on mobile or tablet?" },
    { q: "How accurate is the band score on ILTSMILL?" },
    { q: "What is the price of IELTS mock tests on ILTSMILL?" },
    { q: "Do I need to download any app to use ILTSMILL?" },
  ];
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-14">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 text-sm">
          Get clear answers to your IELTS preparation and test-related queries
        </p>
      </div>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} defaultOpen={f.open} />
        ))}
      </div>
    </section>
  );
};

export default Faq;
