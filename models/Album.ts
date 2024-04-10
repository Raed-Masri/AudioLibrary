import mongoose, { Schema, Document } from 'mongoose';

export interface Album extends Document {
    name: string;
    description: string;
    showNbTracks: number;
    createdAt: Date;
    updatedAt: Date;
    lastSongAddedAt: Date;
}

const albumSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    showNbTracks: { type: Number},
    lastSongAddedAt: { type: Date }
}, { timestamps: true }
);

export default mongoose.model<Album>('Album', albumSchema);
