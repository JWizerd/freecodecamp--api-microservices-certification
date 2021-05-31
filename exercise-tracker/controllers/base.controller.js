class BaseController {
  constructor(service) {
    this.service = service;
  }

  create(req, res) {
    this.service.create(req)
      .then((doc) => {
        res.send(doc);
      })
      .catch((error => {
        res.status(200).send({ error });
      }));
  }

  find(req, res) {
    this.service.find(req)
      .then((doc) => {
        res.send(doc);
      })
      .catch((error => {
        res.status(200).send({ error });
      }));
  }

  findOne(req, res) {
    this.service.findOne(req)
      .then((doc) => {
        res.send(doc[0]);
      })
      .catch((error => {
        res.status(200).send({ error });
      }));
  }
}

module.exports = BaseController;