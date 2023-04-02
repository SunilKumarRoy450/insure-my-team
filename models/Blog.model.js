const { Schema, model } = require("mongoose");

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  place: {
    type: String,
    default: "New Delhi",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogModel = new model("Blog", BlogSchema);
module.exports = BlogModel;
