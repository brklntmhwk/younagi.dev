import {
  type ParentComponent,
  createContext,
  createSignal,
  useContext,
} from 'solid-js'

const ToggleContext = createContext<() => boolean>()

export const useToggle = () => {
  return useContext(ToggleContext)
}

type Props = {
  isOpen: boolean
}

export const ToggleProvider: ParentComponent<Props> = (props) => {
  const [, setIsOpen] = createSignal(props.isOpen)
  const toggle = () => setIsOpen((isOpen) => !isOpen)

  return (
    <ToggleContext.Provider value={toggle}>
      {props.children}
    </ToggleContext.Provider>
  )
}
