import CheckBoxIcon from "../../components/Shared/CheckBoxIcon";
import PrimaryBtn from "../../components/Shared/PrimaryBtn";
import SectionLabel from "../../components/Shared/SectionLabel";



const ProgressCard = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 w-full max-w-xs">
    <div className="flex justify-between items-center mb-3">
      <div>
        <p className="text-[10px] text-gray-400">Study Streak</p>
        <p className="text-xl font-black text-gray-800">22 Days 🔥</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-400">Average Score</p>
        <p className="text-xl font-black text-primary">
          8.5<span className="text-sm text-gray-400">/9</span>
        </p>
      </div>
    </div>
    <div className="flex items-end gap-2 h-20 mb-1">
      {[
        { s: [8, 7, 9, 8.5], l: "L" },
        { s: [7.5, 8, 8.5, 9], l: "R" },
        { s: [8.5, 7.5, 8, 8.5], l: "W" },
        { s: [9, 8.5, 7, 8], l: "S" },
      ].map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex gap-0.5 h-16 items-end">
            {item.s.map((v, j) => (
              <div
                key={j}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${(v / 9) * 100}%`,
                  background: ["#f472b6", "#818cf8", "#34d399", "#fb923c"][j],
                }}
              />
            ))}
          </div>
          <span className="text-[9px] text-gray-400 font-medium">{item.l}</span>
        </div>
      ))}
    </div>
    <div className="text-center font-black text-gray-800">
      8.5<span className="text-sm font-normal text-gray-400">/9</span>
    </div>
  </div>
);

const Progress = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
      <div className="bg-gray-50 rounded-3xl p-6 sm:p-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionLabel cls="bg-orange-50 text-orange-600 border border-orange-100">
              Study Progress Report
            </SectionLabel>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Detailed analysis on your IELTS preparation progress
            </h3>
            <ul className="space-y-2.5 mb-6">
              {[
                "Get target band score for each section",
                "Track your progress for achieving target",
                "Get detailed section score graphs",
                "AI/ML suggestions on current study state",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckBoxIcon />
                  {t}
                </li>
              ))}
            </ul>
            <PrimaryBtn>See my progress →</PrimaryBtn>
          </div>
          <div className="flex justify-center">
            <ProgressCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Progress;
