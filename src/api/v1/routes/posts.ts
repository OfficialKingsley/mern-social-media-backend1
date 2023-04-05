import { Request, Response, Router } from "express";
import Post from "../models/post";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = Post.find({});
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json("An error occured");
    console.log(error);
  }
});

export default router;
