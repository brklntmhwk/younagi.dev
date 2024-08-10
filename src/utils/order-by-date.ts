export const orderByDate = (
  a: string,
  b: string,
  order: 'asc' | 'desc',
): number => {
  if (order === 'asc') {
    return a > b ? 1 : -1;
  }
  return a < b ? 1 : -1;
};
