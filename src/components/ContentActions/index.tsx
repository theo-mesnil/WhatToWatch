import * as React from 'react';

import { Centered } from 'components/Centered';
import { Loader } from 'components/Loader';
import { PlayButton } from 'components/PlayButton';
import { getPlayVideoType } from 'utils/videos';

type ContentActionsProps = {
  homepage: string;
  isLoading?: boolean;
  videos: Videos | 'loading';
};

export function ContentActions({
  homepage,
  isLoading,
  videos
}: ContentActionsProps) {
  const { item: videoItem, withVideo } = getPlayVideoType({ homepage, videos });

  const showActions = isLoading || withVideo;
  const showVideo = withVideo && !!videoItem;

  return showActions ? (
    <Centered
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      my="md"
    >
      {isLoading ? (
        <Loader width={1} height={55} />
      ) : (
        <>
          {showVideo && (
            <PlayButton
              type={videoItem.type}
              id={videoItem.id}
              name={videoItem.name}
              platform={videoItem.platform}
              link={homepage}
              mx="xl"
            />
          )}
        </>
      )}
    </Centered>
  ) : null;
}
