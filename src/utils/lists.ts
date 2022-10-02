import { useNavigation } from '@react-navigation/core';

export function useHandlePressItemList(type: Type = 'all') {
  const navigation = useNavigation();

  function handlePressItemList({ id, mediaType, name }) {
    const mediaTypeFormatted = type === 'all' ? mediaType : type;

    if (mediaTypeFormatted === 'person') {
      navigation.navigate('People', { id, name });
    }
    if (mediaTypeFormatted === 'tv') {
      navigation.navigate('TvShow', { id, name });
    }
    if (mediaTypeFormatted === 'movie') {
      navigation.navigate('Movie', { id, name });
    }
  }

  return handlePressItemList;
}
