const create = (req) => {
  return new Promise((resolve, reject) => {
    req.app.locals.db.find({ url: req.body }, function(err, docs) {
      if (docs.length === 0) {
        req.app.locals.db.insert(req.body, (err, newDoc) => {
          if (err) {
            reject(newDoc);
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

const findOne = (req) => {
  return new Promise((resolve, reject) => {
    req.app.locals.db.find({ _id: req.params.url }, (err, docs) => {
      if (err) {
        reject(newDoc);
      } else {
        resolve(docs[0]);
      }
    });
  });
}

module.exports = { create, findOne };