const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["patient", "doctor", "appointment", "bill", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);