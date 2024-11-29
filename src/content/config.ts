import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    publishedDate: z.string(),
    description: z.string(),
    lang: z.enum(['en', 'fr']),
    tags: z.array(z.string()).optional().default([]),
  }),
});

const directory = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    lang: z.enum(['en', 'fr']),
  }),
});

export const collections = {
  posts,
  directory,
};