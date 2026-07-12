const asyncHandler = require("../utils/asyncHandler");
const prisma = require("../config/prismaClient");

const getSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const [carbon, energy, water, wasteByType, supplierStats, goals] = await Promise.all([
    prisma.carbonEntry.aggregate({
      where: { userId },
      _sum: { co2Equivalent: true },
      _count: true,
    }),
    prisma.energyEntry.aggregate({
      where: { userId },
      _sum: { consumption: true },
      _count: true,
    }),
    prisma.waterEntry.aggregate({
      where: { userId },
      _sum: { consumption: true },
      _count: true,
    }),
    prisma.wasteEntry.groupBy({
      by: ["type"],
      where: { userId },
      _sum: { quantity: true },
    }),
    prisma.supplier.aggregate({
      where: { userId },
      _avg: { esgScore: true },
      _count: true,
    }),
    prisma.goal.findMany({ where: { userId } }),
  ]);

  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const avgGoalProgress =
    totalGoals === 0
      ? 0
      : goals.reduce((acc, g) => {
          const progress = g.targetValue > 0 ? Math.min(g.currentValue / g.targetValue, 1) : 0;
          return acc + progress;
        }, 0) / totalGoals;

  const esgScore = Math.round(
    avgGoalProgress * 70 + ((supplierStats._avg.esgScore || 0) / 100) * 30
  );

  res.json({
    success: true,
    data: {
      environmental: {
        totalCo2Equivalent: carbon._sum.co2Equivalent || 0,
        carbonEntries: carbon._count,
        totalEnergyConsumption: energy._sum.consumption || 0,
        energyEntries: energy._count,
        totalWaterConsumption: water._sum.consumption || 0,
        waterEntries: water._count,
        wasteByType,
      },
      governance: {
        supplierCount: supplierStats._count,
        avgSupplierEsgScore: supplierStats._avg.esgScore || 0,
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