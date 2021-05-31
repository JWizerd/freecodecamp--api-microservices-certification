require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const AppController = require("./controllers/app.controller");
const UserController = require("./controllers/user.controller");
const ExerciseLogController = require("./controllers/exercise-log.controller");
const Datastore = require('nedb');

app.locals.db = new Datastore({ filename: "database.db", autoload: true });

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: true
}))

app.get('/', AppController.index);

// RESOURCE: Users
app.post('/api/users', UserController.create.bind(UserController));
app.get('/api/users', UserController.find.bind(UserController));

// RESOURCE: Exercise Logs
app.post('/api/users/:_id/exercises', ExerciseLogController.create.bind(ExerciseLogController));
app.get('/api/users/:_id/logs', ExerciseLogController.findOne.bind(ExerciseLogController));
module.exports = app;
