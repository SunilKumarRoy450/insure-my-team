const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");

//register
router.post("/register", async (req, res) => {
  const { userName, userEmail, userPassword, userImage, userRole } = req.body;
  console.log(userName, userEmail, userPassword, userImage, userRole);
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

module.exports = router;
