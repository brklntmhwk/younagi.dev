import { actions } from 'astro:actions';
import { locale } from '@/components/functional/LocaleStore/locale-store';
import type { I18nData } from '@/lib/collections/types';
import { useStore } from '@nanostores/solid';
import { type Component, createResource } from 'solid-js';
import toast from 'solid-toast';
import { LikeIcon } from './LikeIcon';

type FetcherProps = Omit<Props, 't'>;

const fetchLikes = async ({ slug, collection }: FetcherProps) => {
  const data = await actions.likes.fetch.orThrow({ slug, collection });

  return data;
};

type Props = {
  slug: string;
  collection: string;
  t: I18nData<'likes'>;
};

export const Likes: Component<Props> = (props) => {
  const $locale = useStore(locale);
  const [likes, { refetch, mutate }] = createResource(
    () => ({
      slug: props.slug,
      collection: props.collection,
      locale: $locale(),
    }),
    fetchLikes,
  );

  const handleClick = async () => {
    await actions.likes.update({
      slug: props.slug,
      collection: props.collection,
    });

    mutate((prev) => {
      const previous = prev ?? { likes: 0, liked: false };
      if (!previous.liked) {
        toast(props.t.thanks_message, {
          duration: 3000,
          position: 'bottom-right',
          icon: '🙏',
        });
      }

      return {
        likes: previous.likes! + (previous.liked ? -1 : 1),
        liked: !previous.liked,
      };
    });
    refetch();
  };

  return (
    <div class="bg-teal-600 hover:bg-teal-600/90 dark:bg-teal-700 dark:hover:bg-teal-700/90 py-2 px-4 rounded-md">
      <button
        id="likes-button"
        title={props.t.button_label}
        type="button"
        class="flex bg-transparent items-center gap-2"
        onClick={handleClick}
      >
        <LikeIcon
          label={props.t.button_label}
          isLiked={likes()?.liked}
          width={24}
          height={24}
          stroke="none"
        />
        <span class="text-base md:text-lg font-bold text-white pl-0.5">
          {props.t.button_label}
        </span>
        <span class="text-base md:text-lg font-bold text-white border-l-2 border-solid border-slate-300/45 pl-2">
          {likes()?.likes ?? 0}
        </span>
      </button>
    </div>
  );
};
