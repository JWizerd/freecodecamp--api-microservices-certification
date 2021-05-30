const request = require("supertest");
const app = require("./app");

describe('server spec', () => {
  describe('GET /api/:date?', () => {
    it('A request with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds', async () => {
      const response = await request(app).get("/api/2015-12-25");
      expect(response.body).toEqual({
        utc: 'Fri, 25 Dec 2015 00:00:00 GMT',
        unix: 1451001600000
      });
      expect(response.statusCode).toBe(200);
    });

    it('A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }', async () => {
      const response = await request(app).get("/api/1451001600000");
      expect(response.body).toEqual({
        utc: 'Fri, 25 Dec 2015 00:00:00 GMT',
        unix: 1451001600000
      });
      expect(response.statusCode).toBe(200);
    });

    it('If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }', async () => {
      const response = await request(app).get("/api/abc123");
      expect(response.body).toEqual({
        error: "Invalid Date"
      });
      expect(response.statusCode).toBe(200);
    });

    it('An empty date parameter should return the current time in a JSON object with a unix key', async () => {
      const response = await request(app).get("/api");
      expect(response.body.unix).toBeDefined();
      expect(response.body.utc).toBeDefined();
      expect(response.statusCode).toBe(200);
    });
  });
});