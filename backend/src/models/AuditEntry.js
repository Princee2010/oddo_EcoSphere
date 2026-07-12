const mongoose = require("mongoose");

const auditEntrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["internal", "external", "regulatory", "supplier"],
      required: true,
    },
    scope: { type: String, trim: true },
    auditor: { type: String, trim: true },
    status: {
      type: String,
      enum: ["scheduled", "in_progress", "completed", "failed"],
      default: "scheduled",
    },
    score: { type: Number, min: 0, max: 100 },
    date: { type: Date, default: Date.now },
    findings: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditEntry", auditEntrySchema);