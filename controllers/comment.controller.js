const express = require("express");
const router = express.Router();
const CommentModel = require("../models/Comment.model");

//get comment
router.get("/get", async (req, res) => {
  try {
    const comments = await CommentModel.find()
      .populate("user")
      .populate({
        path: "blog", // populate blogs
        populate: {
          path: "comments", // in blogs, populate comments
        },
      });
    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
