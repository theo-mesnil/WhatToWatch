import { useNavigation } from '@react-navigation/core';

export function useHandlePressItemList(type: Type = 'all') {
  const navigation = useNavigation();

  function handlePressItemList({ id, mediaType }) {
    const mediaTypeFormatted =
      type === 'all' ? mediaType : type === 'people' ? 'person' : type;

    if (mediaTypeFormatted === 'person') {
      navigation.navigate('People', { id });
    }
    if (mediaTypeFormatted === 'tv') {
      navigation.navigate('TvShow', { id });
    }
    if (mediaTypeFormatted === 'movie') {
      navigation.navigate('Movie', { id });
    }
  }

  return handlePressItemList;
}
