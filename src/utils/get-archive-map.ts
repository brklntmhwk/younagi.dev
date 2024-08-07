export const getArchiveMap = (dates: Date[]) => {
  const archiveMap = new Map<number, Array<number>>();

  for (const date of dates) {
    if (!archiveMap.has(date.getFullYear())) {
      archiveMap.set(date.getFullYear(), new Array(date.getMonth()));
    } else {
      if (!archiveMap.get(date.getFullYear())?.includes(date.getMonth())) {
        archiveMap.get(date.getFullYear())?.push(date.getMonth());
      }
    }
  }

  return archiveMap;
};
