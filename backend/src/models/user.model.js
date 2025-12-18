import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    pic: {
      type: String,
      default:"",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
