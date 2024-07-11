import { defineCollection, reference, z } from 'astro:content'
import {
  type TaxonomyColor,
  type TaxonomyColorEnum,
  taxonomyColors,
} from '@/components/Taxonomy'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.coerce.date(),
    modifiedAt: z.coerce.date().optional(),
    category: reference('categories'),
    tags: z.array(reference('tags')).optional(),
    draft: z.enum(['draft', 'in progress', 'published']),
  }),
})

const taxonomySchema = z.object({
  title: z.string(),
  color: z.enum<TaxonomyColor, TaxonomyColorEnum>(
    taxonomyColors as TaxonomyColorEnum
  ),
})

const categories = defineCollection({
  type: 'data',
  schema: taxonomySchema,
})

const tags = defineCollection({
  type: 'data',
  schema: taxonomySchema,
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
    author_name: z.string(),
    nav: z.object({
      nav_links: z.object({
        home: z.string(),
        blog: z.string(),
        news: z.string(),
        about: z.string(),
        contact: z.string(),
      }),
      hamburger_label: z.string(),
    }),
    pager: z.object({
      left_arrow_label: z.string(),
      right_arrow_label: z.string(),
    }),
    locale_picker: z.object({
      button_label: z.string(),
    }),
    search: z.object({
      placeholder: z.string(),
      button_label: z.string(),
      result_not_found: z.string(),
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
    bmc: z.object({
      button_label: z.string(),
      greeting_message: z.string(),
    }),
    likes: z.object({
      button_label: z.string(),
    }),
    contact_form: z.object({
      name: z.object({
        label: z.string(),
        required: z.string(),
      }),
      email: z.object({
        label: z.string(),
        required: z.string(),
        invalid: z.string(),
      }),
      message: z.object({
        label: z.string(),
        required: z.string(),
        minlength: z.string(),
      }),
      confirmation: z.object({
        label: z.string(),
        required: z.string(),
      }),
      submit: z.string(),
      submitting: z.string(),
    }),
    og_image: z.object({
      site_name: z.string(),
      logo_alt: z.string(),
    }),
    pages: z.object({
      home: z.object({
        about_section: z.object({
          title: z.string(),
          description: z.string(),
          read_more: z.string(),
        }),
        blog_section: z.object({
          title: z.string(),
          read_more: z.string(),
        }),
        photo_section: z.object({
          title: z.string(),
          description: z.string(),
          read_more: z.string(),
        }),
      }),
      blog: z.object({
        title: z.string(),
        back_to_top: z.string(),
        scroll_to_top: z.string(),
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
        contact_me: z.string(),
        profile_img_alt: z.string(),
        back_to_top: z.string(),
        scroll_to_top: z.string(),
      }),
      page: z.object({
        back_to_top: z.string(),
        scroll_to_top: z.string(),
      }),
      not_found: z.object({
        message: z.string(),
        back_to_top: z.string(),
      }),
    }),
  }),
})

export const collections = { blog, categories, tags, news, page, meta, i18n }
