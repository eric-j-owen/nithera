import { defineCollection, z } from "astro:content";

const news = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
  }),
});

const partners = defineCollection({
  schema: z.object({
    orgName: z.string(),
    imgSrc: z.string(),
  }),
});

export const collections = {
  news,
  partners,
};
