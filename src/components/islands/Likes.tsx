import {
  type Component,
  createEffect,
  createSignal,
  createResource,
} from 'solid-js'
import { type CollectionEntry, getEntry } from 'astro:content'
import { languages } from '@/utils/i18n/data'
import { useTranslatedPath } from '@/utils/i18n/useTranslatedPath'
import { likesClass } from '@/styles/styles.css'

type Props = {
  slug: string
  collection: string
  locale: keyof typeof languages
}

const fetchLikes = async ({ slug, collection, locale }: Props) => {
  const translatePath = useTranslatedPath(locale)
  const res = await fetch(
    translatePath(`/api/likes?slug=${slug}&collection=${collection}`)
  )
  const data = (await res.json()) as { likes: number; liked: boolean }

  return data
}

const Likes: Component<Props> = ({ slug, collection, locale }) => {
  const translatePath = useTranslatedPath(locale)
  const [t, setT] = createSignal<CollectionEntry<'i18n'>>()
  const [likes, { refetch, mutate }] = createResource(
    () => ({ slug, collection, locale }),
    fetchLikes
  )

  createEffect(async () => {
    const translations = await getEntry('i18n', `${locale}/translation`)
    setT(translations)
  })

  return (
    <div class={likesClass}>
      <button
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
        <span>
          {likes()?.liked
            ? t()?.data.likes.button_label
            : t()?.data.likes.button_label}
        </span>
        <span>{likes()?.likes ?? 0}</span>
      </button>
    </div>
  )
}

export default Likes
