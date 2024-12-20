import { type Component, type ComponentProps, splitProps } from 'solid-js';
import { Motion } from 'solid-motionone';

type Props = {
  label: string;
  isBright: boolean | undefined;
};

export const StarIcon: Component<ComponentProps<'svg'> & Props> = (props) => {
  const [local, others] = splitProps(props, ['label', 'isBright']);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      class="fill-star-empty"
      {...others}
    >
      <title>{local.label}</title>
      <defs>
        <clipPath id="star-clip-path">
          <path d="M28.84 17.638c-.987 1.044-1.633 3.067-1.438 4.493l.892 6.441c.197 1.427-.701 2.087-1.996 1.469l-5.851-2.796c-1.295-.62-3.408-.611-4.7.018l-5.826 2.842c-1.291.629-2.193-.026-2.007-1.452l.843-6.449c.186-1.427-.475-3.444-1.47-4.481l-4.494-4.688c-.996-1.037-.655-2.102.755-2.365l6.37-1.188c1.41-.263 3.116-1.518 3.793-2.789L16.762.956c.675-1.271 1.789-1.274 2.473-.009L22.33 6.66c.686 1.265 2.4 2.507 3.814 2.758l6.378 1.141c1.412.252 1.761 1.314.774 2.359z" />
        </clipPath>
      </defs>
      <path d="M28.84 17.638c-.987 1.044-1.633 3.067-1.438 4.493l.892 6.441c.197 1.427-.701 2.087-1.996 1.469l-5.851-2.796c-1.295-.62-3.408-.611-4.7.018l-5.826 2.842c-1.291.629-2.193-.026-2.007-1.452l.843-6.449c.186-1.427-.475-3.444-1.47-4.481l-4.494-4.688c-.996-1.037-.655-2.102.755-2.365l6.37-1.188c1.41-.263 3.116-1.518 3.793-2.789L16.762.956c.675-1.271 1.789-1.274 2.473-.009L22.33 6.66c.686 1.265 2.4 2.507 3.814 2.758l6.378 1.141c1.412.252 1.761 1.314.774 2.359z" />
      <g clip-path="url(#star-clip-path)">
        <Motion.rect
          x={0}
          y={0}
          width={36}
          height={36}
          class={local.isBright ? 'fill-star-filled' : 'fill-star-empty'}
          initial={{ opacity: 1 }}
          animate={{
            opacity: local.isBright ? [0, 1, 0, 1, 0, 1] : 1,
          }}
          transition={{ duration: 2, easing: 'linear' }}
        />
      </g>
    </svg>
  );
};
