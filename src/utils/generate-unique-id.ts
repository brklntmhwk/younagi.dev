export const generateUniqueId = (digits?: number) => {
  const strong = digits ?? 1000

  return (
    Date.now().toString(16) + Math.floor(strong * Math.random()).toString(16)
  )
}
