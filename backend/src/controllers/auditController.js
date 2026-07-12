const crudFactory = require("../utils/crudFactory");
const AuditEntry = require("../models/AuditEntry");

module.exports = crudFactory(AuditEntry, "Audit");