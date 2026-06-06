const router = require("express").Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const {
  register, login, forgotPassword, resetPassword, getMe, changePassword,
} = require("../controllers/authController");

router.post(
  "/register",
  [
    body("firstName").trim().notEmpty().withMessage("First name is required"),
    body("lastName").trim().notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 characters"),
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Valid email required")],
  validate,
  forgotPassword
);

router.post(
  "/reset-password/:token",
  [body("password").isLength({ min: 6 }).withMessage("Password min 6 characters")],
  validate,
  resetPassword
);

router.get("/me", protect, getMe);

router.put(
  "/change-password",
  protect,
  [
    body("currentPassword").notEmpty().withMessage("Current password required"),
    body("newPassword").isLength({ min: 6 }).withMessage("New password min 6 characters"),
  ],
  validate,
  changePassword
);

module.exports = router;
