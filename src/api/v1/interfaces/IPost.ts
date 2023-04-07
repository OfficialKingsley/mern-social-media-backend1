import { Schema, Document } from "mongoose";
export interface IPost extends Document {
  user: string | Schema.Types.ObjectId;
  text?: string;
  imageUrl?: string;
  imageId?: string;
}
