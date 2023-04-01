const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    userImage: { type: String, required: true },
    userRole: {
      type: String,
      enum: ["admin", "author", "reader"],
      default: "reader",
    },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = new model("User", UserSchema);
module.exports = UserModel;
