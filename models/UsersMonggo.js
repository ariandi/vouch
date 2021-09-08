const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  is_logged_in: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Users', UsersSchema);
