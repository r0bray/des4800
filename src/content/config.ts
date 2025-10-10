import { defineCollection, z } from 'astro:content';

const plasticityCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'plasticity': plasticityCollection,
};

