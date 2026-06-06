const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/auth");
const { getDashboard } = require("../controllers/dashboardController");

router.get("/", protect, adminOnly, getDashboard);

module.exports = router;
