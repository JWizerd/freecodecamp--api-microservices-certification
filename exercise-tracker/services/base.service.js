class BaseService {
  all(req) {
    return new Promise((resolve, reject) => {
      req.app.locals.db.find({}, (err, docs) => {
        if (err) {
          reject(docs);
        } else {
          resolve(docs);
        }
      });
    });
  }

  findOne(req) {
    return new Promise((resolve, reject) => {
      req.app.locals.db.find({ _id: req.params._id }, (err, docs) => {
        if (err) {
          reject(docs);
        } else {
          resolve(docs);
        }
      });
    });
  }
}

module.exports = BaseService;