import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import * as React from 'react';

import { Box, BoxProps } from 'components/Box';
import { Centered } from 'components/Centered';
import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';

type ContentMediaProps = BoxProps & {
  backdrops?: Images;
  posters?: Images;
  title?: string;
};

export function ContentMedia({
  backdrops,
  posters,
  title,
  ...rest
}: ContentMediaProps) {
  const navigation =
    useNavigation<RootStackScreenProps<'Images'>['navigation']>();

  const navigateToImagesPosters = () =>
    navigation.push('Images', { images: posters, name: title });
  const navigateToImagesBackdrops = () =>
    navigation.push('Images', { images: backdrops, name: title });

  return (
    <Centered maxWidth={700} {...rest}>
      <Text numberOfLines={1} variant="h2" mb="sm">
        Media
      </Text>
      <Box flexDirection="row" width={1}>
        <Box width="34%">
          <Thumb
            aspectRatio={null}
            height={200}
            imageUrl={posters[0]?.source}
            onPress={navigateToImagesPosters}
            title={`${posters?.length} Posters`}
            withTitleOnCover
          />
        </Box>
        <Box width="63.5%" ml="2.5%">
          <Thumb
            aspectRatio={null}
            height={200}
            imageUrl={backdrops[0]?.source}
            imageWidth={780}
            onPress={navigateToImagesBackdrops}
            title={`${backdrops?.length} Backdrops`}
            withTitleOnCover
          />
        </Box>
      </Box>
    </Centered>
  );
}
