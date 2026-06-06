const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
    statusCode = 409;
  }

  // Mongoose validation
  if (err.name === "ValidationError") {
    message = Object.values(err.errors).map((e) => e.message).join(", ");
    statusCode = 422;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token";
    statusCode = 401;
  }
  if (err.name === "TokenExpiredError") {
    message = "Token expired";
    statusCode = 401;
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
