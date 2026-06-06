const Contact = require("../models/Contact");
const sendResponse = require("../utils/sendResponse");

// POST /api/contact
const submitContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    sendResponse(res, 201, true, "Message sent successfully", contact);
  } catch (err) {
    next(err);
  }
};

// GET /api/contact (admin only)
const getContacts = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Contact.countDocuments(query),
    ]);

    sendResponse(res, 200, true, "Contacts fetched", { contacts, total });
  } catch (err) {
    next(err);
  }
};

// PUT /api/contact/:id/status (admin only)
const updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!contact) return sendResponse(res, 404, false, "Contact not found");
    sendResponse(res, 200, true, "Status updated", contact);
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact, getContacts, updateContactStatus };
