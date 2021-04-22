const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
