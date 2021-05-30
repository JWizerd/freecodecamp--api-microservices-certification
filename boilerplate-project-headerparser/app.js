// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const headerParserHandler = function (req, res) {
  res.json({
    ipaddress: req.headers.host,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
};

// your first API endpoint...
app.get("/api/whoami", headerParserHandler);

module.exports.headerParserHandler = headerParserHandler;
module.exports.app = app;