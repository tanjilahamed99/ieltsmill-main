import { StarIcon } from "lucide-react";


const testimonials = [
  {
    name: "Nguyen Tat Thanh",
    country: "Vietnam",
    stars: 5,
    text: "Honestly, this is the best platform I've used for IELTS practice. The detailed explanations after each question really helped me understand my mistakes and I improved.",
  },
  {
    name: "Muhammad Baitu",
    country: "Bangladesh",
    stars: 5,
    text: "I used this platform throughout my preparation. The simulation helped me train my attention. Mock tests gave me confidence to stay awake and answer rapidly in real exam.",
  },
  {
    name: "Scott Miroka",
    country: "",
    stars: 5,
    text: "This platform was a game-changer for me. The Practice Questions felt very close to the real exam, and the explanations after each question helped me improve step by step.",
  },
  {
    name: "Vishal Kumar",
    country: "India",
    stars: 4,
    text: "I struggled a lot with the Listening sections, but the explanations on this platform made a huge difference. It's the best tool I found for IELTS practice.",
  },
  {
    name: "James Ramirez",
    country: "Colombia",
    stars: 5,
    text: "I'm really happy with my experience here. The explanations were clear and helpful, and the targeted section tests helped me focus on improving listening skills.",
  },
  {
    name: "Arnav Datta",
    country: "Singapore",
    stars: 5,
    text: "The section tests and explanations were just what I needed. The platform made IELTS prep feel simple and structured.",
  },
];

const Testimonial = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
          Voice From The World
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          What our users say after using ILTSMILL and how it helped them improve
          their preparation
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.stars }).map((_, j) => (
                <StarIcon key={j} />
              ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {t.text}
            </p>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-secondary shrink-0 flex items-center justify-center text-white text-xs font-bold">
                {t.name[0]}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">{t.name}</p>
                {t.country && (
                  <p className="text-[10px] text-gray-400">{t.country}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
