const { body } = require("express-validator");

const supplierValidator = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("esgScore")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("esgScore must be between 0 and 100"),
  body("contactEmail").optional().isEmail().withMessage("contactEmail must be a valid email"),
  body("status")
    .optional()
    .isIn(["active", "inactive", "under_review"])
    .withMessage("status must be active, inactive, or under_review"),
];

module.exports = { supplierValidator };