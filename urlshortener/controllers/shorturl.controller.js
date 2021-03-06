const validUrl = require('valid-url');
const service = require("../services/shorturl");

const create = (req, res) => {
  const { url } = req.body;

  if (validUrl.isHttpUri(url) || validUrl.isHttpsUri(url)) {
    service.create(req)
      .then((doc) => {
        res.send({
          original_url: doc.url,
          short_url: doc._id
        });
      })
      .catch((error => {
        res.status(500).send({ error });
      }));
  } else {
    res.status(200).send({ error: "invalid url" });
  }
}

const redirect = (req, res) => {
  service.findOne(req)
    .then((doc) => {
      res.redirect(doc.url);
    })
    .catch((error) => {
      res.status(200).send({ error });
    })
}

module.exports = { create, redirect };