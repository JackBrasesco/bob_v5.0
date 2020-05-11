let mongoose = require('mongoose');
let validator = require('validator');

let accountSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  meta: {
    favorites: {
      website: String,
      animal: String,
      food: String,
      number: Number,
    },
    notes: Array,
    projects: Array,
    commands: Array,
  },
  // social: {
  //   friends: Array,
  //   conversations: Array,
  // }
});

module.exports = mongoose.model('Account', accountSchema);
