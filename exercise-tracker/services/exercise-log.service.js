const BaseService = require("./base.service");
const moment = require("moment");

class ExerciseLogService extends BaseService {
  constructor() {
    super();
  }

  getDate(date) {
    date = moment(date);
    if (date.isValid()) return date.format("YYYY-MM-DD");
    return moment().format("YYYY-MM-DD");
  }

  create(req) {
    const self = this;
    return new Promise(function(resolve, reject) {
      req.app.locals.db.find({ _id: req.params._id }, function(err, docs) {
        req.body.date = self.getDate(req.body.date);
        docs[0].log = docs[0].log || [];
        docs[0].log.push(req.body);
        docs[0].count = docs[0].log.length;
        req.app.locals.db.update({ _id: docs[0]._id }, docs[0], (err, numReplaced) => {
          if (err) {
            reject(err);
          } else {
            resolve(docs[0]);
          }
        });
      })
    });
  }
}

module.exports = new ExerciseLogService();