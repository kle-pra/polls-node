const express = require('express');
const path = require('path');
const app = express();
const parser = require('body-parser');
const passport = require('passport');
const bunyan = require('bunyan');
const log = bunyan.createLogger({
  name: 'myapp',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'info',
      path: './app.log'  // log ERROR and above to a file
    }
  ]
});

app.use(express.static(path.join(__dirname, 'static')))
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
// Passport Middleware
app.use(passport.initialize());
// app.use(passport.session());
require('./config/passport')(passport);

app.use('/api/polls', require('./routes/poll.route'));
app.use('/api', require('./routes/auth.route'));
// app.all('/*', function (req, res) {
//   res.sendfile('static/index.html');
// });


log.info("Application is set-up.");
module.exports = app;

