export const ArchiveSlugify = (date: Date) => {
  return new Date(date)
    .toLocaleDateString('sv-SE')
    .replaceAll('-', '')
    .substring(0, 6)
}
