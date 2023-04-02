const express = require("express");
const router = express.Router();
const BlogModel = require("../models/Blog.model");

//createBlog

router.post("/create/blog", async (req, res) => {
  const { title, user, body, comments, place, createdAt, image } = req.body;
  try {
    const blog = new BlogModel({
      title,
      user,
      body,
      comments,
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

module.exports = router;
