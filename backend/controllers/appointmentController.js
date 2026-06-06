const Appointment = require("../models/Appointment");
const { createBillForAppointment } = require("./billController");
const sendResponse = require("../utils/sendResponse");
const Activity = require("../models/Activity");

// POST /api/appointments
const bookAppointment = async (req, res, next) => {
  try {
    const { doctor, date, time } = req.body;

    const conflict = await Appointment.findOne({ doctor, date, time });
    if (conflict)
      return sendResponse(res, 409, false, "This slot is already booked");

    const today = new Date().toISOString().split("T")[0];
    if (date < today)
      return sendResponse(res, 400, false, "Cannot book past dates");

    const appt = await Appointment.create({
      ...req.body,
      userId: req.user?.role !== "admin" ? req.user?._id : undefined,
    });
    await Activity.create({
      title: `Doctor ${doctor.name} added`,
      type: "doctor",
    });

    // Auto-generate bill
    await createBillForAppointment(appt);

    sendResponse(res, 201, true, "Appointment booked successfully", appt);
  } catch (err) {
    next(err);
  }
};

// GET /api/appointments
const getAppointments = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (req.user.role !== "admin") query.userId = req.user._id;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { doctor: new RegExp(search, "i") },
        { department: new RegExp(search, "i") },
      ];
    }

    const skip = (page - 1) * limit;
    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Appointment.countDocuments(query),
    ]);

    sendResponse(res, 200, true, "Appointments fetched", {
      appointments,
      total,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/appointments/:id/status (admin)
const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!appt) return sendResponse(res, 404, false, "Appointment not found");
    sendResponse(res, 200, true, "Status updated", appt);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/appointments/:id
const deleteAppointment = async (req, res, next) => {
  try {
    const appt = await Appointment.findByIdAndDelete(req.params.id);
    if (!appt) return sendResponse(res, 404, false, "Appointment not found");
    sendResponse(res, 200, true, "Appointment deleted");
  } catch (err) {
    next(err);
  }
};

// PUT /api/appointments/:id/reschedule
const rescheduleAppointment = async (req, res, next) => {
  try {
    const { date, time } = req.body;
    const conflict = await Appointment.findOne({
      doctor: req.body.doctor,
      date,
      time,
      _id: { $ne: req.params.id },
    });
    if (conflict) return sendResponse(res, 409, false, "Slot already taken");

    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { date, time, status: "Pending" },
      { new: true },
    );
    if (!appt) return sendResponse(res, 404, false, "Appointment not found");
    sendResponse(res, 200, true, "Appointment rescheduled", appt);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  updateStatus,
  deleteAppointment,
  rescheduleAppointment,
};
