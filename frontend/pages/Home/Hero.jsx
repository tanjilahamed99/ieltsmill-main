
import { StarIcon } from "lucide-react";
import React from "react";

const LiveActivityCard = () => (
  <div className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-xs border border-gray-100">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-gray-500">Live activity</span>
      <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> 245
        Online
      </span>
    </div>
    {[
      {
        n: "Aryan S.",
        a: "started Writing Test",
        t: "2m ago",
        c: "bg-blue-100 text-blue-600",
      },
      {
        n: "Priya M.",
        a: "scored 7.5 on Listening",
        t: "5m ago",
        c: "bg-pink-100 text-pink-600",
      },
      {
        n: "Tanvir R.",
        a: "completed Mock Test 3",
        t: "8m ago",
        c: "bg-purple-100 text-purple-600",
      },
      {
        n: "Liu W.",
        a: "joined Section Test",
        t: "12m ago",
        c: "bg-green-100 text-green-600",
      },
    ].map((x, i) => (
      <div
        key={i}
        className="flex items-start gap-2.5 py-2 border-b border-gray-50 last:border-0">
        <div
          className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${x.c}`}>
          {x.n[0]}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-700 font-semibold truncate">
            {x.n} <span className="font-normal text-gray-500">{x.a}</span>
          </p>
          <p className="text-[10px] text-gray-400">{x.t}</p>
        </div>
      </div>
    ))}
  </div>
);

const Hero = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10 md:pt-20 md:pb-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-red-100">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />{" "}
            Computer Based IELTS Practice
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-[1.1] mb-5">
            IELTS Computer Based Mock Tests –{" "}
            <span
              className=" bg-linear-to-r from-primary to-secondary"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Practice Online & Free
            </span>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-7 max-w-md">
            ILTSMILL takes you for the real IELTS exam online and free. Take
            100+ full IELTS exams which are computer-based, and practice all
            sections. Just real prep that works.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href="#"
              className="text-white font-bold   bg-linear-to-r from-primary to-secondary px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all text-sm">
              Try Free Mock Test →
            </a>
            <a
              href="#"
              className="border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all text-sm">
              Go to Dashboard
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#f472b6", "#818cf8", "#34d399", "#fb923c"].map((c, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: c }}>
                  {["A", "P", "T", "L"][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Trusted by 10,000+ students
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <LiveActivityCard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
