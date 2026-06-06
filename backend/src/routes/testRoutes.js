const mongoose = require("mongoose");
const { Router } = require("express");

const {
  getListeningBand,
  getReadingBand,
  calcOverallBand,
  isCorrect,
} = require("../utils/bandScore");
const {
  getTestAttempts,
  getTestSeries,
  getTestsByType,
  getTestById,
  startTestAttempt,
  saveTestAttempt,
  getTestAttemptResult,
  submitTestAttempt,
  getTotalAttempt,
  getSelfReadingTestById,
  getAllSelfTests,
} = require("../controllers/testController");
const Test = require("../models/Test");

const router = Router();

router.get("/selfPractice/:type", getAllSelfTests);
router.get("/selfPractice/:type/:id", getSelfReadingTestById);

router.get("/series", getTestSeries);
router.get("/:type", getTestsByType);
router.get("/:type/:id", getTestById);
router.post("/attempts/start", startTestAttempt);
router.put("/attempts/:attemptId/save", saveTestAttempt);
router.get("/attempts/:attemptId/result", getTestAttemptResult);
router.post("/attempts/:attemptId/submit", submitTestAttempt);
router.get("/attempts", getTestAttempts);
router.get("/totalAttempt/:userId", getTotalAttempt);

// GET /api/tests/:testId/:section
// e.g. GET /api/tests/cambridge-10-test-1/reading
router.get("/:testId/:section", async (req, res) => {
  try {
    const { testId, section } = req.params;

    const test = await Test.findOne({ testId }).select(
      `sections.${section} title testId`,
    );
    if (!test) return res.status(404).json({ error: "Test not found" });

    const sectionData = getTestSeries.sections?.[section];
    if (!sectionData)
      return res.status(404).json({ error: "Section not found" });

    // ★ NEVER send answerKey to frontend — that's a security fix too
    const { answerKey, altAnswers, ...safeSection } = sectionData.toObject();

    res.json({
      testId: test.testId,
      title: test.title,
      section,
      data: safeSection,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
