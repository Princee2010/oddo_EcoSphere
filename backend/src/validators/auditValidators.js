const { body } = require("express-validator");

const auditValidator = [
  body("title").trim().notEmpty().withMessage("title is required"),
  body("type")
    .isIn(["internal", "external", "regulatory", "supplier"])
    .withMessage("type must be internal, external, regulatory, or supplier"),
  body("scope").optional().trim(),
  body("auditor").optional().trim(),
  body("status")
    .optional()
    .isIn(["scheduled", "in_progress", "completed", "failed"])
    .withMessage("status must be scheduled, in_progress, completed, or failed"),
  body("score").optional().isFloat({ min: 0, max: 100 }).withMessage("score must be between 0 and 100"),
  body("date").optional().isISO8601().withMessage("date must be a valid ISO date"),
];

module.exports = { auditValidator };