import { Request, Response, Router } from "express";
import Post from "../models/post";
import { uploadImage } from "../middlewares/multer";
import { createPost } from "../controllers/posts";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = Post.find({})
      .populate("User", "-password -__v -profileImageId -coverImageId")
      .select("-imageId");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("An error occured");
    console.log(error);
  }
});

router.post("/", uploadImage.single("postImage"), createPost);

export default router;
