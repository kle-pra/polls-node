const express = require('express');
const path = require('path');

const app = express();
const mongoose = require('mongoose');
const parser = require('body-parser');
const passport = require('passport');
const config = require('./config/config');

app.use(express.static(path.join(__dirname, 'static')))
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

mongoose.connect(config.dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("successfuly connected to mongo");
});

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
});

app.use('/api/polls', require('./routes/poll.route'));

const server = app.listen(3000, () => {
  console.log('Listening on port ' + server.address().port);
});