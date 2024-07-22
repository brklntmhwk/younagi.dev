import type { Basic } from 'unsplash-js/dist/methods/photos/types';

export type UnsplashPhoto = Basic;
export type UnsplashPhotoData =
  | {
      results: Basic[];
      total: number;
    }
  | undefined;
