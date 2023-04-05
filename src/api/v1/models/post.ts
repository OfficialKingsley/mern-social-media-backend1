import { Schema, model } from "mongoose";

export const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const Post = model("Post", postSchema);

export default Post;
