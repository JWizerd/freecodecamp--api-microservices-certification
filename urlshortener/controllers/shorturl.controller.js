const validUrl = require('valid-url');
const service = require("../services/shorturl");

const create = (req, res) => {
  const { url } = req.body;

  if (validUrl.isUri(url)) {
    service.create(req)
      .then((doc) => {
        res.send({
          original_url: doc.url,
          short_url: doc._id
        });
      })
      .catch((error => {
        res.send({ error }, 500);
      }));
  } else {
    res.send({ error: "Invalid url" }, 500);
  }
}

const redirect = (req, res) => {
  service.findOne(req)
    .then((doc) => {
      res.redirect(doc.url);
    })
    .catch((error) => {
      res.send({ error }, 500);
    })
}

module.exports = { create, redirect };