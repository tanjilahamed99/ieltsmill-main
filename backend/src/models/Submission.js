const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  // ── Identity ──────────────────────────────────────────────
  userId:   { type: String, required: true }, // from your auth system
  testId:   { type: String, required: true }, // e.g. "cambridge-10-test-1"
  section:  { type: String, enum: ["listening", "reading", "writing"], required: true },

  // ── THIS IS THE KEY FIX FOR "SAME TO SAME" DUPLICATE PROBLEM ──
  // Compound unique index prevents double submissions
  // A student can only submit each section of each test once

  // ── Answers & Score ───────────────────────────────────────
  answers:  mongoose.Schema.Types.Mixed,  // { "1": "FALSE", "2": "TRUE", ... }
  score:    Number,
  total:    Number,
  band:     String,

  // ── Timing ───────────────────────────────────────────────
  timeTaken:  Number,  // seconds
  submittedAt: { type: Date, default: Date.now },
});

// ★ THIS PREVENTS DUPLICATE SUBMISSIONS (the "same to same" fix)
submissionSchema.index(
  { userId: 1, testId: 1, section: 1 },
  { unique: true }
);

module.exports = mongoose.model("Submission", submissionSchema);