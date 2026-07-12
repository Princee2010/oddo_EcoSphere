const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    country: { type: String, trim: true },
    contactEmail: { type: String, trim: true, lowercase: true },
    esgScore: { type: Number, min: 0, max: 100, default: 0 },
    status: { type: String, enum: ["active", "inactive", "under_review"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
