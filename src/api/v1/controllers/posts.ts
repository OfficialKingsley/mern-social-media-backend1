import { Request, RequestHandler, Response } from "express";
import { IPost } from "../interfaces/IPost";
import Post from "../models/post";
import cloudinary from "../utils/cloudinary";
import { errorHandler } from "../utils/errorHandler";

export const createPost: RequestHandler = async (
  req: Request,
  res: Response
) => {
  console.log("posted");
  try {
    const { user, text } = req.body;
    const postImage = req.file?.path;

    if (!text && postImage) {
      const post: IPost = await Post.create({ user, text, postImage });
      const cloudinaryUpload = await cloudinary.uploader.upload(postImage, {
        folder: `MernSocialMediaApp/posts/${post._id}`,
        resource_type: "image",
        overwrite: false,
      });
      post.imageUrl = cloudinaryUpload.secure_url;
      post.imageId = cloudinaryUpload.public_id;

      await post.save();
      return res.status(201).json(post);
    }
    if (text && !postImage) {
      const post: IPost = await Post.create({ user, text, imageUrl: "" });
      await post.save();
      return res.status(201).json(post);
    }
    if (!text && !postImage) {
      throw new Error("You need to add either some text of an image");
    }
    if (text && postImage) {
      const post: IPost = await Post.create({ user, text });
      const cloudinaryUpload = await cloudinary.uploader.upload(postImage, {
        folder: `MernSocialMediaApp/posts/${post._id}`,
        resource_type: "image",
        overwrite: false,
      });
      post.imageUrl = cloudinaryUpload.secure_url;
      post.imageId = cloudinaryUpload.public_id;
      await post.save();
      return res.status(201).json(post);
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: "user",
        select: "-password -__v -profileImageId -coverImageId",
      })
      .select("-imageId");
    res.status(200).json(posts);
  } catch (error) {
    errorHandler(error, res);
  }
};
