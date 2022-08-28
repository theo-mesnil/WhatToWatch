import * as React from 'react';
import { Image } from 'react-native';

import { Box } from 'components/Box';
import { TvFillIcon } from 'components/Icon';
import { NoCover } from 'components/NoCover';
import { Text } from 'components/Text';
import { Touchable, TouchableProps } from 'components/Touchable';
import { getImageUrl } from 'utils/images';

type SeasonThumb = Pick<TouchableProps, 'onPress'> & {
  airDate?: string;
  episodes: string;
  imageUrl?: string;
  title: string;
};

export function SeasonThumb({
  airDate,
  episodes,
  imageUrl,
  onPress,
  title,
  ...rest
}) {
  const year = new Date(airDate).getFullYear();

  return (
    <Box borderRadius="md" overflow="hidden" {...rest}>
      <Touchable onPress={onPress}>
        <Box backgroundColor="thumbBackground" flexDirection="row">
          <Box width={55} height="auto">
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ aspectRatio: 2 / 3, width: '100%' }}
              source={{ uri: getImageUrl(imageUrl) }}
            />
            {!imageUrl && <NoCover withGradient icon={TvFillIcon} />}
          </Box>
          <Box px="lg" justifyContent="center">
            <Text variant="h2">{title}</Text>
            <Box flexDirection="row" alignItems="center">
              <Text variant="subtitle1" color="light900">
                {episodes} episodes
              </Text>
              <Text variant="subtitle2"> ({year})</Text>
            </Box>
          </Box>
        </Box>
      </Touchable>
    </Box>
  );
}
