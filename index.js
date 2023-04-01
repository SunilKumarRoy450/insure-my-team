const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
const connectionDB = require("./config/db");

const userRoutes = require("./controllers/user.controller");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.listen(PORT, async () => {
  try {
    await connectionDB();
    console.log(`Server is running on Port ${PORT}`);
  } catch (error) {
    console.log({ msg: error });
  }
});
