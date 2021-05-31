const { redirect } = require("../controllers/shorturl.controller");

module.exports = {
  send: jest.fn(),
  redirect: jest.fn()
}