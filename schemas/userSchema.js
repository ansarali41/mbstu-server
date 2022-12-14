const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
  },
  password: {
      type: String,
      required: true,
  },
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "News"
    }
  ]
});

module.exports = userSchema;
