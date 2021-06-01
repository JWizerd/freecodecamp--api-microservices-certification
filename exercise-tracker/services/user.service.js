const BaseService = require("./base.service");

class UserService extends BaseService {
  constructor() {
    super();
  }

  findOne(req) {
    return new Promise((resolve, reject) => {
      req.app.locals.db.find({ _id: req.params._id }, (err, docs) => {
        if (err) {
          reject(err);
        } else if (docs.length === 0) {
          reject("Not found!");
        } else {
          const user = docs[0];
          user.count = user.log ? user.log.length : 0;
          resolve(user);
        }
      });
    });
  }

  create(req) {
    return new Promise((resolve, reject) => {
      req.app.locals.db.find(req.body, function(err, docs) {
        if (docs.length === 0) {
          req.body.log = [];
          req.body.count = 0;
          req.app.locals.db.insert(req.body, (err, newDoc) => {
            if (err) {
              reject(err);
            } else {
              resolve(newDoc);
            }
          });
        } else {
          resolve(docs[0]);
        }
      })
    });
  }
}

module.exports = new UserService();