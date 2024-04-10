import mongoose, { Schema, Document } from 'mongoose';

export interface Category extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true }
);

export default mongoose.model<Category>('Category', categorySchema);