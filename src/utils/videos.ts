import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import { Linking } from 'react-native';

import { getNetworkFromUrl } from './networks';

type getPlayVideoTypeProps = {
  homepage?: string;
  videos: Videos | 'loading';
};

export function getPlayVideoType({ homepage, videos }: getPlayVideoTypeProps) {
  let network;

  if (homepage) {
    network = getNetworkFromUrl(homepage);
  }

  const trailer =
    videos !== 'loading' &&
    videos?.filter((video) => video?.type === 'Trailer')?.[0];

  if (network) {
    return {
      withVideo: true,
      item: {
        id: network,
        type: 'network'
      }
    };
  }

  if (trailer) {
    return {
      withVideo: true,
      item: {
        id: trailer.key,
        type: 'trailer',
        name: trailer.name,
        platform: trailer.site
      }
    };
  }

  return {
    withVideo: false,
    item: {}
  };
}

type useVideoProps = {
  id: NetworkId;
  link?: string;
  name: string;
  platform: Platform;
  type: string;
};

export function useVideo({ id, link, name, platform, type }: useVideoProps): {
  handleVideoPress: () => void;
  isNetwork: boolean;
  isYoutube: boolean;
  isVimeo: boolean;
} {
  const navigation =
    useNavigation<RootStackScreenProps<'Video'>['navigation']>();
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
      navigation.push('Video', { name, id });
    }
  }

  return { handleVideoPress, isNetwork, isYoutube, isVimeo };
}
