import React from 'react';

import { Box } from 'components/Box';
import { Centered } from 'components/Centered';
import { ClockFillIcon, Icon, StarFillIcon } from 'components/Icon';
import { Loader } from 'components/Loader';
import { PlayButton } from 'components/PlayButton';
import { ScreenSection } from 'components/ScreenSection';
import { Text } from 'components/Text';
import { getPlayVideoType } from 'utils/videos';

export function ContentActions({
  homepage,
  isLoading,
  runtime,
  videos,
  votes
}) {
  const { isVideo, item: videoItem } = getPlayVideoType(homepage, videos);
  const voteNumber = votes?.number;
  const voteCount = votes?.count;
  const showActions = isLoading || !!voteNumber || !!runtime || isVideo;
  const showVideo = isVideo && !!videoItem;

  return showActions ? (
    <ScreenSection>
      <Centered flexDirection="row" alignItems="center" justifyContent="center">
        {isLoading ? (
          <Loader width={1} height={55} />
        ) : (
          <>
            {!!voteNumber && (
              <Box
                flexDirection="row"
                alignItems="center"
                pr="xl"
                borderRightWidth={isVideo ? '1px' : undefined}
                borderRightColor="border"
              >
                <Icon size={25} icon={StarFillIcon} color="yellow" />
                <Box ml="xs">
                  <Text variant="h2" color="yellow">
                    {voteNumber}
                  </Text>
                  <Text mt="-3px" variant="subtitle2" color="light400">
                    {voteCount}
                  </Text>
                </Box>
              </Box>
            )}
            {showVideo && (
              <PlayButton
                type={videoItem?.type}
                id={videoItem?.id}
                name={videoItem?.name}
                platform={videoItem?.platform}
                link={homepage}
                mx="xl"
              />
            )}
            {!!runtime && (
              <Box
                alignItems="center"
                pl={(!!voteNumber || showVideo) && 'xl'}
                borderLeftWidth={(!!voteNumber || showVideo) && '1px'}
                borderLeftColor="border"
              >
                <Icon size={18} icon={ClockFillIcon} color="light400" />
                <Text variant="h3" mt="xxs">
                  {runtime}
                </Text>
              </Box>
            )}
          </>
        )}
      </Centered>
    </ScreenSection>
  ) : null;
}
