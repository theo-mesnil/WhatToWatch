export const getImageUrl = (path, width = 185) =>
  `https://image.tmdb.org/t/p/w${width}${path}`;

export const formatImagesData = (images) => {
  const formattedImages = images?.reduce(function (acc, value) {
    acc.push({ aspectRatio: value?.aspect_ratio, source: value?.file_path });
    return acc;
  }, []);
  return formattedImages;
};
