import mongoose, { Schema, Document } from "mongoose";
import { Category } from "./Category";
import { Album } from "./Album";

export interface Song extends Document {
  name: string;
  singer: string;
  category: Category["_id"];
  album: Album["_id"];
}

const songSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    singer: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    album: { type: Schema.Types.ObjectId, ref: "Album" },
  },
  { timestamps: true }
);

export default mongoose.model<Song>("Song", songSchema);
