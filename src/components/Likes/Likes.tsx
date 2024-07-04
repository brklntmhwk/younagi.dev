import { type Component, createResource } from 'solid-js'
import { Motion } from 'solid-motionone'
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

export const Likes: Component<Props> = (props) => {
  const $locale = useStore(locale)
  const translatePath = useTranslatedPath($locale())
  const [likes, { refetch, mutate }] = createResource(
    () => ({
      slug: props.slug,
      collection: props.collection,
      locale: $locale(),
    }),
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
            body: JSON.stringify({
              slug: props.slug,
              collection: props.collection,
            }),
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
          isLiked={likes()?.liked}
          width={24}
          height={24}
          stroke="none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          stroke="none"
          fill={likesFgColor}
        >
          <defs>
            <clipPath id="clip-path">
              <path d="M15.056 9.004q.692-2.14.693-3.754c0-2.398-.939-4.247-2.5-4.247c-.847 0-1.109.504-1.437 1.747c.018-.065-.163.634-.215.821q-.152.539-.527 1.831a.3.3 0 0 1-.03.065L8.174 9.953a5.9 5.9 0 0 1-2.855 2.326l-1.257.482a1.75 1.75 0 0 0-1.092 1.967l.686 3.539a2.25 2.25 0 0 0 1.673 1.757l8.25 2.022a4.75 4.75 0 0 0 5.733-3.44l1.574-6.173a2.75 2.75 0 0 0-2.665-3.43z" />
            </clipPath>
          </defs>
          <path d="M15.056 9.004q.692-2.14.693-3.754c0-2.398-.939-4.247-2.5-4.247c-.847 0-1.109.504-1.437 1.747c.018-.065-.163.634-.215.821q-.152.539-.527 1.831a.3.3 0 0 1-.03.065L8.174 9.953a5.9 5.9 0 0 1-2.855 2.326l-1.257.482a1.75 1.75 0 0 0-1.092 1.967l.686 3.539a2.25 2.25 0 0 0 1.673 1.757l8.25 2.022a4.75 4.75 0 0 0 5.733-3.44l1.574-6.173a2.75 2.75 0 0 0-2.665-3.43z" />
          <g clip-path="url(#clip-path)">
            <Motion.rect
              x={0}
              y={0}
              width={48}
              height={48}
              fill={likesFillColor}
              initial={{ y: '100%' }}
              animate={{
                y: likes()?.liked ? '0' : '100%',
              }}
            />
          </g>
        </svg>
        <span class={likesSpan}>{props.t.button_label}</span>
        <span class={likesSpan}>{likes()?.likes ?? 0}</span>
      </button>
    </div>
  )
}
