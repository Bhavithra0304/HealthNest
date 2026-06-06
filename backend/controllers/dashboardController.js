const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Contact = require("../models/Contact");
const Bill = require("../models/Bill");
const Activity = require("../models/Activity");
const sendResponse = require("../utils/sendResponse");

const getDashboard = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments,
      unreadContacts,
      todayAppointments,
      recentAppointments,
      totalBills,
      paidBills,
      unpaidBills,
      revenueAgg,
      recentActivities,
      departmentLoad,
    ] = await Promise.all([
      // Patients
      User.countDocuments({ role: "user" }),

      // Doctors
      Doctor.countDocuments(),

      // Appointments
      Appointment.countDocuments(),

      Appointment.countDocuments({
        status: "Pending",
      }),

      Appointment.countDocuments({
        status: "Confirmed",
      }),

      Appointment.countDocuments({
        status: "Completed",
      }),

      Appointment.countDocuments({
        status: "Cancelled",
      }),

      // Contacts
      Contact.countDocuments({
        status: "unread",
      }),

      // Today's Appointments
      Appointment.countDocuments({
        date: today,
      }),

      // Recent Appointments
      Appointment.find()
        .sort({ createdAt: -1 })
        .limit(6),

      // Bills
      Bill.countDocuments(),

      Bill.countDocuments({
        paymentStatus: "Paid",
      }),

      Bill.countDocuments({
        paymentStatus: "Unpaid",
      }),

      // Revenue
      Bill.aggregate([
        {
          $match: {
            paymentStatus: "Paid",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),

      // Recent Activities
      Activity.find()
        .sort({ createdAt: -1 })
        .limit(10),

      // Department Load
      Doctor.aggregate([
        {
          $group: {
            _id: "$department",
            doctors: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            doctors: -1,
          },
        },
      ]),
    ]);

    const totalRevenue =
      revenueAgg.length > 0
        ? revenueAgg[0].total
        : 0;

    sendResponse(
      res,
      200,
      true,
      "Dashboard data",
      {
        totalPatients,
        totalDoctors,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
        unreadContacts,
        todayAppointments,
        recentAppointments,
        totalBills,
        paidBills,
        unpaidBills,
        totalRevenue,

        // New Data
        recentActivities,
        departmentLoad,
      }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboard,
};
// const User = require("../models/User");
// const Doctor = require("../models/Doctor");
// const Appointment = require("../models/Appointment");
// const Contact = require("../models/Contact");
// const Bill = require("../models/Bill");
// const sendResponse = require("../utils/sendResponse");
// const Activity = require("../models/Activity")

// const getDashboard = async (req, res, next) => {
//   try {
//     const today = new Date().toISOString().split("T")[0];

//     const [
//       totalPatients,
//       totalDoctors,
//       totalAppointments,
//       pendingAppointments,
//       confirmedAppointments,
//       completedAppointments,
//       cancelledAppointments,
//       unreadContacts,
//       todayAppointments,
//       recentAppointments,
//       totalBills,
//       paidBills,
//       unpaidBills,
//       revenueAgg,
//     ] = await Promise.all([
//       User.countDocuments({ role: "user" }),
//       Doctor.countDocuments(),
//       Appointment.countDocuments(),
//       Appointment.countDocuments({ status: "Pending" }),
//       Appointment.countDocuments({ status: "Confirmed" }),
//       Appointment.countDocuments({ status: "Completed" }),
//       Appointment.countDocuments({ status: "Cancelled" }),
//       Contact.countDocuments({ status: "unread" }),
//       Appointment.countDocuments({ date: today }),
//       Appointment.find().sort({ createdAt: -1 }).limit(6),
//       Bill.countDocuments(),
//       Bill.countDocuments({ paymentStatus: "Paid" }),
//       Bill.countDocuments({ paymentStatus: "Unpaid" }),
//       Bill.aggregate([
//         { $match: { paymentStatus: "Paid" } },
//         { $group: { _id: null, total: { $sum: "$totalAmount" } } },
//       ]),
//     ]);

//     const totalRevenue = revenueAgg[0]?.total || 0;

//     sendResponse(res, 200, true, "Dashboard data", {
//       totalPatients,
//       totalDoctors,
//       totalAppointments,
//       pendingAppointments,
//       confirmedAppointments,
//       completedAppointments,
//       cancelledAppointments,
//       unreadContacts,
//       todayAppointments,
//       recentAppointments,
//       totalBills,
//       paidBills,
//       unpaidBills,
//       totalRevenue,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = { getDashboard };
