const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PollSchema = new Schema({
  title: { type: String, required: true },
  options: [{
    option: { type: String, required: true },
    score: { type: Number, required: true },
  }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Poll', PollSchema);