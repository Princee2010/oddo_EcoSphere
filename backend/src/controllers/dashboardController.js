const asyncHandler = require("../utils/asyncHandler");
const CarbonEntry = require("../models/CarbonEntry");
const EnergyEntry = require("../models/EnergyEntry");
const WaterEntry = require("../models/WaterEntry");
const WasteEntry = require("../models/WasteEntry");
const Supplier = require("../models/Supplier");
const Goal = require("../models/Goal");

// @route GET /api/dashboard/summary
// Response shape is kept identical to the previous Prisma version so the
// frontend (DashboardPage.jsx) needs no changes.
const getSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const [carbonEntries, energyEntries, waterEntries, wasteEntries, suppliers, goals] =
    await Promise.all([
      CarbonEntry.find({ userId }),
      EnergyEntry.find({ userId }),
      WaterEntry.find({ userId }),
      WasteEntry.find({ userId }),
      Supplier.find({ userId }),
      Goal.find({ userId }),
    ]);

  const totalCo2Equivalent = carbonEntries.reduce((sum, e) => sum + e.co2Equivalent, 0);
  const totalEnergyConsumption = energyEntries.reduce((sum, e) => sum + e.consumption, 0);
  const totalWaterConsumption = waterEntries.reduce((sum, e) => sum + e.consumption, 0);

  const wasteByTypeMap = {};
  wasteEntries.forEach((e) => {
    wasteByTypeMap[e.type] = (wasteByTypeMap[e.type] || 0) + e.quantity;
  });
  const wasteByType = Object.entries(wasteByTypeMap).map(([type, quantity]) => ({
    type,
    _sum: { quantity },
  }));

  const avgSupplierEsgScore =
    suppliers.length === 0
      ? 0
      : suppliers.reduce((sum, s) => sum + (s.esgScore || 0), 0) / suppliers.length;

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const avgGoalProgress =
    totalGoals === 0
      ? 0
      : goals.reduce((acc, g) => {
          const progress = g.targetValue > 0 ? Math.min(g.currentValue / g.targetValue, 1) : 0;
          return acc + progress;
        }, 0) / totalGoals;

  // Illustrative ESG score: weighted mix of goal progress + supplier ESG rating.
  const esgScore = Math.round(avgGoalProgress * 70 + (avgSupplierEsgScore / 100) * 30);

  res.json({
    success: true,
    data: {
      environmental: {
        totalCo2Equivalent,
        carbonEntries: carbonEntries.length,
        totalEnergyConsumption,
        energyEntries: energyEntries.length,
        totalWaterConsumption,
        waterEntries: waterEntries.length,
        wasteByType,
      },
      governance: {
        supplierCount: suppliers.length,
        avgSupplierEsgScore,
      },
      goals: {
        total: totalGoals,
        completed: completedGoals,
        avgProgressPercent: Math.round(avgGoalProgress * 100),
      },
      esgScore,
    },
  });
});

module.exports = { getSummary };
