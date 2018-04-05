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
  voteIPs: [String]
});

// override to json to ignore field 
PollSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.voteIPs
  return obj;
}
module.exports = mongoose.model('Poll', PollSchema);