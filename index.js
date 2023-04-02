const express = require("express");
const cors = require("cors");
const PORT = 8080;
const app = express();
const connectionDB = require("./config/db");

// Import of Routes
const userRoutes = require("./controllers/user.controller");
const blogRoutes = require("./controllers/blog.controller");
const commentRoutes = require("./controllers/comment.controller");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes end point
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);

//server connection
app.listen(PORT, async () => {
  try {
    console.log(`Server is running on Port ${PORT}`);
    await connectionDB();
  } catch (error) {
    console.log({ msg: error });
  }
});
