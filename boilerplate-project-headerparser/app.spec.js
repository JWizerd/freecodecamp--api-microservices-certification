const request = require("supertest");
const app = require("./app").app;
const headerParserHandler = require("./app").headerParserHandler;
const req = require("./__mocks__/request");
const res = require("./__mocks__/response");
const mockRes = {
 "ipaddress": "localhost:64083",
  "language": "en-US,en;q=0.9",
  "software": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
};

describe('GET /api/whoami', () => {
  it('should return status 200', async () => {
    const response = await request(app).get("/api/whoami");
    expect(response.statusCode).toBe(200);
  });

  describe('headerParserHandler', () => {
    it('should call res.json with correct parameters', () => {
      const jsonSpy = jest.spyOn(res, "json");
      headerParserHandler(req, res);
      expect(jsonSpy).toHaveBeenCalled();
      expect(jsonSpy).toHaveBeenCalledWith(mockRes);
    });
  });
});