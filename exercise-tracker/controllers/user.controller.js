const service = require("../services/user.service");
const BaseController = require("./base.controller");

class UserController extends BaseController {
  constructor(service) {
    super(service);
  }
}

module.exports = new UserController(service);