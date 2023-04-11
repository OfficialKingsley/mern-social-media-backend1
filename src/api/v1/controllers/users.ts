import { Request, RequestHandler, Response } from "express";
import User from "../models/user";
import cloudinary from "../utils/cloudinary";
import { errorHandler } from "../utils/errorHandler";

export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .populate({
        path: "friends",
        select: "-password -__v -profileImageId -coverImageId",
      })
      .select("-password -__v -profileImageId -coverImageId");
    res.status(200).json(users);
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
      .select("-profileImageId -coverImageId -password -__v")
      .populate({
        path: "friends",
        select: "-profileImageId -coverImageId -password -__v",
      });
    if (user) {
      return res.status(200).json(user);
    } else throw new Error("User not found");
  } catch (error) {
    errorHandler(error, res);
  }
};
export const changeProfileImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate({
        path: "friends",
        select: "-password -__v -coverImageId -profileImageId",
      })
      .select("-password -__v");
    if (user) {
      if (req.file) {
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
    errorHandler(error, res);
  }
};

export const addFriend: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { friendId } = req.body;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user) {
      if (friend) {
        if (!user.friends.includes(friend._id)) {
          user?.friends.push(friend?._id!);
          await user.save();
        } else throw new Error("This user is already exists your friend");
      } else throw new Error("No friend with that Id");
    } else throw new Error("No user with that Id");
  } catch (error) {
    errorHandler(error, res);
  }
};
