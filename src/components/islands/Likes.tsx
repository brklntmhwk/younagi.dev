import { type Component, createResource } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { Motion } from 'solid-motionone'
import { type Languages } from '@/utils/i18n/data'
import { useTranslatedPath } from '@/utils/i18n/useTranslatedPath'
import { locale } from '@/stores/localeStore'
import {
  likesSpan,
  likesWrapper,
  likesButton,
  fgColor,
  fillColor,
} from '@/styles/styles.css'
import type { I18nData } from '@/lib/collections/types'

type Props = {
  slug: string
  collection: string
  t: I18nData<'likes'>
}
type FetcherProps = Omit<Props, 't'> & { locale: Languages }

const fetchLikes = async ({ slug, collection, locale }: FetcherProps) => {
  const translatePath = useTranslatedPath(locale)
  const res = await fetch(
    translatePath(`/api/likes?slug=${slug}&collection=${collection}`)
  )
  const data = (await res.json()) as { likes: number; liked: boolean }

  return data
}

const Likes: Component<Props> = ({ slug, collection, t }) => {
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          stroke="none"
          fill={fgColor}
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
              fill={fillColor}
              initial={{ y: '100%' }}
              animate={{
                y: likes()?.liked ? '0' : '100%',
              }}
            />
          </g>
        </svg>
        <span class={likesSpan}>
          {likes()?.liked ? t.button_label : t.button_label}
        </span>
        <span class={likesSpan}>{likes()?.likes ?? 0}</span>
      </button>
    </div>
  )
}

export default Likes
