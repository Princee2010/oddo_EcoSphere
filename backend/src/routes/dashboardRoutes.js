const express = require("express");
const { getSummary, getTrend } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", protect, getSummary);
router.get("/trend", protect, getTrend);

module.exports = router;