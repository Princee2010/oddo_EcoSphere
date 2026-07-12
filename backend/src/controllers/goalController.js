const crudFactory = require("../utils/crudFactory");
const Goal = require("../models/Goal");

module.exports = crudFactory(Goal, "Goal");
