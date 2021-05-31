const create = (req) => {
  return new Promise((resolve, reject) => {
    req.app.locals.db.insert(req.body, (err, newDoc) => {
      if (err) {
        reject(newDoc);
      } else {
        resolve(newDoc);
      }
    });
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