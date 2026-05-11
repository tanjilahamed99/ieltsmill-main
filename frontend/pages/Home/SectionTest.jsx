import CheckBoxIcon from "../../components/Shared/CheckBoxIcon";
import PrimaryBtn from "../../components/Shared/PrimaryBtn";
import SectionLabel from "../../components/Shared/SectionLabel";


const SectionTestCard = () => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full max-w-xs">
    <div className="bg-gray-800 aspect-video flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-2">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-white text-xs opacity-75">
          What do you do for a living?
        </p>
      </div>
    </div>
    <div className="p-3">
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= 3 ? "bg-primary" : "bg-gray-200"}`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-gray-500">Speaking</span>
        <button className="text-[10px] text-white bg-primary px-3 py-1 rounded-full font-semibold">
          Next →
        </button>
      </div>
    </div>
  </div>
);

const SectionTest = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-5">
      <div className="bg-gray-50 rounded-3xl p-6 sm:p-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <SectionTestCard />
          </div>
          <div className="order-1 md:order-2">
            <SectionLabel cls="bg-yellow-50 text-yellow-700 border border-yellow-100">
              Section Test
            </SectionLabel>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Section test for individual section improvement
            </h3>
            <ul className="space-y-2.5 mb-6">
              {[
                "Individual test for Listening, Writing & Speaking",
                "Practice the section you are weak at",
                "Get individual result and feedback",
                "Balance your strength in all sections equally",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckBoxIcon />
                  {t}
                </li>
              ))}
            </ul>
            <PrimaryBtn>Try Section Test →</PrimaryBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTest;
