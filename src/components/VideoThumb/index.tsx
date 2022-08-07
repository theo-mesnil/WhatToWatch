import React from 'react';
import { Thumb } from 'components/Thumb';
import { useVideo } from 'utils/videos';

type VideoThumb = {
  item: {
    id: NetworkId;
    key: string;
    name: string;
    site: Platform;
    type: string;
  };
};

export function VideoThumb({ item, ...rest }: VideoThumb) {
  const { handleVideoPress, isYoutube } = useVideo({
    id: item?.key,
    name: item?.name,
    platform: item?.site,
    type: item?.type
  });

  return (
    <Thumb
      id={item.id}
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
