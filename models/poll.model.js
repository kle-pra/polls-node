const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PollSchema = new Schema({
  title: String,
  options: [{
    option: String,
    score: Number,
  }],
  // user: {type: Schema.Types.ObjectId, ref: 'User'}
  user: String,
  endDate: Date
});

//vote (score++)

//add option

let Poll = mongoose.model('Poll', PollSchema);
module.exports = Poll;