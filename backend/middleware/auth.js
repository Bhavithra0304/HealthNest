const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");
const sendResponse = require("../utils/sendResponse");
const Doctor = require("../models/Doctor");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return sendResponse(res, 401, false, "Not authorized");
  }

  try {
    const decoded = verifyToken(token);
    let user;
    if (decoded.role === "doctor") {
      user = await Doctor.findById(decoded.id).select("-password");
    } else {
      user = await User.findById(decoded.id).select("-password");
    }

    if (!user) {
      return sendResponse(res, 401, false, "User not found");
    }

    if (user.status === "inactive") {
      return sendResponse(res, 403, false, "Account is inactive");
    }

    req.user = user;
    next();
  } catch (err) {
    return sendResponse(res, 401, false, "Token invalid or expired");
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role !== "Admin") {
    return sendResponse(res, 403, false, "Access denied: admins only");
  }
  next();
};

module.exports = { protect, adminOnly };
