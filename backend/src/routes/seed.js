require("dotenv").config();
const mongoose = require("mongoose");
const Test = require("./models/Test");

// Import your existing answer keys
const READING_ANSWER_KEY = {
  1: "FALSE", 2: "TRUE", 3: "NOT GIVEN", /* ... all 40 */ 40: "NO",
};

const LISTENING_ANSWER_KEY = {
  1: "Parkinson", 2: "Cowley", /* ... */ 24: "A",
};

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Test.deleteOne({ testId: "cambridge-10-test-1" }); // clean slate

  await Test.create({
    testId: "cambridge-10-test-1",
    title:  "Cambridge IELTS 10 — Academic · Test 1",
    sections: {
      listening: {
        type:     "listening",
        audioSrc: "/test-1-listening.mp3",
        answerKey: LISTENING_ANSWER_KEY,
        // passages array holds your Section1–4 question data
        passages: [ /* your listening sections as objects */ ],
      },
      reading: {
        type:     "reading",
        answerKey: READING_ANSWER_KEY,
        altAnswers: { 10: ["four sides", "4 sides"], 12: ["verandas", "verandahs"] },
        passages: [ /* your PASSAGES array from ReadingTest.jsx */ ],
      },
    },
  });

  console.log("Seeded!");
  process.exit(0);
}
seed();