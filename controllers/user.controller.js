const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");

//register
router.post("/register", async (req, res) => {
  const { name, email, password, image, role } = req.body;
  try {
    const users = new UserModel({
      name,
      email,
      password,
      image,
      role,
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
  const { email, password } = req.body;
  try {
    const loginUsers = await UserModel.findOne({ email });
    if (loginUsers) {
      if (loginUsers.password === password) {
        return res.status(200).send({ login: true, loggedInUser: loginUsers });
      }
    }
    return res.status(404).send({ login: false });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
});

//get
router.get("/get", async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
