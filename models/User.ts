import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<User>("User", userSchema);
