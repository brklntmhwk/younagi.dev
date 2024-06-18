import { type Component, createResource } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { type Languages } from '@/utils/i18n/data'
import { useTranslatedPath } from '@/utils/i18n/useTranslatedPath'
import { locale } from '@/stores/localeStore'
import { likesButton, likesSpan, likesWrapper } from '@/styles/styles.css'
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
        class={likesButton}
        type="button"
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
        <span class={likesSpan}>
          {likes()?.liked ? t.button_label : t.button_label}
        </span>
        <span class={likesSpan}>{likes()?.likes ?? 0}</span>
      </button>
    </div>
  )
}

export default Likes
