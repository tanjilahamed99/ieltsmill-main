import React from "react";

const WritingTestCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-sm">
    <div className="text-xs font-bold mb-2 text-primary">Writing Test</div>
    {["Task 1 – Academic", "Task 2 – Opinion Essay"].map((t, i) => (
      <div
        key={i}
        className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 mb-2 last:mb-0">
        <div
          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
          style={{ background: "linear-gradient(135deg,#f472b6,#818cf8)" }}>
          {i + 1}
        </div>
        <div>
          <p className="text-xs font-medium text-gray-700">{t}</p>
          <div className="flex gap-1 mt-1">
            {[7.5, 6.5, 8, 7].map((s, j) => (
              <span
                key={j}
                className="text-[10px] bg-pink-100 text-pink-600 px-1.5 rounded font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ScrollingBanner = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
      <div className="rounded-3xl overflow-hidden bg-linear-to-r from-primary to-secondary">
        <div className="grid md:grid-cols-2 gap-0 items-center">
          <div className="p-8 md:p-12">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              Writing Test
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Accurate Scoring and Feedback
            </h2>
            <p className="text-white/75 text-sm leading-relaxed mb-7 max-w-sm">
              Get detailed feedback from our IELTS experts to understand your
              strengths and areas for improvement. Try our AI-powered evaluation
              for quick, accurate scoring in seconds.
            </p>
            <a
              href="#"
              className="inline-block bg-white font-bold px-6 py-3 rounded-full text-sm hover:scale-105 transition-all shadow-lg"
              style={{ color: "#7C3AED" }}>
              Give Demo Exam →
            </a>
          </div>
          <div className="flex justify-center items-center p-6 md:p-8">
            <WritingTestCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingBanner;
