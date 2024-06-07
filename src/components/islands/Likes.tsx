import { type Component, createResource } from 'solid-js'
import { getLocaleFromUrl } from '@/utils/i18n/getLocaleFromUrl'
import { useTranslatedPath } from '@/utils/i18n/useTranslatedPath'

interface LikesProps {
  slug: string
  collection: string
}

const locale = getLocaleFromUrl(new URL(import.meta.url))
const translatePath = useTranslatedPath(locale)

const fetchLikes = async ({ slug, collection }: LikesProps) => {
  const res = await fetch(
    translatePath(`/api/likes?slug=${slug}&collection=${collection}`)
  )
  const data = (await res.json()) as { likes: number; liked: boolean }
  return data
}

const Likes: Component<LikesProps> = ({ slug, collection }) => {
  const [likes, { refetch, mutate }] = createResource(
    () => ({ slug, collection }),
    fetchLikes
  )

  return (
    <div
      style={{
        'background-color': 'hsla(0, 100%, 93%, 1)',
        display: 'flex',
        'align-items': 'center',
        gap: '0.75rem',
        padding: '0.5rem 0.85rem',
        'border-radius': '0.5rem',
      }}
    >
      <button
        type="button"
        style={{}}
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
        💓
        {/* {likes()?.liked ? (
          <Svg iconName="hand-heart-filled" width={20} height={20} />
        ) : (
          <Svg iconName="hand-heart" width={20} height={20} />
        )} */}
      </button>
      <span
        style={{
          color: 'var(--fg)',
          'font-size': '1.25rem',
          'border-left': '1px solid var(--line)',
          'padding-left': '0.875rem',
        }}
      >
        {likes()?.likes ?? 0}
      </span>
    </div>
  )
}

export default Likes
