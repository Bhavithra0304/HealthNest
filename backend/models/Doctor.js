const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    specialization: { type: String, required: true },
    qualification: { type: String },
    experience: { type: String },
    department: { type: String, required: true },  
    consultationFee: { type: Number, default: 0 },
    profilePhoto: { type: String, default: "" },

    availability: {
      type: [
        {
          day: String,
          startTime: String,
          endTime: String,
        },
      ],
      default: [],
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true },
);

doctorSchema.index({
  name: "text",
  specialization: "text",
  department: "text",
});

module.exports = mongoose.model("Doctor", doctorSchema);
