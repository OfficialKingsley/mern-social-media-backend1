import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [1, "First Name is required for a user"],
    },
    lastName: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: [1, "Username is required for a user"],
      unique: [1, "This username is already in use"],
    },
    email: {
      type: String,
      required: [1, "Email is required for a user"],
      unique: [1, "This email is already in use"],
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: [1, "Your password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSuperuser: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this?.password && this?.isModified("password")) {
    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
  next();
});

const User = model("User", userSchema);

export default User;
