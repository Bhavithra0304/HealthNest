const router = require("express").Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect, adminOnly } = require("../middleware/auth");
const { submitContact, getContacts, updateContactStatus } = require("../controllers/contactController");

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  validate,
  submitContact
);

router.get("/", protect, adminOnly, getContacts);
router.put("/:id/status", protect, adminOnly, updateContactStatus);

module.exports = router;
