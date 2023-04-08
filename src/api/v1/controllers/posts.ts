import { Request, RequestHandler, Response } from "express";
import { IPost } from "../interfaces/IPost";
import Post from "../models/post";
import cloudinary from "../utils/cloudinary";

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
    if (error instanceof Error) {
      if (error.name === "Error") {
        error.name = "Post Error";
      }
      res.status(400).json({
        name: error.name,
        message: error.message,
        statusCode: res.statusCode,
      });
    }
  }
};
