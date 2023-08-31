const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema({
  belongs_to: [String],
  messages: [
    {
      message: String,
      sender: String,
      data: { type: Date, default: Date.now },
    },
  ],
});

const Inbox = mongoose.model("Inbox", inboxSchema);

module.exports = Inbox;
