const Datastore = require('nedb');
let db;

beforeAll(() => {
  db = new Datastore();
});

describe('NeDB discovery tests', () => {
  it('Name of the group', () => {
    var doc = {
      hello: 'world',
      n: 5,
      today: new Date(),
      nedbIsAwesome: true,
      notthere: null,
      notToBeSaved: undefined,
      fruits: [ 'apple', 'orange', 'pear' ],
      infos: { name: 'nedb' }
    };

    db.insert(doc, function (err, newDoc) {   // Callback is optional
      db.find({ _id: newDoc._id }, function (err, doc) {
        expect(Array.isArray(doc)).toBeDefined();
          expect(doc[0]).toBeDefined();
      });
    });
  });
});