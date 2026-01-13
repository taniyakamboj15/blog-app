import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, toggleLike } from '../controllers/blogController';
import { protect, authorize } from '../middleware/authMiddleware';
import validateResource from '../middleware/validateResource';
import { createBlogSchema, likeBlogSchema } from '../schemas/blogSchemas';

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, authorize('admin', 'author'), validateResource(createBlogSchema), createBlog);

router.route('/:id')
    .get(getBlogById)
    .put(protect, authorize('admin', 'author'), validateResource(createBlogSchema), updateBlog)
    .delete(protect, authorize('admin', 'author'), deleteBlog);

router.route('/:id/like')
    .put(protect, validateResource(likeBlogSchema), toggleLike);

export default router;
