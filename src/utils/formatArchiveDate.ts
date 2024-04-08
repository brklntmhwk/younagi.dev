export const formatArchiveDate = (date: Date) => {
  return new Date(date)
    .toLocaleDateString('sv-SE')
    .replaceAll('-', '')
    .substring(0, 6)
}
