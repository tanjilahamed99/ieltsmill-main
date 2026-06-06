import React from "react";

const ListeningCom = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">IELTS Listening Practice</h1>
        <p className="text-gray-600 mt-2">
          Complete the questions while listening to the audio.
        </p>
      </div>

      {/* PART 1 */}
      <section className="bg-white shadow-md rounded-2xl p-6 border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Part 1</h2>

          <span className="bg-yellow-300 px-4 py-1 rounded font-semibold">
            Questions 1 - 10
          </span>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mb-8">
          <p className="font-semibold">
            Complete the form below.
          </p>
          <p>Write NO MORE THAN TWO WORDS OR A NUMBER.</p>
        </div>

        {/* Form Section */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold bg-black text-yellow-300 inline-block px-3 py-1">
              DENHAM&apos;S SHIPPING AGENCY
            </h3>

            <div className="space-y-4">
              <div>
                <label className="font-medium">
                  1. Name: Tim
                </label>

                <input
                  type="text"
                  placeholder="Answer"
                  className="w-full mt-2 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  2. Address to be collected from ______ University
                </label>

                <input
                  type="text"
                  placeholder="Answer"
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="font-medium">
                  Town: Brighton
                </label>
              </div>

              <div>
                <label className="font-medium">
                  3. Postcode
                </label>

                <input
                  type="text"
                  placeholder="Answer"
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>
            </div>

            {/* Container */}
            <div className="mt-8">
              <h4 className="font-bold text-lg mb-4">
                Size of Container
              </h4>

              <div className="space-y-4">
                <div>
                  <label>Length: 2.5m</label>
                </div>

                <div>
                  <label>4. Width</label>

                  <input
                    type="text"
                    className="w-full mt-2 border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label>5. Depth</label>

                  <input
                    type="text"
                    className="w-full mt-2 border rounded-lg p-3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h4 className="font-bold text-lg mb-5">
              Contents
            </h4>

            <div className="space-y-5">
              <div>
                <label>Books</label>
              </div>

              <div>
                <label>6.</label>

                <input
                  type="text"
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>

              <div>
                <label>7.</label>

                <input
                  type="text"
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>

              <div>
                <label>8. Total estimated value</label>

                <input
                  type="text"
                  className="w-full mt-2 border rounded-lg p-3"
                />
              </div>
            </div>

            {/* MCQ */}
            <div className="mt-10 space-y-8">
              {/* Q9 */}
              <div>
                <p className="font-semibold mb-3">
                  9. What is the minimum recommended cover by the agency?
                </p>

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="q9" />
                    Premium
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="q9" />
                    Standard
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="q9" />
                    Economy
                  </label>
                </div>
              </div>

              {/* Q10 */}
              <div>
                <p className="font-semibold mb-3">
                  10. Where does the customer want the goods delivered?
                </p>

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="q10" />
                    Port
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="q10" />
                    Home
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="q10" />
                    Business
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Parts */}
      <section className="grid md:grid-cols-3 gap-5">
        <div className="border rounded-2xl p-6 text-center bg-gray-50">
          <h3 className="font-bold text-xl">Part 2</h3>
          <p className="text-gray-500 mt-2">Coming Soon</p>
        </div>

        <div className="border rounded-2xl p-6 text-center bg-gray-50">
          <h3 className="font-bold text-xl">Part 3</h3>
          <p className="text-gray-500 mt-2">Coming Soon</p>
        </div>

        <div className="border rounded-2xl p-6 text-center bg-gray-50">
          <h3 className="font-bold text-xl">Part 4</h3>
          <p className="text-gray-500 mt-2">Coming Soon</p>
        </div>
      </section>
    </div>
  );
};

export default ListeningCom;