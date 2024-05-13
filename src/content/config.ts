import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.coerce.date(),
    modifiedAt: z.coerce.date().optional(),
    category: z.string().array(),
    tags: z.string().array().optional(),
    heroImage: z.string().optional(),
  }),
})

const page = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    modifiedAt: z.coerce.date().optional(),
  }),
})

const meta = defineCollection({
  type: 'data',
  schema: z.object({
    site: z.object({
      title: z.string(),
      description: z.string(),
    }),
    blog: z.object({
      title: z.string(),
      description: z.string(),
    }),
    about: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
})

export const collections = { blog, page, meta }
