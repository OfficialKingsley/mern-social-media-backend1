import { Router } from "express";

import { uploadImage } from "../middlewares/multer";
import { createPost, getPosts } from "../controllers/posts";

const router: Router = Router();

router.get("/", getPosts);
router.post("/", uploadImage.single("postImage"), createPost);

export default router;
