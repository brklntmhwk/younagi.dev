import { type Component, createResource } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { type Language } from '@/utils/i18n/data'
import { useTranslatedPath } from '@/utils/i18n/utils'
import { locale } from '@/components/LocaleStore/locale-store'
import {
  likesSpan,
  likesWrapper,
  likesButton,
  likesFgColor,
  likesFillColor,
} from './likes.css'
import type { I18nData } from '@/lib/collections/types'
import { LikeIcon } from './LikeIcon'

type FetcherProps = Omit<Props, 't'> & { locale: Language }

const fetchLikes = async ({ slug, collection, locale }: FetcherProps) => {
  const translatePath = useTranslatedPath(locale)
  const res = await fetch(
    translatePath(`/api/likes?slug=${slug}&collection=${collection}`)
  )
  const data = (await res.json()) as { likes: number; liked: boolean }

  return data
}

type Props = {
  slug: string
  collection: string
  t: I18nData<'likes'>
}

export const Likes: Component<Props> = ({ slug, collection, t }) => {
  const $locale = useStore(locale)
  const translatePath = useTranslatedPath($locale())
  const [likes, { refetch, mutate }] = createResource(
    () => ({ slug, collection, locale: $locale() }),
    fetchLikes
  )

  return (
    <div class={likesWrapper}>
      <button
        type="button"
        class={likesButton}
        onClick={async () => {
          await fetch(translatePath('/api/likes'), {
            method: 'POST',
            body: JSON.stringify({ slug, collection }),
          })
          mutate((prev) => {
            const previous = prev ?? { likes: 0, liked: false }
            return {
              likes: previous.likes + (previous.liked ? -1 : 1),
              liked: !previous.liked,
            }
          })
          refetch()
        }}
      >
        <LikeIcon
          emptyFillColor={likesFgColor}
          filledFillColor={likesFillColor}
          isLiked={likes()?.liked}
        />
        <span class={likesSpan}>
          {likes()?.liked ? t.button_label : t.button_label}
        </span>
        <span class={likesSpan}>{likes()?.likes ?? 0}</span>
      </button>
    </div>
  )
}
