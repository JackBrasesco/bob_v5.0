let mongoose = require('mongoose');
let validator = require('validator');

let historySchema = {
  username: String,
}

module.exports = mongoose.model("History", historySchema);
