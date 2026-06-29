import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessonsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/lessons" }),
  schema: z.any()
});

export const collections = {
  lessons: lessonsCollection,
};
