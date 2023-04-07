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
router.post("/add/comment", async (req, res) => {
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
  const blogs = await BlogModel.find().populate("user").populate("comments");
  return res.status(200).send(blogs);
});

//delete Blog
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBlog = await BlogModel.findByIdAndDelete({ _id: id });
  return res.status(200).send({ msg: "Blog deleted", deletedBlog });
});

//get/:id
router.get("/get/blog/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await BlogModel.findById({ _id: id });
  return res.status(200).send(blog);
});

//edit
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body, image } = req.body;
  const updatedBlog = await BlogModel.findByIdAndUpdate(
    id,
    {
      title,
      body,
      image,
    },
    { new: true }
  );
  return res.status(200).send({ msg: "Blog Update SuccessFull", updatedBlog });
});

module.exports = router;
