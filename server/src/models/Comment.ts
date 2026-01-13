import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    content: string;
    blog: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    parentComment?: mongoose.Types.ObjectId;
    replies: mongoose.Types.ObjectId[]; 
}

const CommentSchema: Schema = new Schema({
    content: { type: String, required: true },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual populate for replies to avoid deep nesting in DB structure
CommentSchema.virtual('replies', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parentComment'
});

export default mongoose.model<IComment>('Comment', CommentSchema);
