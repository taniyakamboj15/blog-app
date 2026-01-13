import { z } from 'zod';

export const createBlogSchema = z.object({
    body: z.object({
        title: z.string().min(3, 'Title is required'),
        content: z.string().min(10, 'Content must be at least 10 characters'),
        language: z.enum(['en', 'ar']).optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const likeBlogSchema = z.object({
    params: z.object({
        id: z.string().min(1, 'Blog ID is required'),
    }),
});
