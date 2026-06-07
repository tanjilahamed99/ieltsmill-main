// routes/adminRoutes.js
const express = require("express");
const router = express.Router();

const { uploadImage, uploadAudio } = require("../config/cloudinary");
const {
  getTestsByType,
  getTestById,
  createSeries,
  createTest,
  deleteSeries,
  deleteTest,
  getSeries,
  updateSeries,
  updateTest,
  updateTestPublishStatus,
  uploadMultipleAudios,
  uploadMultipleImages,
  uploadSingleAudio,
  uploadSingleImage,
  createSelfReadingTest,
  updateSelfReadingTest,
  deleteSelfReadingTest,
  updateUserStatus,
  getAllUsers,
  deleteUser,
} = require("../controllers/adminController");
const { adminOnly } = require("../middleware/AdminMiddlewere");

router.get("/tests/:type", getTestsByType);
router.get("/test/:type/:id", getTestById);
router.get("/series", getSeries);
router.post("/tests/:type", createTest);
router.put("/tests/:type/:id", updateTest);
router.patch("/tests/:type/:id/publish", updateTestPublishStatus);
router.delete("/tests/:type/:id", deleteTest);
router.post("/series", createSeries);
router.put("/series/:id", updateSeries);
router.delete("/series/:id", deleteSeries);
router.post("/upload/audio", uploadSingleAudio);
router.post(
  "/upload/audios",
  uploadAudio.array("audios", 5),
  uploadMultipleAudios,
);
router.post("/upload/image", uploadSingleImage);
router.post(
  "/upload/images",
  uploadImage.array("images", 10),
  uploadMultipleImages,
);

// self practice
router.post("/selfPractice/:type", adminOnly, createSelfReadingTest);
router.put("/selfPractice/:type/:id", adminOnly, updateSelfReadingTest);
router.delete("/selfPractice/:type/:id", adminOnly, deleteSelfReadingTest);

// use approved for access all pages
router.put("/users/:id/:status", adminOnly, updateUserStatus);
router.delete("/user/:id", adminOnly, deleteUser);
router.get("/users", adminOnly, getAllUsers);

module.exports = router;
