import * as React from 'react';
import { ImageBackground } from 'react-native';

import { Box, BoxProps } from 'components/Box';
import { Centered } from 'components/Centered';
import { Gradient } from 'components/Gradient';
import { Loader } from 'components/Loader';
import { NoCover } from 'components/NoCover';
import { Text } from 'components/Text';
import { getIconType } from 'utils/icons';
import { getImageUrl } from 'utils/images';

interface ContentCoverProps extends BoxProps {
  backdrop?: string;
  setTitleOffset: (y: number) => void;
  title?: string;
  type?: ContentType;
}

export function ContentCover({
  backdrop,
  setTitleOffset,
  title,
  type,
  ...rest
}: ContentCoverProps) {
  const backdropIsLoading = backdrop === 'loading';

  return (
    <Box {...rest}>
      <ImageBackground
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flex: 1, height: 350 }}
        source={{ uri: getImageUrl(backdrop, 1280) }}
      >
        {backdropIsLoading && (
          <Loader position="absolute" top={0} bottom={0} left={0} right={0} />
        )}
        {!backdropIsLoading && !backdrop && (
          <NoCover icon={getIconType(type)} />
        )}
        <Gradient
          position="absolute"
          colors={['transparent', 'behind']}
          height="80%"
          bottom={0}
          left={0}
          right={0}
          opacity={1}
        />
        <Centered justifyContent="flex-end" flexGrow={1} pb="lg">
          {!!title && (
            <Text
              variant="h0"
              textAlign="center"
              onLayout={({
                nativeEvent: {
                  layout: { y }
                }
              }) => setTitleOffset(y)}
            >
              {title}
            </Text>
          )}
        </Centered>
      </ImageBackground>
    </Box>
  );
}
