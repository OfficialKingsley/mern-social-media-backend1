import { Schema, model } from "mongoose";

export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [1, "First Name is required for a user"],
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: [1, "Username is required for a user"],
    },
    email: {
      type: String,
      required: [1, "Email is required for a user"],
    },
    password: {
      type: String,
      required: [1, "Your password is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this?.password && this?.isModified("password")) {
    //   this.password = hashPassword(this.password);
  }

  next();
});
const User = model("User", userSchema);

export default User;
