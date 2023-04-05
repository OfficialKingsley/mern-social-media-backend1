import { RequestHandler, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { use } from "passport";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const userWithUsername = await User.findOne({ username });
    const userWithEmail = await User.findOne({ email });

    if (!firstName) throw new Error("There is no first name");
    if (!username) throw new Error("The username is required for registration");
    if (!email) throw new Error("Your email is required for registration");
    if (!password)
      throw new Error("Your password is required for registration");
    if (userWithUsername) throw new Error("That username is already in use");
    if (userWithEmail) throw new Error("That email is already in use");

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    await user.save();
    user.fullName = `${user.firstName} ${user.lastName}`;
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "Error") {
        error.name = "ValidationError";
      }
      res.status(400).json({
        name: error.name,
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  }
};

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    if (!username) throw new Error("The username is required for login");
    if (!password) throw new Error("Your password is required for login");
    const user = await User.findOne({ username });
    if (!user) {
      let noUserError = new Error("User not found");
      noUserError.name = "NotFoundError";
      throw noUserError;
    }
    const passwordIsVerified = await bcrypt.compare(password, user.password!);
    if (!passwordIsVerified) throw new Error("Password is incorrect");

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    user.token = token;
    await user.save();

    const savedUser = await User.findById(user._id).select("-password -__v");

    res.status(200).json(savedUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "Error") {
        error.name = "ValidationError";
      }
      res.status(400).json({
        name: error.name,
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  }
};
