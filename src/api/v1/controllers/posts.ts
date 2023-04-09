import { Request, RequestHandler, Response } from "express";
import { IPost } from "../interfaces/IPost";
import Post from "../models/post";
import cloudinary from "../utils/cloudinary";
import { errorHandler } from "../utils/errorHandler";
import User from "../models/user";
import { Schema, Types } from "mongoose";

export const createPost: RequestHandler = async (
  req: Request,
  res: Response
) => {
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

export const likePost: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { likedBy } = req.body;

    const user = await User.findById(likedBy);
    const post = await Post.findById(id).select("-imageId");
    if (user) {
      if (post) {
        if (post.likes.includes(likedBy)) {
          let index = post.likes.indexOf(likedBy);
          if (index !== -1) {
            post.likes.splice(index, 1);
            await post.save();
            return res.status(201).json(post.likes.length);
          }
        } else {
          post.likes.push(likedBy);
          await post.save();
          return res.status(201).json(post.likes.length);
        }
      } else throw new Error("No post was found");
    } else throw new Error("No post was found");
  } catch (error) {
    errorHandler(error, res);
  }
};
