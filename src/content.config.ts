import { defineCollection, reference, z } from 'astro:content';
import { unsplashPhotoLoader } from '@/lib/unsplash/contents';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.object({
      metadata: reference('categories'),
      slug: z.string(),
    }),
    tags: z.object({
      metadata: reference('tags'),
      slugList: z.array(z.string()).optional(),
    }),
    draft: z.enum(['draft', 'in progress', 'published']),
    level: z
      .union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ])
      .optional(),
    thumbnail: z.string().optional(),
  }),
});

const taxonomySchema = z.object({
  title: z.string(),
  slug: z.string(),
  ruby: z.string(),
});

const categories = defineCollection({
  loader: glob({
    pattern: '**/*.{yml,yaml}',
    base: './src/content/categories',
  }),
  schema: z.array(taxonomySchema),
});

const tags = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/tags' }),
  schema: z.array(taxonomySchema),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.enum(['draft', 'in progress', 'published']),
  }),
});

const page = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/page' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const photo = defineCollection({
  loader: unsplashPhotoLoader,
  schema: z.object({
    id: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    urls: z.object({
      full: z.string(),
      raw: z.string(),
      regular: z.string(),
      small: z.string(),
      thumb: z.string(),
    }),
    alt_description: z.nullable(z.string()),
    blur_hash: z.nullable(z.string()),
    color: z.nullable(z.string()),
    description: z.nullable(z.string()),
    height: z.number(),
    likes: z.number(),
    links: z.object({
      self: z.string(),
      html: z.string(),
      download: z.string(),
      download_location: z.string(),
    }),
    promoted_at: z.nullable(z.string()),
    width: z.number(),
    user: z.object({
      id: z.string(),
      bio: z.nullable(z.string()),
      first_name: z.string(),
      instagram_username: z.nullable(z.string()),
      last_name: z.nullable(z.string()),
      links: z.object({
        followers: z.string(),
        following: z.string(),
        html: z.string(),
        likes: z.string(),
        photos: z.string(),
        portfolio: z.string(),
        self: z.string(),
      }),
      location: z.nullable(z.string()),
      name: z.string(),
      portfolio_url: z.nullable(z.string()),
      profile_image: z.object({
        small: z.string(),
        medium: z.string(),
        large: z.string(),
      }),
      total_collections: z.number(),
      total_likes: z.number(),
      total_photos: z.number(),
      twitter_username: z.nullable(z.string()),
      updated_at: z.string(),
      username: z.string(),
    }),
  }),
});

const meta = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/meta' }),
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
});

const i18n = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/i18n' }),
  schema: z.object({
    blog_name: z.string(),
    author_name: z.string(),
    nav: z.object({
      nav_links: z.object({
        home: z.string(),
        blog: z.string(),
        news: z.string(),
        about: z.string(),
        work: z.string(),
        tools: z.string(),
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
      reset_label: z.string(),
      results_label: z.string(),
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
    bmc: z.object({
      button_label: z.string(),
      greeting_message: z.string(),
    }),
    likes: z.object({
      button_label: z.string(),
      thanks_message: z.string(),
    }),
    star_rating: z.object({
      icon_label: z.string(),
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
      error_handler_message: z.string(),
      unexpected_error_message: z.string(),
      thanks_message: z.string(),
    }),
    link_card: z.object({
      image_fallback_alt: z.string(),
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
    layouts: z.object({
      common: z.object({
        published_label: z.string(),
        updated_label: z.string(),
      }),
      blog: z.object({
        level_easy: z.string(),
        level_hard: z.string(),
        category_label: z.string(),
        tag_label: z.string(),
        difficulty_label: z.string(),
      }),
    }),
  }),
});

export const collections = {
  blog,
  categories,
  tags,
  news,
  page,
  photo,
  meta,
  i18n,
};
