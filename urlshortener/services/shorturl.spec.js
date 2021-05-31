const { create, findOne } = require("./shorturl");
const req = require("../__mocks__/request");
const Datastore = require('nedb');
let db;

beforeAll(() => {
  db = new Datastore();
  req.app.locals.db = db;
});

describe('Shorturl Service', () => {
  it('should insert doc into db', async () => {
    await create(req);
    await req.app.locals.db.find({}, function(err, docs) {
      expect(docs.length > 0)
    });
  });

  it('should return doc if already in db', async () => {
    await create(req);
    const sameDoc = await create(req);
    req.app.locals.db.find({}, function(err, docs) {
      expect(docs.find(d => d.url === sameDoc.url)).toBeDefined();
    });
  });

  it('should find doc by id', async () => {
    const doc = await create(req);
    await req.app.locals.db.find({ _id: doc._id }, function(err, docs) {
      expect(docs.length > 0)
      expect(docs[0]._id === doc._id);
    });
  });
});