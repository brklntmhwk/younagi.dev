export const slugify = (str: string) => {
  return (
    str
      .normalize('NFKD')
      .replace(/\p{M}/gu, '')
      // .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  );
};
