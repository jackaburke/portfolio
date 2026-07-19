import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tools: z.array(z.string()),
      // External links shown in the card footer strip, left to right
      links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
      // Card thumbnail — optimized to WebP + srcset by astro:assets at build time
      thumbImage: image(),
      thumbAlt: z.string(),
      featured: z.boolean().default(false),
      order: z.number(),
    }),
});

export const collections = { projects };
