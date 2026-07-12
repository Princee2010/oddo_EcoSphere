const { body, param } = require("express-validator");

const idParamValidator = [param("id").notEmpty().withMessage("Id param is required")];

const carbonValidator = [
  body("source").trim().notEmpty().withMessage("source is required"),
  body("activityValue").isFloat({ min: 0 }).withMessage("activityValue must be a positive number"),
  body("unit").trim().notEmpty().withMessage("unit is required"),
  body("co2Equivalent").isFloat({ min: 0 }).withMessage("co2Equivalent must be a positive number"),
  body("date").optional().isISO8601().withMessage("date must be a valid ISO date"),
];

const energyValidator = [
  body("source").trim().notEmpty().withMessage("source is required"),
  body("consumption").isFloat({ min: 0 }).withMessage("consumption must be a positive number"),
  body("date").optional().isISO8601().withMessage("date must be a valid ISO date"),
];

const waterValidator = [
  body("source").trim().notEmpty().withMessage("source is required"),
  body("consumption").isFloat({ min: 0 }).withMessage("consumption must be a positive number"),
  body("date").optional().isISO8601().withMessage("date must be a valid ISO date"),
];

const wasteValidator = [
  body("type").trim().notEmpty().withMessage("type is required"),
  body("quantity").isFloat({ min: 0 }).withMessage("quantity must be a positive number"),
  body("date").optional().isISO8601().withMessage("date must be a valid ISO date"),
];

module.exports = {
  idParamValidator,
  carbonValidator,
  energyValidator,
  waterValidator,
  wasteValidator,
};