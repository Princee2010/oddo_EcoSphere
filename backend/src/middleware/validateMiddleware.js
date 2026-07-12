const { validationResult } = require("express-validator");

// Place this after a chain of express-validator checks. If any failed,
// responds 400 with a clean field/message list instead of hitting the controller.
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = validate;
