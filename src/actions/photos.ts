import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { UNSPLASH_API_ACCESS_KEY } from 'astro:env/server';
import { createApi } from 'unsplash-js';

export const photos = {
  fetch: defineAction({
    input: z.object({
      username: z.string(),
      perPage: z.number().default(6),
    }),
    handler: async (input) => {
      // const accessKey = ctx.locals.runtime.env.UNSPLASH_API_ACCESS_KEY;
      const apiClient = createApi({ accessKey: UNSPLASH_API_ACCESS_KEY });

      const { username, perPage } = input;

      const res = await apiClient.users.getPhotos({
        username,
        page: 1,
        perPage,
      });

      if (res.type === 'error') {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch Unsplash photos: ${res.errors[0]}`,
        });
      }

      return res.response.results;
    },
  }),
};
