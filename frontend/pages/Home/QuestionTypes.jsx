import React from "react";

const QuestionTypes = () => {
  const questionTypes = [
    {
      section: "Listening",
      color: "#3B82F6",
      types: [
        "Multiple Choice",
        "Map Labelling",
        "Form Completion",
        "Note Completion",
      ],
    },
    {
      section: "Reading",
      color: "#10B981",
      types: [
        "True/False/NG",
        "Matching Headings",
        "Short Answer",
        "Summary Completion",
      ],
    },
    {
      section: "Writing",
      color: "#F59E0B",
      types: [
        "Task 1 Academic",
        "Task 1 General",
        "Task 2 Essay",
        "Letter Writing",
      ],
    },
    {
      section: "Speaking",
      color: "#EF4444",
      types: [
        "Part 1 Interview",
        "Part 2 Cue Card",
        "Part 3 Discussion",
        "Pronunciation",
      ],
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
          35+ Question Types
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Only platform to provide all question types as official IELTS exam for
          best practice
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {questionTypes.map((qt, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: qt.color }}
              />
              <span className="text-sm font-bold text-gray-800">
                {qt.section}
              </span>
            </div>
            <ul className="space-y-2">
              {qt.types.map((t, j) => (
                <li
                  key={j}
                  className="flex items-center gap-2 text-xs text-gray-600">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: qt.color }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* MCQ detail */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-gray-800">
            Multiple Choice
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Candidates listen to a recording and select one correct answer from
          multiple choices. This tests listening for key details, identifying
          speaker opinions, and recognising synonyms and paraphrasing.
        </p>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          <button className="text-xs text-gray-400 hover:text-gray-600">
            ← Prev
          </button>
          <div className="flex gap-1.5 flex-1 justify-center">
            {[0, 1, 2].map((j) => (
              <span
                key={j}
                className="w-2 h-2 rounded-full"
                style={{ background: j === 1 ? "#3B82F6" : "#E5E7EB" }}
              />
            ))}
          </div>
          <button className="text-xs text-gray-400 hover:text-gray-600">
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuestionTypes;
