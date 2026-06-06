const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/auth");
const {
  getPatients, deletePatient, updatePatientStatus, getProfile, updateProfile,
} = require("../controllers/patientController");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/", protect, adminOnly, getPatients);
router.delete("/:id", protect, adminOnly, deletePatient);
router.put("/:id/status", protect, adminOnly, updatePatientStatus);

module.exports = router;
