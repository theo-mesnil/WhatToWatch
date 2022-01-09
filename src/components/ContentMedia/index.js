import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Box } from 'components/Box';
import { Centered } from 'components/Centered';
import { Text } from 'components/Text';
import { Thumb } from 'components/Thumb';

export function ContentMedia({ backdrops, posters, ...rest }) {
  const navigation = useNavigation();

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
            onPress={() => navigation.push('Images', { images: posters })}
            smallTitleOnCover={true}
            title={`${posters?.length} Posters`}
            withBackdropImage
            withTitleOnCover
          />
        </Box>
        <Box width="63.5%" ml="2.5%">
          <Thumb
            aspectRatio={null}
            height={200}
            imageUrl={backdrops[0]?.source}
            imageWidth={780}
            onPress={() => navigation.push('Images', { images: backdrops })}
            smallTitleOnCover={true}
            title={`${backdrops?.length} Backdrops`}
            withBackdropImage
            withTitleOnCover
          />
        </Box>
      </Box>
    </Centered>
  );
}
