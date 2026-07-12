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

// @route GET /api/dashboard/trend?months=6
// Groups Carbon/Energy/Water/Waste entries by month so the dashboard can
// render a resource-usage-over-time line chart.
const getTrend = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const months = Math.min(parseInt(req.query.months, 10) || 6, 24);

  const since = new Date();
  since.setMonth(since.getMonth() - (months - 1));
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  const [carbonEntries, energyEntries, waterEntries, wasteEntries] = await Promise.all([
    CarbonEntry.find({ userId, date: { $gte: since } }),
    EnergyEntry.find({ userId, date: { $gte: since } }),
    WaterEntry.find({ userId, date: { $gte: since } }),
    WasteEntry.find({ userId, date: { $gte: since } }),
  ]);

  // Build an ordered list of the last N month buckets, e.g. "2026-02"
  const monthKeys = [];
  const cursor = new Date(since);
  for (let i = 0; i < months; i++) {
    monthKeys.push(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`);
    cursor.setMonth(cursor.getMonth() + 1);
  }

  const monthLabel = (key) => {
    const [year, month] = key.split("-");
    return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
  };

  const buckets = Object.fromEntries(
    monthKeys.map((key) => [
      key,
      { month: key, label: monthLabel(key), carbon: 0, energy: 0, water: 0, waste: 0 },
    ])
  );

  const keyOf = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  carbonEntries.forEach((e) => {
    const key = keyOf(e.date);
    if (buckets[key]) buckets[key].carbon += e.co2Equivalent;
  });
  energyEntries.forEach((e) => {
    const key = keyOf(e.date);
    if (buckets[key]) buckets[key].energy += e.consumption;
  });
  waterEntries.forEach((e) => {
    const key = keyOf(e.date);
    if (buckets[key]) buckets[key].water += e.consumption;
  });
  wasteEntries.forEach((e) => {
    const key = keyOf(e.date);
    if (buckets[key]) buckets[key].waste += e.quantity;
  });

  const trend = monthKeys.map((key) => ({
    ...buckets[key],
    carbon: Math.round(buckets[key].carbon * 100) / 100,
    energy: Math.round(buckets[key].energy * 100) / 100,
    water: Math.round(buckets[key].water * 100) / 100,
    waste: Math.round(buckets[key].waste * 100) / 100,
  }));

  res.json({ success: true, data: trend });
});

module.exports = { getSummary, getTrend };