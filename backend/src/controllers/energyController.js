const crudFactory = require("../utils/crudFactory");
const EnergyEntry = require("../models/EnergyEntry");

module.exports = crudFactory(EnergyEntry, "Energy entry");
