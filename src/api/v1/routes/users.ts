import { Router } from "express";
import {
  changeCoverImage,
  changeProfileImage,
  getUser,
  getUsers,
} from "../controllers/users";
import { uploadImage } from "../middlewares/multer";
import User from "../models/user";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put(
  "/:id/profile-image",
  uploadImage.single("profileImage"),
  changeProfileImage
);
router.put(
  "/:id/profile-image",
  uploadImage.single("coverImage"),
  changeCoverImage
);

export default router;
