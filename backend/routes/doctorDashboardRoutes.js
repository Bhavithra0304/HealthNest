const router = require("express").Router();

const { protect } = require("../middleware/auth");
const {
  getDoctorDashboard,
} = require("../controllers/doctorDashboardController");

router.get("/", protect, getDoctorDashboard);

module.exports = router;