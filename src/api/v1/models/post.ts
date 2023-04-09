import { Schema, model, Model, Document } from "mongoose";
import { IPost } from "../interfaces/IPost";

export const postSchema: Schema<IPost> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    imageId: {
      type: String,
      default: "",
    },
    likes: { type: [Schema.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
  }
);

const Post: Model<IPost> = model("Post", postSchema);

export default Post;
