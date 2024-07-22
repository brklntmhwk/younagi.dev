import type {
  OEmbedPhoto,
  OEmbedRich,
  OEmbedSchema,
  OEmbedVideo,
} from './types'

export function isPhoto(schema: OEmbedSchema): schema is OEmbedPhoto {
  return schema.type === 'photo' && Object.hasOwn(schema, 'url')
}

export function isVideo(schema: OEmbedSchema): schema is OEmbedVideo {
  return schema.type === 'video' && Object.hasOwn(schema, 'html')
}

export function isRich(schema: OEmbedSchema): schema is OEmbedRich {
  return schema.type === 'rich' && Object.hasOwn(schema, 'html')
}
