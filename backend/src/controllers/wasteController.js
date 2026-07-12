const crudFactory = require("../utils/crudFactory");
const WasteEntry = require("../models/WasteEntry");

module.exports = crudFactory(WasteEntry, "Waste entry");
