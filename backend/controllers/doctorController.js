const Doctor = require("../models/Doctor");
const sendResponse = require("../utils/sendResponse");
const Activity = require("../models/Activity");
const bcrypt = require("bcryptjs");

// GET /api/doctors
const getDoctors = async (req, res, next) => {
  try {
    const { search, department, status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (search) query.$text = { $search: search };
    if (department) query.department = department;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const [doctors, total] = await Promise.all([
      Doctor.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),
      Doctor.countDocuments(query),
    ]);

    sendResponse(res, 200, true, "Doctors fetched", {
      doctors,
      total,
      page: Number(page),
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/doctors/:id
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return sendResponse(res, 404, false, "Doctor not found");
    sendResponse(res, 200, true, "Doctor fetched", doctor);
  } catch (err) {
    next(err);
  }
};

// POST /api/doctors (admin)
const createDoctor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      specialization,
      qualification,
      experience,
      department,
      consultationFee,
    } = req.body;

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return sendResponse(res, 409, false, "Doctor email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization,
      qualification,
      experience,
      department,
      consultationFee,
    });

    await Activity.create({
      title: `Doctor ${doctor.name} added`,
      type: "doctor",
    });

    sendResponse(res, 201, true, "Doctor added successfully", doctor);
  } catch (err) {
    next(err);
  }
};

// PUT /api/doctors/:id (admin)
const updateDoctor = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doctor) return sendResponse(res, 404, false, "Doctor not found");

    sendResponse(res, 200, true, "Doctor updated", doctor);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/doctors/:id (admin)
const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return sendResponse(res, 404, false, "Doctor not found");
    sendResponse(res, 200, true, "Doctor removed");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
