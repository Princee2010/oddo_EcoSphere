const mongoose = require("mongoose");

const carbonEntrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    source: { type: String, required: true, trim: true },
    activityValue: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true },
    co2Equivalent: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarbonEntry", carbonEntrySchema);
