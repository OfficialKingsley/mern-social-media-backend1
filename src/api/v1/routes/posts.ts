import { Router } from "express";

import { uploadImage } from "../middlewares/multer";
import { createPost, likePost, getPosts } from "../controllers/posts";

const router: Router = Router();

router.get("/", getPosts);
router.get("/?userId", getPosts);
router.post("/", uploadImage.single("postImage"), createPost);
router.post("/:id/like", likePost);

export default router;
