const User = require("../models/User");
const sendResponse = require("../utils/sendResponse");

// GET /api/patients (admin only)
const getPatients = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const query = { role: "user" };

    if (search) {
      query.$or = [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    const skip = (page - 1) * limit;
    const [patients, total] = await Promise.all([
      User.find(query).select("-password").skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      User.countDocuments(query),
    ]);

    sendResponse(res, 200, true, "Patients fetched", { patients, total });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/patients/:id (admin only)
const deletePatient = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return sendResponse(res, 404, false, "Patient not found");
    sendResponse(res, 200, true, "Patient removed");
  } catch (err) {
    next(err);
  }
};

// PUT /api/patients/:id/status (admin only)
const updatePatientStatus = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).select("-password");
    if (!user) return sendResponse(res, 404, false, "Patient not found");
    sendResponse(res, 200, true, "Status updated", user);
  } catch (err) {
    next(err);
  }
};

// GET /api/patients/profile (own profile)
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    sendResponse(res, 200, true, "Profile fetched", user);
  } catch (err) {
    next(err);
  }
};

// PUT /api/patients/profile (own profile)
const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone },
      { new: true, runValidators: true }
    ).select("-password");
    sendResponse(res, 200, true, "Profile updated", user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPatients, deletePatient, updatePatientStatus, getProfile, updateProfile };
