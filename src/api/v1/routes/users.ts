import { Router } from "express";
import User from "../models/user";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("An error occured");
    console.log(error);
  }
});

export default router;
