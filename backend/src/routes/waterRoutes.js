const express = require("express");
const controller = require("../controllers/waterController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { waterValidator, idParamValidator } = require("../validators/metricValidators");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(controller.getAll)
  .post(waterValidator, validate, controller.create);

router
  .route("/:id")
  .get(idParamValidator, validate, controller.getOne)
  .put(idParamValidator, validate, controller.update)
  .delete(idParamValidator, validate, controller.remove);

module.exports = router;
