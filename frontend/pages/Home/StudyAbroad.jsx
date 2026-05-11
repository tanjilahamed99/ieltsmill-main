const universities = [
  "Imperial College London",
  "University of London",
  "Stanford University",
  "University of Melbourne",
  "Harvard University",
  "MIT",
  "Massachusetts Institute",
  "Imperial College",
];

const StudyAbroad = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
          Study Abroad with IELTS
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          More than 11000 institutes in 140+ countries accept IELTS score for
          foreign students
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 items-center">
        {universities.map((uni, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-500 hover:bg-gray-200 transition-colors cursor-default">
            {uni}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudyAbroad;
