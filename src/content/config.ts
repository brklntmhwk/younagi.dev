import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.coerce.date(),
    modifiedAt: z.coerce.date().optional(),
    category: z.string(),
    tags: z.string().array().optional(),
    heroImage: z.string().optional(),
    draft: z.enum(['draft', 'in progress', 'published']),
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
    blog_name: z.string(),
    nav: z.object({
      nav_links: z.object({
        home: z.string(),
        blog: z.string(),
        about: z.string(),
      }),
    }),
    pager: z.object({
      left_arrow_label: z.string(),
      right_arrow_label: z.string(),
    }),
    locale_picker: z.object({
      button_label: z.string(),
    }),
    search: z.object({
      button_label: z.string(),
    }),
    toc: z.object({
      button_label: z.string(),
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
        my_name: z.string(),
        profile_img_alt: z.string(),
      }),
      not_found: z.object({
        message: z.string(),
        back_to_top: z.string(),
      }),
    }),
  }),
})

export const collections = { blog, page, meta, i18n }
