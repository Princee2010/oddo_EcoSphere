const { body } = require("express-validator");

const goalValidator = [
  body("pillar")
    .isIn(["environmental", "social", "governance"])
    .withMessage("pillar must be environmental, social, or governance"),
  body("title").trim().notEmpty().withMessage("title is required"),
  body("targetValue").isFloat({ min: 0 }).withMessage("targetValue must be a positive number"),
  body("deadline").optional().isISO8601().withMessage("deadline must be a valid ISO date"),
  body("status")
    .optional()
    .isIn(["in_progress", "completed", "at_risk"])
    .withMessage("status must be in_progress, completed, or at_risk"),
];

module.exports = { goalValidator };
