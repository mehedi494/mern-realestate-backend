import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      default:"https://cours-informatique-gratuit.fr/wp-content/uploads/2017/10/avatar.png"
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
