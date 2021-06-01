const app = require("../app");
const request = require("supertest");
const mockReq = require("../__mocks__/request");
const mockRes = require("../__mocks__/response");
const Datastore = require('nedb');

beforeAll(() => {
  db = new Datastore();
  app.locals.db = db;
  process.env.NODE_ENV = "test";
});

describe('user controller tests', () => {
  describe('POST /api/users', () => {
    it(`
      You can POST to /api/users with form
      data username to create a new user.
      The returned response will be an object
      with username and _id properties.
    `, async () => {
      const response = await request(app).post("/api/users").send({
        username: "jwizerd"
      });

      expect(response.status).toEqual(200);
      expect(response.body._id).toBeDefined();
      expect(response.body.username).toEqual("jwizerd");
    });

    it(`
      You can make a GET request to /api/users
      to get an array of all users. Each element
      in the array is an object containing a user's
      username and _id.
    `, (done) => {
      app.locals.db.insert({ username: "jwizerd"}, async function(err, doc) {
        const response = await request(app).get("/api/users");

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length > 0).toBe(true);
        expect(response.status).toEqual(200);
        done();
      });
    });
  });
});