import { createApi } from 'unsplash-js';

const accessKey = import.meta.env.UNSPLASH_API_ACCESS_KEY;

if (accessKey === undefined)
  throw new Error('Unsplash API access key not found.');

export const unsplashApiClient = createApi({
  accessKey: accessKey,
});
