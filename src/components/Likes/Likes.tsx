import { type Component, createResource } from 'solid-js'
import { useStore } from '@nanostores/solid'
import toast from 'solid-toast'
import wretch from 'wretch'
import { type Language } from '@/utils/i18n/data'
import { useTranslatedPath } from '@/utils/i18n/utils'
import { locale } from '@/components/LocaleStore/locale-store'
import { likesSpan, likesWrapper, likesButton } from './likes.css'
import type { I18nData } from '@/lib/collections/types'
import { LikeIcon } from './LikeIcon'

type FetcherProps = Omit<Props, 't'> & { locale: Language }

const fetchLikes = async ({ slug, collection, locale }: FetcherProps) => {
  const translatePath = useTranslatedPath(locale)
  const res = await wretch()
    .url(translatePath(`/api/likes?slug=${slug}&collection=${collection}`))
    .get()
    .res()
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

  const handleClick = async () => {
    await wretch()
      .url(translatePath('/api/likes'))
      .post({
        slug: props.slug,
        collection: props.collection,
      })
      .res()

    mutate((prev) => {
      const previous = prev ?? { likes: 0, liked: false }
      if (!previous.liked) {
        toast(props.t.thanks_message, {
          duration: 3000,
          position: 'bottom-right',
          icon: '🙏',
        })
      }

      return {
        likes: previous.likes + (previous.liked ? -1 : 1),
        liked: !previous.liked,
      }
    })
    refetch()
  }

  return (
    <div class={likesWrapper}>
      <button type="button" class={likesButton} onClick={handleClick}>
        <LikeIcon
          isLiked={likes()?.liked}
          width={24}
          height={24}
          stroke="none"
        />
        <span class={likesSpan}>{props.t.button_label}</span>
        <span class={likesSpan}>{likes()?.likes ?? 0}</span>
      </button>
    </div>
  )
}
