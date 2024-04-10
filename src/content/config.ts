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
      categories: z.object({
        title: z.string(),
        description: z.string(),
      }),
      tags: z.object({
        title: z.string(),
        description: z.string(),
      }),
      archive: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
    about: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
})

const i18n = defineCollection({
  type: 'data',
  schema: z.object({
    nav: z.object({
      blog_title: z.string(),
      nav_links: z.object({
        home: z.string(),
        blog: z.string(),
        about: z.string(),
      }),
    }),
    pages: z.object({
      blog: z.object({
        title: z.string(),
        back_to_top: z.string(),
        categories: z.object({
          title: z.string(),
          back_to_top: z.string(),
        }),
        tags: z.object({
          title: z.string(),
          back_to_top: z.string(),
        }),
        archive: z.object({
          title: z.string(),
          back_to_top: z.string(),
        }),
      }),
      about: z.object({
        title: z.string(),
      }),
    }),
  }),
})

export const collections = { blog, page, meta, i18n }
