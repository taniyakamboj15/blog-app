import express from 'express';
import { addComment, getComments, deleteComment } from '../controllers/commentController';
import { protect } from '../middleware/authMiddleware';
import validateResource from '../middleware/validateResource';
import { createCommentSchema, getCommentsSchema } from '../schemas/commentSchemas';

const router = express.Router({ mergeParams: true });

router.route('/')
    .post(protect, validateResource(createCommentSchema), addComment)
    .get(validateResource(getCommentsSchema), getComments);

// Note: This route might need to be at root level if not nested, 
// but currently commentRoutes is mounted at /api/blogs/:blogId/comments
// We need a separate route for deleting by comment ID directly if it's not strictly tied to blogId param in URL for deletion
// USUALLY comments are deleted by their ID. 
// Ideally we should mount a separate router for /api/comments for direct ID access OR use nested route:
// DELETE /api/blogs/:blogId/comments/:id
router.route('/:id')
    .delete(protect, deleteComment);

export default router;
