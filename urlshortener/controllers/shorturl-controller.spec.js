const app = require("../app");
const request = require("supertest");
const Datastore = require('nedb');
app.locals.db = new Datastore();

describe('shorturl controller tests', () => {
  describe('POST /api/shorturl', () => {
    it(`
      You can POST a URL to /api/shorturl
      and get a JSON response with original_url
      and short_url properties. Here's an example:
      { original_url : 'https://freeCodeCamp.org', short_url : 1}
    `, async () => {
      const response = await request(app).post("/api/shorturl").send({
        url: "https://freeCodeCamp.org"
      });

      expect(response.status).toEqual(200);
      expect(response.body.original_url).toEqual("https://freeCodeCamp.org");
      expect(response.body.short_url).toBeDefined();
    });
  });
});