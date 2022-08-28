import * as React from 'react';

import { Thumb } from 'components/Thumb';
import { useVideo } from 'utils/videos';

type VideoThumbProps = {
  item: {
    key: NetworkId;
    name: string;
    site: Platform;
    type: string;
  };
};

export function VideoThumb({ item, ...rest }: VideoThumbProps) {
  const { handleVideoPress, isYoutube } = useVideo({
    id: item?.key,
    name: item?.name,
    platform: item?.site,
    type: item?.type
  });

  return (
    <Thumb
      imageUrl={
        isYoutube
          ? `https://i.ytimg.com/vi/${item.key}/hqdefault.jpg`
          : `https://i.vimeocdn.com/video/${item.key}_640.jpg`
      }
      title={item?.name}
      subtitle={item?.type}
      isVideo
      {...rest}
      onPress={handleVideoPress}
    />
  );
}
