const UserService = require("./user.service");
const req = require("../__mocks__/request");
const Datastore = require('nedb');
let db;

beforeAll(() => {
  db = new Datastore();
  req.app.locals.db = db;
  process.env.NODE_ENV = "test";
});

describe('User Service', () => {
  it('should insert doc into db', async () => {
    await UserService.create(req);
    await req.app.locals.db.find({}, function(err, docs) {
      expect(docs.length > 0)
    });
  });

  it('should return doc if already in db', async () => {
    await UserService.create(req);
    const sameDoc = await UserService.create(req);
    req.app.locals.db.find({}, function(err, docs) {
      expect(docs.find(d => d.url === sameDoc.url)).toBeDefined();
    });
  });

  it('should find doc by id', async () => {
    const newDoc = await UserService.create(req);
    req.params._id = newDoc._id;
    const doc = await UserService.findOne(req);
    req.app.locals.db.find({ _id: doc._id }, function(err, docs) {
      expect(docs.length > 0)
      expect(docs[0]._id === doc._id);
    });
  });
});