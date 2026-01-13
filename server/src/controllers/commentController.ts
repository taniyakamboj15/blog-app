import { Response } from 'express';
import Comment from '../models/Comment';
import { AuthRequest } from '../middleware/authMiddleware';

export const addComment = async (req: AuthRequest, res: Response) => {
    try {
        const { content, parentComment } = req.body;
        const blogId = req.params.blogId;

        const comment = new Comment({
            content,
            blog: blogId,
            author: req.user._id,
            parentComment: parentComment || null
        });

        const createdComment = await comment.save();
        const populatedComment = await createdComment.populate('author', 'username');
        
        res.status(201).json(populatedComment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getComments = async (req: AuthRequest, res: Response) => {
    try {
        const blogId = req.params.blogId;
        
        // Fetch top-level comments (those without a parent) and populate their replies
        // This is a simplified approach. For deep nesting, recursive fetch or flat list is needed.
        // Here we fetch all comments and let frontend build the tree, OR fetch root comments and populate 1 level.
        // Let's fetch ALL comments for the blog and sort by createdAt. Frontend can structure them.
        const comments = await Comment.find({ blog: blogId })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
// ... (previous imports)
import Blog from '../models/Blog'; // Ensure Blog is imported

// ... (previous functions)

export const deleteComment = async (req: any, res: Response) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is comment author OR blog author
        const blog = await Blog.findById(comment.blog);
        
        const isCommentAuthor = comment.author.toString() === req.user._id.toString();
        const isBlogAuthor = blog && blog.author.toString() === req.user._id.toString();

        if (!isCommentAuthor && !isBlogAuthor && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete this comment' });
        }

        await comment.deleteOne();
        res.json({ message: 'Comment removed' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
