const request = require("supertest");
const app = require("./app").app;

describe('POST /api/fileanalyse', () => {
  it('An error is returned if not file is in request', async () => {
    const res = await request(app)
    .post('/api/fileanalyse')

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe("Endpoint requires a file");
  });
});

describe('POST /api/fileanalyse', () => {
  it('You can submit a form that includes a file upload.', async () => {
    const res = await request(app)
    .post('/api/fileanalyse')
    .attach('upfile', 'tiny-green-buddha.jpg');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      name: 'tiny-green-buddha.jpg',
      type: 'image/jpeg',
      size: 327368
    })
  });
});