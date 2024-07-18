import { unsplashApiClient } from '@/lib/unsplash/client'
import { DEFAULT_PHOTO_COUNT, ACCOUNT_ID } from '@/lib/consts'

export const getPhotos = async (pageNum?: number) => {
  const res = await unsplashApiClient.users.getPhotos({
    username: ACCOUNT_ID,
    page: 1,
    perPage: pageNum ?? DEFAULT_PHOTO_COUNT,
  })

  if (res.errors) {
    throw new Error('Error occurred when trying to get photos..')
  }

  return res.response
}

export const getPhoto = async (photoId: string) => {
  const photos = await getPhotos()
  const photo = photos?.results.find((photo) => photo.id === photoId)

  return photo
}

export const getPhotographer = async () => {
  const res = await unsplashApiClient.users.get({ username: ACCOUNT_ID })

  if (res.errors) {
    throw new Error('Error occurred when trying to get my user data..')
  }

  return res.response
}

export const getCollections = async () => {
  const res = await unsplashApiClient.users.getCollections({
    username: ACCOUNT_ID,
    page: 1,
    perPage: 5,
  })

  if (res.errors) {
    throw new Error('Error occurred when trying to get my photos..')
  }

  return res.response
}
