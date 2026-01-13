import { Request, Response } from 'express';
import Blog from '../models/Blog';
import { AuthRequest } from '../middleware/authMiddleware';

export const createBlog = async (req: AuthRequest, res: Response) => {
    try {
        const { title, content, tags, language } = req.body;

        const blog = new Blog({
            title,
            content,
            tags,
            language: language || 'en',
            author: req.user._id
        });

        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const language = req.query.language || 'en';
        const search = req.query.search ? String(req.query.search) : '';

        let query: any = { language };

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            
            // Find authors matching the search term
            const authors = await import('../models/User').then(m => m.default.find({ username: searchRegex }).select('_id'));
            const authorIds = authors.map(author => author._id);

            query = {
                ...query,
                $or: [
                    { title: searchRegex },
                    { tags: searchRegex },
                    { author: { $in: authorIds } }
                ]
            };
        }

        const count = await Blog.countDocuments(query);
        const blogs = await Blog.find(query)
            .populate('author', 'username')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 });

        res.json({ 
            blogs, 
            page, 
            pages: Math.ceil(count / pageSize),
            total: count 
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username');

        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
    try {
        const { title, content, tags, language } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to update this blog' });
            }

            blog.title = title || blog.title;
            blog.content = content || blog.content;
            blog.tags = tags || blog.tags;
            blog.language = language || blog.language;

            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized to delete this blog' });
            }

            await blog.deleteOne();
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleLike = async (req: AuthRequest, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const alreadyLiked = blog.likes.some(id => id.toString() === req.user._id.toString());

        if (alreadyLiked) {
            blog.likes = blog.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            blog.likes.push(req.user._id);
        }

        await blog.save();
        res.json(blog.likes);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
