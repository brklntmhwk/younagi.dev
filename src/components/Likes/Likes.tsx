import { locale } from '@/components/LocaleStore/locale-store'
import type { I18nData } from '@/lib/collections/types'
import type { Language } from '@/utils/i18n/data'
import { useTranslatedPath } from '@/utils/i18n/utils'
import { useStore } from '@nanostores/solid'
import { type Component, createResource } from 'solid-js'
import toast from 'solid-toast'
import wretch from 'wretch'
import { LikeIcon } from './LikeIcon'
import { likesButton, likesSpan, likesWrapper } from './likes.css'

type FetcherProps = Omit<Props, 't'> & { locale: Language }

const fetchLikes = async ({ slug, collection, locale }: FetcherProps) => {
  const translatePath = useTranslatedPath(locale)
  const data = (await wretch()
    .url(translatePath(`/api/likes?slug=${slug}&collection=${collection}`))
    .get()
    .json()) as { likes: number; liked: boolean }

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
    fetchLikes,
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
      <button
        id="likes-button"
        title={props.t.button_label}
        type="button"
        class={likesButton}
        onClick={handleClick}
      >
        <LikeIcon
          label={props.t.button_label}
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
