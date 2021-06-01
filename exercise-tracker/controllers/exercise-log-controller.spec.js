const app = require("../app");
const request = require("supertest");
const mockDoc = require("../__mocks__/user-doc");
const Datastore = require('nedb');

beforeAll(() => {
  db = new Datastore();
  app.locals.db = db;
  process.env.NODE_ENV = "test";
});

describe('exercise log controller tests', () => {
  describe('POST /api/users/:_id/exercises', () => {
    it(`
      You can POST to /api/users/:_id/exercises
      with form data description, duration, and
      optionally date. If no date is supplied, the
      current date will be used. The response returned
      will be the user object with the exercise fields added.
    `, (done) => {
      app.locals.db.insert({ username: "jwizerd", log: [] }, async function(err, doc) {
        const response = await request(app).post(`/api/users/${doc._id}/exercises`)
          .send({
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

        done()
      });
    });

    it(`
      You can make a GET request to /api/users/:_id/logs
      to retrieve a full exercise log of any user. The returned
      response will be the user object with a log array of all the
      exercises added. Each log item has the description, duration,
      and date properties.
    `,  () => {
        app.locals.db.insert(mockDoc, async function(err, doc) {
          const response = await request(app).get(`/api/users/${doc._id}/logs`);
          expect(response.body.count === 4).toBe(true);
          expect(response.body.log).toBeDefined();
          expect(response.status).toEqual(200);
        });
    });

    it(`
      You can add from, to and limit parameters to
      a /api/users/:_id/logs request to retrieve part
      of the log of any user. from and to are dates in
      yyyy-mm-dd format. limit is an integer of how many
      logs to send back.
    `, () => {
        app.locals.db.insert(mockDoc, async function(err, doc) {
          const response = await request(app).get(`/api/users/${doc._id}/logs?from=2010-01-01&to=2020-05-01&limit=3`);
          expect(true).toBe(false);
        });
    });
  });
});