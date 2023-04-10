const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "author", "reader"],
      default: "author",
    },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = new model("User", UserSchema);
module.exports = UserModel;
