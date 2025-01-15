import { defineCollection, z } from "astro:content";

const newsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    thumbnail: z.string().optional(),
    body: z.string(),
  }),
});

export const collections = {
  news: newsCollection,
};
