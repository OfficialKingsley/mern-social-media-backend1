import { Request, RequestHandler, Response } from "express";
import User from "../models/user";
import cloudinary from "../utils/cloudinary";

export const changeProfileImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -__v");
    if (user) {
      if (req.file) {
        console.log(req.file.mimetype);
        const cloudinaryUpload = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: `MernSocialMediaApp/users/${user._id}/profile-images`,
            resource_type: "image",
            overwrite: false,
          }
        );
        user.profileImageUrl = cloudinaryUpload.secure_url;
        user.profileImageId = cloudinaryUpload.public_id;
        await user.save();
        res.json(user);
      }
    }
  } catch (error) {
    console.log("Omo", error);
  }
};
