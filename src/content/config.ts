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

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    modifiedAt: z.coerce.date().optional(),
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
    news: z.object({
      title: z.string(),
      description: z.string(),
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
        news: z.string(),
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
    theme_toggle: z.object({
      button_label: z.string(),
    }),
    search: z.object({
      button_label: z.string(),
    }),
    toc: z.object({
      button_label: z.string(),
    }),
    bulleting_board: z.object({
      no_news: z.string(),
    }),
    message: z.object({
      fallback_icon_alt: z.string(),
    }),
    photo_gallery: z.object({
      credit_label: z.string(),
    }),
    photo_gallery_item: z.object({
      photo_label: z.string(),
    }),
    svg: z.object({
      not_found_message: z.string(),
      invalid_error_message: z.string(),
    }),
    pages: z.object({
      blog: z.object({
        title: z.string(),
        back_to_top: z.string(),
        scroll_to_top: z.string(),
        hero_image_label: z.string(),
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
      news: z.object({
        title: z.string(),
        back_to_top: z.string(),
        scroll_to_top: z.string(),
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

export const collections = { blog, news, page, meta, i18n }
