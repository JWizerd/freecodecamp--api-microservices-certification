// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var fileUpload = require("express-fileupload");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(fileUpload());
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const metadataParser = function(req, res) {
  const files = req.files;
  const firstFile = req.files[Object.keys(req.files)[0]];

  res.status(200).json({
    name: firstFile.name,
    type: firstFile.mimetype,
    size: firstFile.size
  });
};

const fileExistsMiddleware = function(req, res, next) {
  if (!req.files) {
    res.status(200).send({ error: "Endpoint requires a file" });
  } else {
    next();
  }
}

app.post("/api/fileanalyse", fileExistsMiddleware, metadataParser);

module.exports = { app, metadataParser, fileExistsMiddleware };