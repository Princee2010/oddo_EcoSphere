const express = require("express");
const authRoutes = require("./authRoutes");
const carbonRoutes = require("./carbonRoutes");
const energyRoutes = require("./energyRoutes");
const waterRoutes = require("./waterRoutes");
const wasteRoutes = require("./wasteRoutes");
const supplierRoutes = require("./supplierRoutes");
const goalRoutes = require("./goalRoutes");
const auditRoutes = require("./auditRoutes");
const dashboardRoutes = require("./dashboardRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/carbon", carbonRoutes);
router.use("/energy", energyRoutes);
router.use("/water", waterRoutes);
router.use("/waste", wasteRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/goals", goalRoutes);
router.use("/audits", auditRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;