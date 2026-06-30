import { z } from 'zod';

export const TITLE_MAX = 150;
export const CONTENT_MAX = 10000;

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(TITLE_MAX, `Title must be less than ${TITLE_MAX} characters`),
  content: z
    .string()
    .trim()
    .min(1, 'Content is required')
    .min(20, 'Content must be at least 20 characters')
    .max(CONTENT_MAX, `Content must be less than ${CONTENT_MAX.toLocaleString()} characters`),
  category: z.string().default('general'),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;
