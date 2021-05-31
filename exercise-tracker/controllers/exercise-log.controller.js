const service = require("../services/exercise-log.service");
const BaseController = require("./base.controller");

class ExcerciseLogController extends BaseController {
  constructor(service) {
    super(service);
  }
}

module.exports = new ExcerciseLogController(service);