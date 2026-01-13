import { z } from 'zod';

export const createCommentSchema = z.object({
    params: z.object({
        blogId: z.string().min(1, 'Blog ID is required'),
    }),
    body: z.object({
        content: z.string().min(1, 'Content is required').max(1000, 'Comment too long'),
        parentComment: z.string().optional(),
    }),
});

export const getCommentsSchema = z.object({
    params: z.object({
        blogId: z.string().min(1, 'Blog ID is required'),
    }),
});
