const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const sendResponse = require("../utils/sendResponse");
const crypto = require("crypto");
const Activity = require("../models/Activity");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password, termsAccepted } =
      req.body;
    if (!termsAccepted) {
      return sendResponse(
        res,
        400,
        false,
        "You must accept the Terms & Conditions",
      );
    }
    const existing = await User.findOne({ email });
    if (existing)
      return sendResponse(res, 409, false, "Email already registered");

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    await Activity.create({
      title: `${user.firstName} ${user.lastName} registered`,
      type: "patient",
    });

    const token = generateToken({ id: user._id, role: user.role });
    sendResponse(res, 201, true, "Registration successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Admin login
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = generateToken(
        { role: "Admin", email },
        rememberMe ? "30d" : process.env.JWT_EXPIRE,
      );
      return sendResponse(res, 200, true, "Admin login successful", {
        token,
        user: { email, name: "Administrator", role: "admin" },
      });
    }

    let user = await User.findOne({ email });
    let role = "user";

    if (!user) {
      user = await Doctor.findOne({ email });
      role = "doctor";
      console.log("doctor");
    }

    if (!user) {
      return sendResponse(res, 401, false, "Invalid email or password");
    }

    let passwordMatch = false;

    if (role === "doctor") {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordMatch = await user.matchPassword(password);
    }

    if (!passwordMatch) {
      return sendResponse(res, 401, false, "Invalid email or password");
    }
    if (user.status === "inactive") {
      return sendResponse(res, 403, false, "Account is inactive");
    }

    const token = generateToken(
      {
        id: user._id,
        role: role === "doctor" ? "doctor" : user.role,
      },
      rememberMe ? "30d" : process.env.JWT_EXPIRE,
      console.log("Doctor Login", user._id, role),
    );

    sendResponse(res, 200, true, "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role === "doctor" ? "doctor" : user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (email === process.env.ADMIN_EMAIL) {
      return sendResponse(
        res,
        200,
        true,
        "Reset instructions sent (admin account)",
      );
    }

    const user = await User.findOne({ email });
    if (!user)
      return sendResponse(res, 404, false, "No account found with this email");

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save({ validateBeforeSave: false });

    // In production, email this token. For now, return it.
    sendResponse(res, 200, true, "Reset instructions sent to your email", {
      resetToken, // remove in production
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/reset-password/:token
const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return sendResponse(res, 400, false, "Invalid or expired reset token");

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendResponse(res, 200, true, "Password reset successful");
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  if (req.user.role === "Admin") {
    return sendResponse(res, 200, true, "Admin profile", req.user);
  }
  sendResponse(res, 200, true, "User profile", req.user);
};

// PUT /api/auth/change-password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return sendResponse(res, 404, false, "User not found");

    const match = await user.matchPassword(currentPassword);
    if (!match)
      return sendResponse(res, 400, false, "Current password is incorrect");

    user.password = newPassword;
    await user.save();
    sendResponse(res, 200, true, "Password changed successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  changePassword,
};
