const crudFactory = require("../utils/crudFactory");
const CarbonEntry = require("../models/CarbonEntry");

module.exports = crudFactory(CarbonEntry, "Carbon entry");
