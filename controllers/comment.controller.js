const express = require("express");
const router = express.Router();
const CommentModel = require("../models/Comment.model");

//add Comment
router.post("/add", async (req, res) => {
  const { user, body, blog } = req.body;
  try {
    const comment = new CommentModel({
      user,
      body,
      blog,
    });
    await comment.save();
    return res.status(201).send({ msg: "Comment successfully", comment });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
});

//get comment
router.get("/get", async (req, res) => {
  const comments = await CommentModel.findOne()
    .populate("user")
    .populate({
      path: "blog", // populate blogs
      populate: {
        path: "comments", // in blogs, populate comments
      },
    });
  return res.status(200).send(comments);
});

module.exports = router;
