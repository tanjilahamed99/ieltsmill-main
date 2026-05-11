import CheckBoxIcon from "../../components/Shared/CheckBoxIcon";
import PrimaryBtn from "../../components/Shared/PrimaryBtn";
import SectionLabel from "../../components/Shared/SectionLabel";

const QuestionCard = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 w-full max-w-xs">
    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
      MCQ Single Answer
    </div>
    <p className="text-xs text-gray-700 mb-3">
      The speaker mainly discusses the importance of...
    </p>
    <div className="space-y-1.5">
      {[
        "Environmental conservation",
        "Economic development",
        "Cultural heritage",
      ].map((opt, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer ${
            i === 1 ? "border-primary bg-[#FEF2F2]" : "border-[#F3F4F6]"
          }`}>
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${i === 1 ? "border-primary" : "border-[#D1D5DB]"}`}>
            {i === 1 && <div className="w-2 h-2 rounded-full bg-primary" />}
          </div>
          <span
            style={
              i === 1
                ? { color: "#B91C1C", fontWeight: 600 }
                : { color: "#6B7280" }
            }>
            {opt}
          </span>
        </div>
      ))}
    </div>
    <div className="mt-3 flex gap-2">
      <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center">
        <p className="text-[10px] text-gray-400">Time</p>
        <p className="text-xs font-bold text-gray-700">12:34</p>
      </div>
      <div className="flex-1 bg-green-50 rounded-lg p-2 text-center">
        <p className="text-[10px] text-green-500">Done</p>
        <p className="text-xs font-bold text-green-600">75%</p>
      </div>
    </div>
  </div>
);
const QPrectice = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-5">
      <div className="bg-gray-50 rounded-3xl p-6 sm:p-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionLabel cls="bg-purple-50 text-purple-700 border border-purple-100">
              Question Practice
            </SectionLabel>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Practice from our 35+ IELTS question types
            </h3>
            <ul className="space-y-2.5 mb-6">
              {[
                "Select desired question type for every section",
                "Practice question type based test",
                "Get over your weakness",
                "Get detailed result and feedback",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckBoxIcon />
                  {t}
                </li>
              ))}
            </ul>
            <PrimaryBtn>Practice Now →</PrimaryBtn>
          </div>
          <div className="flex justify-center">
            <QuestionCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QPrectice;
