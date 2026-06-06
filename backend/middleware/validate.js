const { validationResult } = require("express-validator");
const sendResponse = require("../utils/sendResponse");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => e.msg).join(", ");
    return sendResponse(res, 422, false, messages);
  }
  next();
};

module.exports = validate;
