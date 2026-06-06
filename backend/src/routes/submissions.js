const router = require("express").Router();
const Submission = require("../models/Submission");
const Test = require("../models/Test");

// Helper: grade answers server-side
function gradeAnswers(userAnswers, answerKey, altAnswers = {}) {
  let score = 0;
  const results = {};

  for (const [qNum, correct] of Object.entries(answerKey)) {
    const userVal = (userAnswers[qNum] || "").toLowerCase().trim().replace(/\s+/g, " ");
    const correctVal = correct.toLowerCase().trim().replace(/\s+/g, " ");

    let isCorrect = userVal === correctVal;

    // Check alternate answers
    if (!isCorrect && altAnswers[qNum]) {
      isCorrect = altAnswers[qNum].some(
        (alt) => alt.toLowerCase().trim() === userVal
      );
    }

    results[qNum] = { isCorrect, correct, given: userAnswers[qNum] || "" };
    if (isCorrect) score++;
  }

  return { score, total: Object.keys(answerKey).length, results };
}

// POST /api/submissions
// Body: { userId, testId, section, answers, timeTaken }
router.post("/", async (req, res) => {
  try {
    const { userId, testId, section, answers, timeTaken } = req.body;

    if (!userId || !testId || !section || !answers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ★ CHECK FOR DUPLICATE — "same to same" problem solved here
    const existing = await Submission.findOne({ userId, testId, section });
    if (existing) {
      return res.status(409).json({
        error: "Already submitted",
        message: "You have already submitted this section.",
        submissionId: existing._id,
      });
    }

    // Grade server-side (answers never exposed to frontend)
    const test = await Test.findOne({ testId }).select(`sections.${section}.answerKey sections.${section}.altAnswers`);
    if (!test) return res.status(404).json({ error: "Test not found" });

    const { answerKey, altAnswers } = test.sections[section];
    const { score, total, results } = gradeAnswers(answers, answerKey, altAnswers || {});

    // Band score for reading/listening
    const band = getBandScore(score, total);

    const submission = await Submission.create({
      userId, testId, section,
      answers,
      score, total, band,
      timeTaken,
    });

    res.status(201).json({
      submissionId: submission._id,
      score,
      total,
      band,
      results, // per-question correct/wrong — safe to send after submission
      submittedAt: submission.submittedAt,
    });

  } catch (err) {
    // Mongoose duplicate key error (race condition safety net)
    if (err.code === 11000) {
      return res.status(409).json({
        error: "Already submitted",
        message: "Duplicate submission detected.",
      });
    }
    res.status(500).json({ error: err.message });
  }
});

// GET /api/submissions?userId=xxx&testId=yyy
// Returns all submissions for a student (for their dashboard)
router.get("/", async (req, res) => {
  try {
    const { userId, testId } = req.query;
    if (!userId) return res.status(400).json({ error: "userId required" });

    const filter = { userId };
    if (testId) filter.testId = testId;

    const submissions = await Submission.find(filter)
      .select("-answers")  // don't send raw answers in list view
      .sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/submissions/:id  — single submission detail
router.get("/:id", async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: "Not found" });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function getBandScore(score, total) {
  const pct = score / total;
  if (pct >= 0.975) return "9.0";
  if (pct >= 0.925) return "8.5";
  if (pct >= 0.875) return "8.0";
  if (pct >= 0.825) return "7.5";
  if (pct >= 0.750) return "7.0";
  if (pct >= 0.675) return "6.5";
  if (pct >= 0.575) return "6.0";
  if (pct >= 0.475) return "5.5";
  if (pct >= 0.375) return "5.0";
  if (pct >= 0.325) return "4.5";
  if (pct >= 0.250) return "4.0";
  return "3.5";
}

module.exports = router;