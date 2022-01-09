import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

import { getNetworkFromUrl } from './networks';

export function getPlayVideoType(homepage, videos) {
  let network;

  if (homepage) {
    network = getNetworkFromUrl(homepage);
  }

  const trailer =
    videos !== 'loading' &&
    videos?.filter((video) => video?.type === 'Trailer')?.[0];

  const withVideo = !!trailer || !!network;

  return {
    isVideo: !!trailer || !!network,
    item: withVideo
      ? network
        ? { id: network, type: 'network' }
        : {
            id: trailer?.key,
            type: 'trailer',
            name: trailer?.name,
            platform: trailer?.site
          }
      : undefined
  };
}

export function useVideo({ id, link, name, platform, type }) {
  const navigation = useNavigation();
  const isNetwork = type === 'network';
  const isYoutube = platform === 'YouTube';
  const isVimeo = platform === 'Vimeo';

  function handleVideoPress() {
    if (isNetwork) {
      Linking.openURL(link);
    }
    if (isVimeo) {
      Linking.openURL(`https://vimeo.com/${id}`);
    }
    if (isYoutube) {
      navigation.push('Video', { title: name, id });
    }
  }

  return { handleVideoPress, isNetwork, isYoutube, isVimeo };
}
