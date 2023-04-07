import { Router } from "express";
import { changeProfileImage } from "../controllers/users";
import { uploadImage } from "../middlewares/multer";
import User from "../models/user";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select(
      "-password -__v -profileImageId -coverImageId"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("An error occured");
    console.log(error);
  }
});
router.put(
  "/:id/profile-image",
  uploadImage.single("profileImage"),
  changeProfileImage
);

export default router;
