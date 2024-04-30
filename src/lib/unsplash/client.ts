import { createApi } from 'unsplash-js'

const accessKey = import.meta.env.UNSPLASH_API_ACCESS_KEY

if (accessKey === undefined)
  throw Error('Set Unsplash API access key in env file')

export const unsplashApiClient = createApi({
  accessKey: accessKey,
})
