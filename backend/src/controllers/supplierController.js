const crudFactory = require("../utils/crudFactory");
const Supplier = require("../models/Supplier");

module.exports = crudFactory(Supplier, "Supplier");
