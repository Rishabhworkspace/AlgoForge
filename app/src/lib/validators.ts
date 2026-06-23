import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(150, 'Title must be less than 150 characters'),
  content: z
    .string()
    .trim()
    .min(1, 'Content is required')
    .min(20, 'Content must be at least 20 characters')
    .max(10000, 'Content must be less than 10,000 characters'),
  category: z.string().default('general'),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

export const TITLE_MAX = 150;
export const CONTENT_MAX = 10000;
