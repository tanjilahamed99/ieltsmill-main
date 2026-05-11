import React from "react";

const Stats = () => {
  const stats = [
    {
      n: "100+",
      label: "Mock Tests",
      desc: "Mock tests for wide range of practice",
    },
    {
      n: "400+",
      label: "Section Tests",
      desc: "Tests per section to improve in technical skill",
    },
    {
      n: "1000+",
      label: "Questions",
      desc: "Questions of all official IELTS question types",
    },
    {
      n: "250+",
      label: "Study Materials",
      desc: "Study materials for holistic learning with a beginner course",
    },
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div
              className={`"text-3xl font-black mb-1 ${i % 2 === 0 ? 'text-primary' : 'text-secondary'}`}
              >
              {s.n}
            </div>
            <div className="text-sm font-bold text-gray-800 mb-1">
              {s.label}
            </div>
            <div className="text-xs text-gray-500 leading-relaxed">
              {s.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
