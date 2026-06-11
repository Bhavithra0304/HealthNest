const Appointment = require("../models/Appointment");
const sendResponse = require("../utils/sendResponse");
const getDoctorDashboard = async (req, res, next) => {
  try {
    const doctorId = req.user?._id || req.user?.id;

    if (!doctorId) {
      return sendResponse(res, 401, false, "Doctor identity not found");
    }

    const appointments = await Appointment.find({
      doctorId,
    }).sort({ createdAt: -1 });
    const today = new Date().toISOString().split("T")[0];

    const todayAppointments = appointments.filter(
      (a) => a.date === today
    ).length;

    const pendingAppointments = appointments.filter(
      (a) => a.status === "Pending"
    ).length;

    const completedAppointments = appointments.filter(
      (a) => a.status === "Completed"
    ).length;

    const uniquePatients = [
      ...new Set(
        appointments.map((a) => a.email)
      ),
    ];

    sendResponse(res, 200, true, "Doctor dashboard", {
      totalPatients: uniquePatients.length,
      todayAppointments,
      pendingAppointments,
      completedAppointments,
      recentAppointments: appointments.slice(0, 10),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDoctorDashboard,
};