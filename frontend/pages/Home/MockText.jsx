
import CheckBoxIcon from "../../components/Shared/CheckBoxIcon";
import PrimaryBtn from "../../components/Shared/PrimaryBtn";
import SectionLabel from "../../components/Shared/SectionLabel";

const MockTestCard = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 w-full max-w-xs">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-gray-600">
        IELTS Mock Test 1
      </span>
      <span className="text-[10px] bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded-full">
        Edit
      </span>
    </div>
    <div className="flex items-center gap-3 mb-3">
      <div className="text-3xl font-black text-primary">
        7.5<span className="text-base text-gray-400">/9</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
          <span>L</span>
          <span>R</span>
          <span>W</span>
          <span>S</span>
        </div>
        <div className="flex gap-1 h-10 items-end">
          {[7, 8, 6.5, 8].map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${(v / 9) * 100}%`,
                background: ["#f472b6", "#818cf8", "#34d399", "#fb923c"][i],
              }}
            />
          ))}
        </div>
      </div>
    </div>
    <div className="bg-gray-50 rounded-xl p-2 text-center">
      <p className="text-[10px] text-gray-500">IELTS Full Mock Test</p>
      <p className="text-xs font-semibold text-gray-700">
        Well done throughout! 🎉
      </p>
    </div>
  </div>
);

const MockText = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-5">
      <div className="bg-gray-50 rounded-3xl p-6 sm:p-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionLabel cls="bg-red-50 text-red-600 border border-red-100">
              Unlimited Free Mock Test
            </SectionLabel>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Mock test with official IELTS exam experience
            </h3>
            <ul className="space-y-2.5 mb-6">
              {[
                "Get questions from past 10 years and test your ability",
                "100+ full-length IELTS mock tests in exam simulation format",
                "Get the real exam experience in our simulation mode",
                "Get detailed report for each section",
                "Practice anywhere, from any device",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckBoxIcon />
                  {t}
                </li>
              ))}
            </ul>
            <PrimaryBtn>Try Mock Test →</PrimaryBtn>
          </div>
          <div className="flex justify-center">
            <MockTestCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockText;
