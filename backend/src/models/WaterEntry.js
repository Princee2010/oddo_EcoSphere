const mongoose = require("mongoose");

const waterEntrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    source: { type: String, required: true, trim: true },
    consumption: { type: Number, required: true, min: 0 },
    unit: { type: String, default: "liters" },
    cost: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WaterEntry", waterEntrySchema);
