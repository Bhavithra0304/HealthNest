const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    patientName:  { type: String, required: true },
    patientEmail: { type: String, required: true },
    doctor:       { type: String, required: true },
    department:   { type: String, required: true },
    date:         { type: String, required: true },
    time:         { type: String, required: true },
    items: [
      {
        description: { type: String, required: true },
        amount:      { type: Number, required: true },
      },
    ],
    subtotal:       { type: Number, required: true },
    tax:            { type: Number, default: 0 },
    discount:       { type: Number, default: 0 },
    totalAmount:    { type: Number, required: true },
    paymentStatus:  { type: String, enum: ["Unpaid", "Paid", "Waived"], default: "Unpaid" },
    paymentMethod:  { type: String, enum: ["Cash", "Card", "Insurance", "Online", ""], default: "" },
    invoiceNumber:  { type: String, unique: true },
    notes:          { type: String, default: "" },
  },
  { timestamps: true }
);

// Auto-generate invoice number before save
billSchema.pre("save", async function (next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model("Bill").countDocuments();
    this.invoiceNumber = `HN-${String(count + 1).padStart(5, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Bill", billSchema);
