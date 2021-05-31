require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const AppController = require("./controllers/app.controller");
const ShortUrlController = require("./controllers/shorturl.controller");
const Datastore = require('nedb');

app.locals.db = new Datastore({ filename: "database.db", autoload: true });

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.json());

app.get('/', AppController.index);

// RESOURCE: Shorturl
app.post('/api/shorturl', ShortUrlController.create);
app.get('/api/shorturl/:url', ShortUrlController.redirect);

module.exports = app;
