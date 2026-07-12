/**
 * Seed script — populates sample data entries for every EcoSphere category
 * (Carbon, Energy, Water, Waste, Suppliers, Goals) under one demo user.
 *
 * Usage:
 *   npm run seed            # adds a demo user (if missing) + sample records
 *   npm run seed -- --reset # also wipes existing records for the demo user first
 */

require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");

const User = require("../models/User");
const CarbonEntry = require("../models/CarbonEntry");
const EnergyEntry = require("../models/EnergyEntry");
const WaterEntry = require("../models/WaterEntry");
const WasteEntry = require("../models/WasteEntry");
const Supplier = require("../models/Supplier");
const Goal = require("../models/Goal");

const DEMO_EMAIL = "demo@ecosphere.dev";
const DEMO_PASSWORD = "Demo@12345"; // change after first login
const RESET = process.argv.includes("--reset");

const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

async function getOrCreateDemoUser() {
  let user = await User.findOne({ email: DEMO_EMAIL });
  if (user) {
    console.log(`Using existing demo user (${DEMO_EMAIL})`);
    return user;
  }
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
  user = await User.create({
    name: "Demo User",
    email: DEMO_EMAIL,
    password: hashedPassword,
    role: "admin",
  });
  console.log(`Created demo user: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
  return user;
}

function buildData(userId) {
  return {
    carbon: [
      { userId, source: "Company Vehicle Fleet", activityValue: 1200, unit: "liters diesel", co2Equivalent: 3182, date: daysAgo(30), notes: "Monthly fleet fuel usage" },
      { userId, source: "Business Air Travel", activityValue: 4500, unit: "passenger km", co2Equivalent: 675, date: daysAgo(20), notes: "Quarterly sales trips" },
      { userId, source: "Grid Electricity", activityValue: 8200, unit: "kWh", co2Equivalent: 3444, date: daysAgo(10), notes: "Head office consumption" },
      { userId, source: "Natural Gas Heating", activityValue: 950, unit: "m3", co2Equivalent: 1805, date: daysAgo(3) },
    ],
    energy: [
      { userId, source: "Grid Electricity", consumption: 8200, unit: "kWh", cost: 1476, date: daysAgo(28) },
      { userId, source: "Solar (on-site)", consumption: 1350, unit: "kWh", cost: 0, date: daysAgo(15) },
      { userId, source: "Natural Gas", consumption: 950, unit: "m3", cost: 665, date: daysAgo(7) },
      { userId, source: "Backup Diesel Generator", consumption: 60, unit: "kWh", cost: 24, date: daysAgo(1) },
    ],
    water: [
      { userId, source: "Municipal Supply", consumption: 42000, unit: "liters", cost: 210, date: daysAgo(25) },
      { userId, source: "Rainwater Harvesting", consumption: 5000, unit: "liters", cost: 0, date: daysAgo(14) },
      { userId, source: "Cooling Tower Makeup", consumption: 12500, unit: "liters", cost: 62, date: daysAgo(5) },
    ],
    waste: [
      { userId, type: "General Waste (landfill)", quantity: 320, unit: "kg", date: daysAgo(21), notes: "Office + canteen" },
      { userId, type: "Recycled Paper & Cardboard", quantity: 180, unit: "kg", date: daysAgo(18) },
      { userId, type: "E-Waste", quantity: 45, unit: "kg", date: daysAgo(9), notes: "Retired laptops, monitors" },
      { userId, type: "Compost / Organic", quantity: 95, unit: "kg", date: daysAgo(2) },
    ],
    suppliers: [
      { userId, name: "GreenPack Materials Ltd", category: "Packaging", country: "Germany", contactEmail: "contact@greenpack.example", esgScore: 82, status: "active" },
      { userId, name: "SunRise Solar Co", category: "Energy", country: "India", contactEmail: "sales@sunrisesolar.example", esgScore: 88, status: "active" },
      { userId, name: "Atlas Freight Logistics", category: "Logistics", country: "USA", contactEmail: "ops@atlasfreight.example", esgScore: 61, status: "under_review" },
      { userId, name: "BlueWave Textiles", category: "Raw Materials", country: "Bangladesh", contactEmail: "info@bluewave.example", esgScore: 54, status: "inactive" },
    ],
    goals: [
      { userId, pillar: "environmental", title: "Cut Scope 1 & 2 emissions 20%", targetValue: 20, currentValue: 8, unit: "% reduction", deadline: daysAgo(-180), status: "in_progress" },
      { userId, pillar: "environmental", title: "Divert 90% of waste from landfill", targetValue: 90, currentValue: 63, unit: "% diverted", deadline: daysAgo(-270), status: "in_progress" },
      { userId, pillar: "social", title: "Zero lost-time safety incidents", targetValue: 0, currentValue: 1, unit: "incidents", deadline: daysAgo(-90), status: "at_risk" },
      { userId, pillar: "governance", title: "100% suppliers ESG-screened", targetValue: 100, currentValue: 100, unit: "% screened", deadline: daysAgo(-10), status: "completed" },
    ],
  };
}

async function seed() {
  await connectDB();
  const user = await getOrCreateDemoUser();
  const data = buildData(user._id);

  const models = {
    carbon: CarbonEntry,
    energy: EnergyEntry,
    water: WaterEntry,
    waste: WasteEntry,
    suppliers: Supplier,
    goals: Goal,
  };

  for (const [key, Model] of Object.entries(models)) {
    if (RESET) {
      await Model.deleteMany({ userId: user._id });
      console.log(`Cleared existing ${key} records for demo user`);
    }
    const inserted = await Model.insertMany(data[key]);
    console.log(`Inserted ${inserted.length} ${key} records`);
  }

  console.log("\nSeed complete. Log in with:");
  console.log(`  email:    ${DEMO_EMAIL}`);
  console.log(`  password: ${DEMO_PASSWORD}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});