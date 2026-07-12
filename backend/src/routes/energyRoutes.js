const express = require("express");
const controller = require("../controllers/energyController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { energyValidator, idParamValidator } = require("../validators/metricValidators");

const router = express.Router();
router.use(protect);

router.route("/")
  .get(controller.getAll)
  .post(energyValidator, validate, controller.create);

router.route("/:id")
  .get(idParamValidator, validate, controller.getOne)
  .put(idParamValidator, validate, controller.update)
  .delete(idParamValidator, validate, controller.remove);

module.exports = router;