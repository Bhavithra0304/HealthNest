  const router = require("express").Router();
  const { protect, adminOnly } = require("../middleware/auth");

  const {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  } = require("../controllers/doctorController");
  const { getDoctorDashboard } =require("../controllers/doctorDashboardController")

  router.get("/dashboard", protect, getDoctorDashboard);

  router.get("/", getDoctors);
  router.get("/:id", getDoctorById);

  router.post("/", protect, adminOnly, createDoctor);
  router.put("/:id", protect, adminOnly, updateDoctor);
  router.delete("/:id", protect, adminOnly, deleteDoctor);

  module.exports = router;