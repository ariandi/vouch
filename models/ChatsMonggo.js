const mongoose = require('mongoose')

const ChatsSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  room_id: {
    type: String,
    required: true
  },
  message: {
    type: String,
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

module.exports = mongoose.model('Chats', ChatsSchema);
