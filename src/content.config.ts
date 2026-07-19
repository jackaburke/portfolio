import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tools: z.array(z.string()),
    // External links shown in the card footer strip, left to right
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    // Striped placeholder until a real thumbnail image replaces it
    thumb: z.object({
      label: z.string(),
      s1: z.string(),
      s2: z.string(),
      fg: z.string(),
    }),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { projects };
