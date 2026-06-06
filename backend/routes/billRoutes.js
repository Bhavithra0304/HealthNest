const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/auth");
const {
  getBills, getBillById, payBill, updateBill, getBillStats,
} = require("../controllers/billController");

router.get("/stats", protect, adminOnly, getBillStats);
router.get("/",      protect, getBills);
router.get("/:id",   protect, getBillById);
router.put("/:id/pay",    protect, payBill);
router.put("/:id",        protect, adminOnly, updateBill);

module.exports = router;
