import { Router } from "express";
import { changeProfileImage, getUsers } from "../controllers/users";
import { uploadImage } from "../middlewares/multer";
import User from "../models/user";

const router = Router();

router.get("/", getUsers);
router.put(
  "/:id/profile-image",
  uploadImage.single("profileImage"),
  changeProfileImage
);

export default router;
