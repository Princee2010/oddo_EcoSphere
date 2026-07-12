const express = require("express");
const controller = require("../controllers/carbonController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { carbonValidator, idParamValidator } = require("../validators/metricValidators");

const router = express.Router();

router.use(protect); // every route below requires a valid JWT

router
  .route("/")
  .get(controller.getAll)
  .post(carbonValidator, validate, controller.create);

router
  .route("/:id")
  .get(idParamValidator, validate, controller.getOne)
  .put(idParamValidator, validate, controller.update)
  .delete(idParamValidator, validate, controller.remove);

module.exports = router;
