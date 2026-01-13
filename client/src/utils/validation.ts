import { z, ZodError } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['author', 'admin']).optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const formatZodErrors = (error: ZodError): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    if (err.errors && err.errors.length > 0) {
        return err.errors[0].message; // Return the first error message
    }
    return 'Validation failed';
};
