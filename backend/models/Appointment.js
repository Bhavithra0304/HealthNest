const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true },
    email:      { type: String, required: true },
    phone:      { type: String, required: true },
    department: { type: String, required: true },
    doctor:     { type: String, required: true },
    doctorId:   { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date:       { type: String, required: true },
    time:       { type: String, required: true },
    reason:     { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Prevent duplicate booking for same doctor, date, time
appointmentSchema.index({ doctor: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
