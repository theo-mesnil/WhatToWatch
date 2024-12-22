import { router } from 'expo-router';
import { Linking } from 'react-native';

import { videoPath } from 'routes';

type getVideoProps = {
  id: string;
  platform: string;
};
export const getVideo = ({ id, platform }: getVideoProps) => {
  const isYoutube = platform === 'YouTube';
  const imageUrl = isYoutube
    ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    : `https://i.vimeocdn.com/video/${id}_640.jpg`;

  function handlePress() {
    if (isYoutube) {
      router.navigate(videoPath({ id }));
    } else {
      Linking.openURL(`https://vimeo.com/${id}`);
    }
  }

  return {
    imageUrl,
    isYoutube,
    handlePress
  };
};
