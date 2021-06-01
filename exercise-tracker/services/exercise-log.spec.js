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
  describe('_filterByFrom', () => {
    it('should return results if date of log is after from date', () => {
      const results = ExerciseLogService._filterByFrom(mockDoc.log, "2009-01-01");
      expect(results.length).toBe(3);
    });

    it('should return zero results if date of log is before from date', () => {
      const results = ExerciseLogService._filterByFrom(mockDoc.log, "2021-06-02");
      expect(results.length).toBe(0);
    });
  });

  describe('_filterByTo', () => {
    it('should return results if date of log is after from date', () => {
      const results = ExerciseLogService._filterByTo(mockDoc.log, "1971-01-01");
      expect(results.length).toBe(1);
      expect(results[0].date).toEqual("1970-01-01");
    });

    it('should return zero results if date of logs are all after to date', () => {
      const results = ExerciseLogService._filterByFrom(mockDoc.log, "2021-07-01");
      expect(results.length).toBe(0);
    });
  });

  describe('_filterByFromTo', () => {
    it('should return results if date of log is after from date and before to date', () => {
      const results = ExerciseLogService._filterByFromTo(mockDoc.log, "1971-01-01", "2021-01-01");
      expect(results.length).toBe(2);
    });
  });

  describe('_limitResults', () => {
    it('should return 2 logs if limit is 2', () => {
      const results = ExerciseLogService._limitResults(mockDoc.log, 2);
      expect(results.length).toBe(2);
    });
  });

  describe('find', () => {
    it('should find logs that are before a certain date', (done) => {
      req.app.locals.db.insert(mockDoc, async function(err, doc) {
        req.query.from = "1970-01-01";
        req.query.to = "2021-01-01";
        req.query.limit = "2";
        req.params._id = doc._id;
        const results = await ExerciseLogService.find(req);
        expect(results.log.length).toBe(2);
        done();
      });
    });
  });
});