const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    title: String,
    require: [true, "Post must have title"],
  },
  body: {
    type: String,
    require: [true, "Post must have a body"],
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
