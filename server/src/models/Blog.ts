import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    tags: string[];
    language: 'en' | 'ar';
    likes: mongoose.Types.ObjectId[];
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Rich text HTML
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String }],
    language: { type: String, enum: ['en', 'ar'], default: 'en' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
