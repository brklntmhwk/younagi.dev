// import { createResource, type Component, type ComponentProps } from 'solid-js'
// import { Dynamic, NoHydration, isServer, renderToString } from 'solid-js/web'

// export type Props = ComponentProps<>

// export const IconComponent: Component<Props> = (props) => {
//   if (!isServer) {
//     console.error('Icon component must only be used on the server')

//     return null
//   }

//   const [iconData] = createResource(() => props)
// }

// export const Icon: Component<Props> = (props) => {
//   return (
//     <NoHydration>
//       <IconComponent {...props} />
//     </NoHydration>
//   )
// }
