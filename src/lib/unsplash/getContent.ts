import type { Basic } from 'unsplash-js/dist/methods/photos/types'
import { unsplashApiClient } from '@/lib/unsplash/client'
import { DEFAULT_PHOTO_COUNT, ACCOUNT_ID } from '@/consts'

export type UnsplashPhotoData =
  | {
      results: Basic[]
      total: number
    }
  | undefined

export const getPhotos = (pageNum?: number) =>
  unsplashApiClient.users
    .getPhotos({
      username: ACCOUNT_ID,
      page: 1,
      perPage: pageNum ?? DEFAULT_PHOTO_COUNT,
    })
    .then((res) => {
      if (res.errors) {
        console.error('error occurred when trying to get photos..')
        throw new Error('error occurred when trying to get photos..')
      } else {
        return res.response
      }
    })

export const getPhoto = async (photoId: string) => {
  const photos = await getPhotos()
  const photo = photos?.results.find((photo) => photo.id === photoId)

  return photo
}

export const getPhotographer = () =>
  unsplashApiClient.users.get({ username: ACCOUNT_ID }).then((res) => {
    if (res.errors) {
      console.error('error occurred when trying to get my user data..')
      throw new Error('error occurred when trying to get my user data..')
    } else {
      return res.response
    }
  })

export const getCollections = () =>
  unsplashApiClient.users
    .getCollections({
      username: ACCOUNT_ID,
      page: 1,
      perPage: 5,
    })
    .then((result) => {
      if (result.errors) {
        console.error('error occurred when trying to get my collections!')
        throw new Error('error occurred when trying to get my photos..')
      } else {
        return result.response
      }
    })
