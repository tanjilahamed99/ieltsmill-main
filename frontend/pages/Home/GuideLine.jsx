

import CheckBoxIcon from "../../components/Shared/CheckBoxIcon";
import SectionLabel from "../../components/Shared/SectionLabel";

const GuideLine = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-5">
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {[
                {
                  title: "Vocabulary Books",
                  icon: "📚",
                  cls: "bg-pink-50 border-pink-100",
                },
                {
                  title: "Blogs and Guides",
                  icon: "✍️",
                  cls: "bg-purple-50 border-purple-100",
                },
                {
                  title: "How to do well in speaking",
                  icon: "🎙️",
                  cls: "bg-blue-50 border-blue-100",
                },
                {
                  title: "5 tricks to listening test improvement",
                  icon: "🎧",
                  cls: "bg-green-50 border-green-100",
                },
                {
                  title: "Time Management during writing test",
                  icon: "⏱️",
                  cls: "bg-yellow-50 border-yellow-100 col-span-2",
                },
              ].map((item, i) => (
                <div key={i} className={`rounded-xl border p-3 ${item.cls}`}>
                  <div className="text-xl mb-1">{item.icon}</div>
                  <p className="text-xs font-semibold text-gray-700">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <SectionLabel cls="bg-emerald-100 text-emerald-700 border border-emerald-200">
              Guidelines & Study IELTS
            </SectionLabel>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Get insights from trained Instructors and learn more
            </h3>
            <ul className="space-y-2.5 mb-6">
              {[
                "Tips and tricks for better performance",
                "Blogs and articles for detailed study",
                "Explanation videos",
                "Guidelines for start to end",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckBoxIcon />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-block text-white font-bold px-6 py-3 rounded-full bg-linear-to-r from-green-400 to-blue-500 text-sm hover:scale-105 hover:shadow-xl transition-all shadow-lg">
              Start Learning →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideLine;
