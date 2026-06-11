const router = require("express").Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect, adminOnly } = require("../middleware/auth");
const {
  bookAppointment, getAppointments, updateStatus, deleteAppointment, rescheduleAppointment,getDoctorAppointments,
  getDoctorPatients,
} = require("../controllers/appointmentController");
router.get("/doctor", protect, getDoctorAppointments);
router.get("/doctor/patients", protect, getDoctorPatients);

router.get("/", protect, getAppointments);
router.post(
  "/",
  protect,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("department").notEmpty().withMessage("Department is required"),
    body("doctor").notEmpty().withMessage("Doctor is required"),
    body("date").notEmpty().withMessage("Date is required"),
    body("time").notEmpty().withMessage("Time slot is required"),
  ],
  validate,
  bookAppointment
);

router.get("/", protect, getAppointments);

router.put("/:id/status", protect, adminOnly, updateStatus);

router.put("/:id/reschedule", protect, rescheduleAppointment);

router.delete("/:id", protect, deleteAppointment);

module.exports = router;
