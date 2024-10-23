const load = async () => {
  let images: Record<string, () => Promise<unknown>> | undefined = undefined;

  try {
    images = import.meta.glob(
      '@/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}',
    );
  } catch (err) {
    // continue anyhow
  }

  return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined = undefined;

export const fetchLocalImages = async () => {
  _images = _images ?? (await load());

  return _images;
};

export const findImage = async (
  imagePath?: string | ImageMetadata | null,
): Promise<string | ImageMetadata | undefined | null> => {
  if (typeof imagePath !== 'string') return imagePath;

  if (imagePath.startsWith('http')) return imagePath;

  if (!imagePath.startsWith('~/assets/images') || imagePath.startsWith('/'))
    return imagePath;

  const images = await fetchLocalImages();
  const key = imagePath.replace('@/', '/src/');

  return images && typeof images[key] === 'function'
    ? ((await images[key]()) as { default: ImageMetadata }).default
    : null;
};
