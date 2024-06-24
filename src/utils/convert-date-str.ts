export const convertDateStr = (dateStr: string) => {
  const year = parseInt(dateStr.substring(0, 4), 10)
  const month = parseInt(dateStr.substring(4, 6), 10) - 1

  return new Date(year, month)
}
