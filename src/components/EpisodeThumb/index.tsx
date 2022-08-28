import * as React from 'react';
import { ImageBackground } from 'react-native';

import { Box } from 'components/Box';
import { Gradient } from 'components/Gradient';
import { Icon, StarFillIcon, TvFillIcon } from 'components/Icon';
import { NoCover } from 'components/NoCover';
import { Text } from 'components/Text';
import { isAndroid } from 'constants/screen';
import { useFormatReleasedDate } from 'utils/dates';
import { getImageUrl } from 'utils/images';

type EpisodeThumbProps = {
  airDate?: string;
  cover?: string;
  episode: string;
  overview?: string;
  title: string;
  votes?: {
    count: number;
    number: number;
  };
};

export function EpisodeThumb({
  airDate,
  cover,
  episode,
  overview,
  title,
  votes,
  ...rest
}: EpisodeThumbProps) {
  const formatReleasedDate = useFormatReleasedDate();
  const count = votes?.count;
  const number = votes?.number;

  return (
    <Box borderRadius="md" overflow="hidden" {...rest}>
      <Box backgroundColor="thumbBackground">
        <Box>
          <ImageBackground
            style={{ aspectRatio: 16 / 9 }}
            source={{ uri: getImageUrl(cover, 780) }}
          >
            {!cover && <NoCover icon={TvFillIcon} size={0.4} />}
            <Gradient
              position="absolute"
              top="30%"
              bottom={0}
              left={0}
              right={0}
              opacity={0.85}
            />
            <Box px="md" pb="md" justifyContent="flex-end" flexGrow={1}>
              {!title?.endsWith(episode) && (
                <Text variant="h3">Episode {episode}</Text>
              )}
              <Text variant="h2" color="light900" numberOfLines={1}>
                {title}
              </Text>
            </Box>
          </ImageBackground>
        </Box>
        {(!!airDate || (!!number && !!count) || !!overview) && (
          <Box p="md">
            <Box flexDirection="row" justifyContent="space-between">
              {!!airDate && (
                <Text variant="subtitle2">
                  {formatReleasedDate(airDate, true)}
                </Text>
              )}
              {!!number && !!count && (
                <Box
                  flexDirection="row"
                  alignItems="center"
                  mt={isAndroid && -3}
                >
                  <Icon color="yellow" mr={2} size={12} icon={StarFillIcon} />
                  <Text variant="subtitle1" weight="bold" color="yellow">
                    {number}
                  </Text>
                  <Text variant="subtitle2" mt={isAndroid && 3}>
                    {' '}
                    ({count})
                  </Text>
                </Box>
              )}
            </Box>
            {!!overview && (
              <Text mt="sm" variant="subtitle1">
                {overview}
              </Text>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
