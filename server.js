const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./app');

mongoose.connect(config.dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("successfuly connected to mongo");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port ' + server.address().port);
});