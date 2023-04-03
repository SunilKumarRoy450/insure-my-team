const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserModel = require("../models/User.model");

//register
router.post("/register", async (req, res) => {
  const { userName, userEmail, userPassword, userImage, userRole } = req.body;
  try {
    const users = new UserModel({
      userName,
      userEmail,
      userPassword,
      userImage,
      userRole,
    });
    console.log(users);
    await users.save();
    return res.status(201).send("User Created SuccessFully");
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
});

//login
router.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const loginUsers = await UserModel.findOne({ userEmail });
    if (loginUsers) {
      if (loginUsers.userPassword === userPassword) {
        return res.status(200).send({ login: true, loggedInUser: loginUsers });
      }
    }
    return res.status(404).send({ login: false });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
});

// //create blog array
// router.post("/create", async (req, res) => {
//   const { title, user, body, place, createdAt, image, } = req.body;
//   const blogsArray = await BlogModel.create({
//     title,
//     user,
//     body,
//     place,
//     createdAt,
//     image,

//   });

//   await UserModel.findOneAndUpdate(
//     { _id: user },
//     {
//       $push: { blogs: blogsArray._id },
//     }
//   );
//   return res.status(200).send(blogsArray);
// });

//get
router.get("/get", async (req, res) => {
  const users = await UserModel.find()
  console.log(users)
  return res.status(200).send(users);
});

module.exports = router;
