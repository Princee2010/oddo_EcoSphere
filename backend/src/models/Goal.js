const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    pillar: { type: String, enum: ["environmental", "social", "governance"], required: true },
    title: { type: String, required: true, trim: true },
    targetValue: { type: Number, required: true, min: 0 },
    currentValue: { type: Number, default: 0, min: 0 },
    unit: { type: String, trim: true },
    deadline: { type: Date },
    status: { type: String, enum: ["in_progress", "completed", "at_risk"], default: "in_progress" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
