import { ACCOUNT_ID, DEFAULT_PHOTO_COUNT } from '@/lib/consts';
import { unsplashApiClient } from '@/lib/unsplash/client';

export const unsplashPhotoLoader = async () => {
  const res = await unsplashApiClient.users.getPhotos({
    username: ACCOUNT_ID,
    page: 1,
    perPage: DEFAULT_PHOTO_COUNT,
  });

  if (res.errors) {
    throw new Error('Error occurred when trying to get photos');
  }

  return res.response.results;
};
