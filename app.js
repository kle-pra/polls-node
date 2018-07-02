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
// Passport Middleware
app.use(passport.initialize());
// app.use(passport.session());
require('./config/passport')(passport);

mongoose.connect(config.dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("successfuly connected to mongo");
});

app.use('/api/polls', require('./routes/poll.route'));
app.use('/api', require('./routes/auth.route'));
app.all('/*', function (req, res) {
  res.sendfile('static/index.html');
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port ' + server.address().port);
});
