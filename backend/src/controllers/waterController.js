const crudFactory = require("../utils/crudFactory");
const WaterEntry = require("../models/WaterEntry");

module.exports = crudFactory(WaterEntry, "Water entry");
