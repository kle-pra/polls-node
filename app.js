const express = require('express');
const path = require('path');
const app = express();
const parser = require('body-parser');
const passport = require('passport');

app.use(express.static(path.join(__dirname, 'static')))
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
// Passport Middleware
app.use(passport.initialize());
// app.use(passport.session());
require('./config/passport')(passport);

app.use('/api/polls', require('./routes/poll.route'));
app.use('/api', require('./routes/auth.route'));
app.all('/*', function (req, res) {
  res.sendfile('static/index.html');
});


module.exports = app;

