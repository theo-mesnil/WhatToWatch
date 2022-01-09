import React from 'react';
import { ImageBackground } from 'react-native';

import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { getImageUrl } from 'utils/images';
import { Gradient } from 'components/Gradient';
import { Icon, StarFillIcon, TvFillIcon } from 'components/Icon';
import { useFormatReleasedDate } from 'utils/dates';
import { NoCover } from 'components/NoCover';
import { isAndroid } from 'constants/screen';

export function EpisodeThumb({
  airDate,
  cover,
  episode,
  overview,
  title,
  votes = {},
  ...rest
}) {
  const formatReleasedDate = useFormatReleasedDate();
  const { count, number } = votes;

  return (
    <Box borderRadius="md" overflow="hidden" {...rest}>
      <Box backgroundColor="thumbBackground">
        <Box>
          <Box
            as={ImageBackground}
            style={{ aspectRatio: 16 / 9 }}
            source={{ uri: getImageUrl(cover, 780) }}
          >
            {!cover && <NoCover icon={TvFillIcon} size="40%" />}
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
          </Box>
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
                  <Text
                    textAlignVertical="center"
                    variant="subtitle1"
                    weight="bold"
                    color="yellow"
                  >
                    {number}
                  </Text>
                  <Text
                    textAlignVertical="center"
                    variant="subtitle2"
                    mt={isAndroid && 3}
                  >
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
