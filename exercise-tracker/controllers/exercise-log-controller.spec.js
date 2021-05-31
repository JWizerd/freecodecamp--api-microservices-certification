const app = require("../app");
const request = require("supertest");
const mockReq = require("../__mocks__/request");
const mockRes = require("../__mocks__/response");
const Datastore = require('nedb');

app.locals.db = new Datastore();

describe('user controller tests', () => {
  describe('POST /api/users', () => {
    it(`
      You can POST to /api/users/:_id/exercises
      with form data description, duration, and
      optionally date. If no date is supplied, the
      current date will be used. The response returned
      will be the user object with the exercise fields added.
    `, () => {
      app.locals.db.insert({ username: "jwizerd" }, async function(err, doc) {
        const response = await request(app).post(`/api/users/${doc._id}/exercises`).send({
          duration: 60,
          description: "running",
          date: "2021-05-31"
        });

        expect(response.status).toEqual(200);
        expect(response.body._id).toBeDefined();
        expect(response.body.username).toEqual("jwizerd");
        expect(response.body.log[0].description).toEqual("running");
        expect(response.body.log[0].duration).toEqual(60);
        expect(response.body.log[0].date).toEqual("2021-05-31");
      });
    });

    it(`
      You can make a GET request to /api/users
      to get an array of all users. Each element
      in the array is an object containing a user's
      username and _id.
    `, async() => {
      await app.locals.db.insert({ username: "jwizerd"});
      const response = await request(app).get("/api/users");

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length > 0).toBe(true);
      expect(response.status).toEqual(200);
    });

    it(`
      You can make a GET request to /api/users/:_id/logs
      to retrieve a full exercise log of any user. The returned
      response will be the user object with a log array of all the
      exercises added. Each log item has the description, duration,
      and date properties.`,  () => {
        const user = { username: "jwizerd", log: [] };
        app.locals.db.insert(user, async function(err, doc) {
          await request(app).post(`/api/users/${doc._id}/exercises`).send({
            description: "running",
            duration: 60,
            date: "2021-04-20"
          });
          await request(app).post(`/api/users/${doc._id}/exercises`).send({
            description: "running",
            duration: 120,
            date: "2021-04-21"
          });

          const response = await request(app).get(`/api/users/${doc._id}/logs`);
          expect(response.body.count === 2).toBe(true);
          expect(response.body.log).toBeDefined();
          expect(response.status).toEqual(200);
        });
    });
  });
});