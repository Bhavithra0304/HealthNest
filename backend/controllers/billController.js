const Bill = require("../models/Bill");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const sendResponse = require("../utils/sendResponse");

// Auto-create bill when appointment is booked
const createBillForAppointment = async (appointment) => {
  try {
    // Get consultation fee from doctor if available
    let consultationFee = 500; // default fee
    if (appointment.doctorId) {
      const doctor = await Doctor.findById(appointment.doctorId);
      if (doctor?.consultationFee) consultationFee = doctor.consultationFee;
    }

    const items = [
      { description: "Consultation Fee", amount: consultationFee },
      { description: "Registration Charge", amount: 50 },
    ];

    const subtotal = items.reduce((sum, i) => sum + i.amount, 0);
    const tax = Math.round(subtotal * 0.05); // 5% tax
    const totalAmount = subtotal + tax;

    await Bill.create({
      appointmentId: appointment._id,
      userId:        appointment.userId,
      patientName:   appointment.name,
      patientEmail:  appointment.email,
      doctor:        appointment.doctor,
      department:    appointment.department,
      date:          appointment.date,
      time:          appointment.time,
      items,
      subtotal,
      tax,
      totalAmount,
    });
  } catch (err) {
    console.error("Bill creation error:", err.message);
  }
};

// GET /api/bills — user sees own, admin sees all
const getBills = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, paymentStatus } = req.query;
    const query = {};

    if (req.user.role !== "admin") query.userId = req.user._id;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const skip = (page - 1) * limit;
    const [bills, total] = await Promise.all([
      Bill.find(query)
        .populate("appointmentId", "status")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Bill.countDocuments(query),
    ]);

    sendResponse(res, 200, true, "Bills fetched", { bills, total });
  } catch (err) {
    next(err);
  }
};

// GET /api/bills/:id
const getBillById = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id).populate("appointmentId");
    if (!bill) return sendResponse(res, 404, false, "Bill not found");

    // Users can only view their own bills
    if (req.user.role !== "admin" && String(bill.userId) !== String(req.user._id)) {
      return sendResponse(res, 403, false, "Access denied");
    }

    sendResponse(res, 200, true, "Bill fetched", bill);
  } catch (err) {
    next(err);
  }
};

// PUT /api/bills/:id/pay (user pays bill)
const payBill = async (req, res, next) => {
  try {
    const { paymentMethod } = req.body;
    const bill = await Bill.findById(req.params.id);
    if (!bill) return sendResponse(res, 404, false, "Bill not found");

    if (req.user.role !== "admin" && String(bill.userId) !== String(req.user._id)) {
      return sendResponse(res, 403, false, "Access denied");
    }

    bill.paymentStatus = "Paid";
    bill.paymentMethod = paymentMethod || "Online";
    await bill.save();

    sendResponse(res, 200, true, "Payment successful", bill);
  } catch (err) {
    next(err);
  }
};

// PUT /api/bills/:id (admin update — fee, discount, notes)
const updateBill = async (req, res, next) => {
  try {
    const { items, discount, tax, notes, paymentStatus, paymentMethod } = req.body;
    const bill = await Bill.findById(req.params.id);
    if (!bill) return sendResponse(res, 404, false, "Bill not found");

    if (items)         bill.items    = items;
    if (discount != null) bill.discount = discount;
    if (tax != null)   bill.tax      = tax;
    if (notes != null) bill.notes    = notes;
    if (paymentStatus) bill.paymentStatus = paymentStatus;
    if (paymentMethod) bill.paymentMethod = paymentMethod;

    const subtotal = bill.items.reduce((s, i) => s + i.amount, 0);
    bill.subtotal    = subtotal;
    bill.totalAmount = subtotal + (bill.tax || 0) - (bill.discount || 0);

    await bill.save();
    sendResponse(res, 200, true, "Bill updated", bill);
  } catch (err) {
    next(err);
  }
};

// GET /api/bills/stats (admin)
const getBillStats = async (req, res, next) => {
  try {
    const [total, paid, unpaid, waived] = await Promise.all([
      Bill.countDocuments(),
      Bill.countDocuments({ paymentStatus: "Paid" }),
      Bill.countDocuments({ paymentStatus: "Unpaid" }),
      Bill.countDocuments({ paymentStatus: "Waived" }),
    ]);

    const revenueAgg = await Bill.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    sendResponse(res, 200, true, "Bill stats", { total, paid, unpaid, waived, totalRevenue });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBillForAppointment, getBills, getBillById, payBill, updateBill, getBillStats };
