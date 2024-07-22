import { type Component, type ComponentProps, splitProps } from 'solid-js'
import { Motion } from 'solid-motionone'
import { emptyFillColor, fillColor } from './likes.css'

type Props = {
  label: string
  isLiked: boolean | undefined
}

export const LikeIcon: Component<ComponentProps<'svg'> & Props> = (props) => {
  const [local, others] = splitProps(props, ['label', 'isLiked'])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={emptyFillColor}
      {...others}
    >
      <title>{local.label}</title>
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
            y: local.isLiked ? '0' : '100%',
          }}
        />
      </g>
    </svg>
  )
}
