export function getImageUrl(path: string, width: number = 185): string {
  return `https://image.tmdb.org/t/p/w${width}${path}`;
}

type Image = {
  aspect_ratio?: number;
  file_path: string;
};

export function formatImagesData(images: Image[]) {
  const formattedImages = images?.reduce(function (acc, value) {
    acc.push({ aspectRatio: value?.aspect_ratio, source: value?.file_path });
    return acc;
  }, []);
  return formattedImages;
}
