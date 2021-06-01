const BaseService = require("./base.service");

class ExerciseLogService extends BaseService {
  constructor() {
    super();
  }

  _getDate(date) {
    date = new Date(date);
    if (this._isValidDate(date)) return date.toDateString();
    return new Date().toDateString();
  }

  _isValidDate(date) {
    return date.getTime() === date.getTime();
  }

  create(req) {
    const self = this;
    return new Promise(function(resolve, reject) {
      req.app.locals.db.find({ _id: req.params._id }, function(err, docs) {
        delete req.body[':_id'];
        req.body.date = self._getDate(req.body.date);
        req.body.duration = parseInt(req.body.duration, 10);
        docs[0].count = docs[0].log.length;
        req.app.locals.db.update(
          { _id: docs[0]._id },
          {
            $push: {
              log: req.body,
            },
            $set: {
              count: docs[0].log.length + 1
            }
          },
          {},
          (err, numReplaced) => {
            if (err) {
              reject(err);
            } else {
              req.app.locals.db.find({ _id: req.params._id }, function(err, docs) {
                if (err) {
                  reject(err);
                } else {
                  resolve({
                    username: docs[0].username,
                    _id: docs[0]._id,
                    ...req.body
                  });
                }
              });
            }
        });
      })
    });
  }

  _filterByFrom(log, from) {
    return log.filter(l => {
      const date = new Date(l.date).getTime();
      from = new Date(from).getTime();
      return date >= from;
    });
  }

  _filterByFromTo(log, from, to) {
    return log.filter(l => {
      const date = new Date(l.date).getTime();
      from = new Date(from).getTime();
      to = new Date(to).getTime();
      return date >= from && date <= to;
    });
  }

  _filterByTo(log, to) {
    return log.filter(l => {
      const date = new Date(l.date).getTime();
      to = new Date(to).getTime();
      return date < to;
    });
  }

  _filterByDate(log, from, to) {
    if (from && to) {
      log = this._filterByFromTo(log, from, to)
    } else if (to && !from) {
      log = this._filterByTo(log, to)
    } else if (from && !to) {
      log = this._filterByFrom(log, from)
    }

    return log;
  }

  _limitResults(log, limit) {
    if (limit) {
      log = log.slice(0, parseInt(limit, 10));
    }

    return log;
  }

  find(req) {
    const self = this;
    return new Promise((resolve, reject) => {
      req.app.locals.db.find({ _id: req.params._id }, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          doc = doc[0];
          doc.log = self._filterByDate(doc.log, req.query.from, req.query.to);
          doc.log = self._limitResults(doc.log, req.query.limit);
          doc.count = doc.log.length;
          resolve(doc);
        }
      });
    });
  }
}

module.exports = new ExerciseLogService();