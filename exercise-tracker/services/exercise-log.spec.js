const ExerciseLogService = require("./exercise-log.service");
const req = require("../__mocks__/request");
const Datastore = require('nedb');
const mockDoc = require("../__mocks__/user-doc");
let db;

beforeAll(() => {
  db = new Datastore();
  req.app.locals.db = db;
  process.env.NODE_ENV = "test";
});

describe('Exercise Log Service', () => {
  describe('filterFrom', () => {
    it('should return results if date of log is after from date', () => {
      const results = ExerciseLogService._filterByFrom(mockDoc.log, "2009-01-01");
      expect(results.length).toBe(3);
    });

    it('should return results if date of log is after from date', () => {
      const results = ExerciseLogService._filterByFrom(mockDoc.log, "2021-01-01");
      expect(results.length).toBe(2);
    });
  });

  // describe('find', () => {
  //   it('should find logs that are before a certain date', () => {
  //     req.app.locals.db.insert(mockDoc, async function(err, doc) {
  //       req.query.from("1999-01-01")
  //       req.query.to("2020-01-01")
  //       const results = await ExerciseLogService.find(req);
  //       expect(results.length).toBe(1);
  //     });
  //   });
  // });
});