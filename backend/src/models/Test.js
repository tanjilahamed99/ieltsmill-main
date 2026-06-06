const mongoose = require("mongoose");

// Flexible schema — stores any question structure
const questionSchema = new mongoose.Schema({
  type:     String,   // "tfng", "mcq", "short", "table", "headings", "complete_drag"
  heading:  String,
  title:    String,
  sub:      String,
  options:  [String],
  optionLabels: mongoose.Schema.Types.Mixed,
  items:    mongoose.Schema.Types.Mixed,   // array of question items
  headers:  [String],                      // for table type
  rows:     mongoose.Schema.Types.Mixed,   // for table type
  endings:  mongoose.Schema.Types.Mixed,   // for complete_drag type
  headingsList: mongoose.Schema.Types.Mixed, // for headings type
}, { _id: false });

const passageSchema = new mongoose.Schema({
  id:        Number,
  label:     String,
  title:     String,
  subtitle:  String,
  text:      String,
  questions: [questionSchema],
  headingsList: mongoose.Schema.Types.Mixed,
}, { _id: false });

const sectionSchema = new mongoose.Schema({
  type:      { type: String, enum: ["listening", "reading", "writing"] },
  audioSrc:  String,       // for listening
  passages:  [passageSchema], // for reading
  answerKey: mongoose.Schema.Types.Mixed, // { "1": "FALSE", "2": "TRUE", ... }
  altAnswers: mongoose.Schema.Types.Mixed,
}, { _id: false });

const testSchema = new mongoose.Schema({
  testId:   { type: String, unique: true, required: true }, // e.g. "cambridge-10-test-1"
  title:    String,                                          // "Cambridge IELTS 10 — Test 1"
  sections: {
    listening: sectionSchema,
    reading:   sectionSchema,
    writing:   sectionSchema,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Test", testSchema);