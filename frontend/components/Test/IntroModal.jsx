export default function IntroModal({ onStart, type, num }) {
  return (
    <div className="fixed inset-0 z-300 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-center mb-4">
          <span className="w-9 h-9 bg-red-700 text-white text-lg font-bold rounded flex items-center justify-center">
            E
          </span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
          Full IELTS TEST {num} — Academic
        </p>

        {type === "reading" && (
          <>
            {" "}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Reading Test {num} (Online Test)
            </h2>
            <p className="text-[13px] text-gray-500 mb-5">
              40 minutes · 40 questions · 3 passages
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded p-3 sm:p-3.5 text-[13px] text-amber-900 leading-7 mb-5">
              <p className="font-bold mb-1">Before you begin</p>
              <p>• Read each passage carefully before answering</p>
              <p>
                • <strong>Select any text</strong> in the passage to highlight
                it
              </p>
              <p>
                • <strong>Drag headings</strong> directly onto the passage
                paragraphs
              </p>
              <p>
                • Use the <strong>Notes</strong> button to jot down ideas per
                passage
              </p>
              <p>• Use the Part tabs at the bottom to jump between sections</p>
              <p>• Submit when done to see your band score</p>
            </div>
            <button
          onClick={onStart}
          className="w-full py-3 bg-blue-900 text-white font-bold text-sm rounded hover:bg-blue-950 transition-colors">
          ▶ Start Reading Test
        </button>
          </>
        )}
        {type === "listening" && (
          <>
            {" "}
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Listening Test {num}
            </h2>
            <p className="text-[14px] text-gray-500 mb-6">
              40 minutes · 40 questions · 4 parts
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-[13.5px] text-amber-900 leading-7 mb-6">
              <p className="font-bold mb-2">Before you begin</p>
              <p>• Each part shares a single continuous audio track</p>
              <p>
                • <strong>Select any text</strong> to highlight or add notes
              </p>
              <p>• Use the part tabs at the bottom to switch sections</p>
              <p>• Click the grid icon to navigate to any question</p>
              <p>• Audio cannot be rewound — listen carefully</p>
              <p>• The test auto-submits when time is up</p>
            </div>
            <button
          onClick={onStart}
          className="w-full py-3 bg-blue-900 text-white font-bold text-sm rounded hover:bg-blue-950 transition-colors">
          ▶ Start Listening Test
        </button>
          </>
        )}
        {type === "writing" && (
          <>
            {" "}
            <h2 className="text-[18px] sm:text-[21px] font-bold text-gray-900 mb-1">
              Writing Test {num} (Online Test)
            </h2>
            <p className="text-[12px] sm:text-[12.5px] text-gray-500 mb-4">
              60 minutes · 2 parts · Academic Writing
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded p-3 text-[12px] sm:text-[12.5px] text-amber-900 leading-[1.85] mb-4">
              <p className="font-bold mb-1">Before you begin</p>
              <p>
                • <strong>Part 1</strong> — Summarise the charts in at least{" "}
                <strong>150 words</strong>
              </p>
              <p>
                • <strong>Part 2</strong> — Write an essay of at least{" "}
                <strong>250 words</strong>
              </p>
              <p>• Use the ← → arrows at the bottom to switch parts</p>
              <p>• Word count is tracked in the bottom bar</p>
              <p>
                • <strong>Select any prompt text</strong> to highlight or add
                notes
              </p>
              <p>• Click Submit when you have finished both parts</p>
            </div>
            <button
              onClick={onStart}
              className="w-full py-3 bg-blue-900 text-white font-bold text-sm rounded hover:bg-blue-950 transition-colors">
              ▶ Start Writing Test
            </button>
          </>
        )}
      </div>
    </div>
  );
}
