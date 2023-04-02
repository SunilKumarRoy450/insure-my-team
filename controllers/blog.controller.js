const express = require("express");
const router = express.Router();
const BlogModel = require("../models/Blog.model");
const CommentModel = require("../models/Comment.model");
//createBlog
router.post("/create/blog", async (req, res) => {
  const { title, user, body, place, createdAt, image } = req.body;
  try {
    const blog = new BlogModel({
      title,
      user,
      body,
      place,
      createdAt,
      image,
    });
    await blog.save();
    return res.status(201).send({ msg: "Blog created successfully", blog });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
});

//create comment
router.post("/create/comment", async (req, res) => {
  const { user, body, blog } = req.body;
  const commentOnBlog = await CommentModel.create({ user, blog, body });
 
  await BlogModel.findOneAndUpdate(
    { _id: blog },
    {
      $push: { comments: commentOnBlog._id },
    }
  );
  return res.status(200).send(commentOnBlog);
});

//get blog
router.get("/get/blog", async (req, res) => {
  const blogs = await BlogModel.findOne().populate("user").populate("comments");
  return res.status(200).send(blogs);
});

module.exports = router;
