import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, authorize('admin', 'author'), createBlog);

router.route('/:id')
    .get(getBlogById)
    .put(protect, authorize('admin', 'author'), updateBlog)
    .delete(protect, authorize('admin', 'author'), deleteBlog);

export default router;
