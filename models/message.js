const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    title: String,
    message: String,
    user: String,
    avatar: String,
    createdAt: String,
  },
  {timestamps: true}
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
