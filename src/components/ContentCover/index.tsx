import React from 'react';
import { ImageBackground } from 'react-native';
import { Box, BoxProps } from 'components/Box';
import { Centered } from 'components/Centered';
import { Gradient } from 'components/Gradient';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { NoCover } from 'components/NoCover';
import { getIconType } from 'utils/icons';

import { getImageUrl } from 'utils/images';

type ContentCoverProps = BoxProps & {
  backdrop?: string;
  setTitleOffset: (y) => void;
  subtitle?: string;
  title?: string;
  type?: ContentType;
};

export function ContentCover({
  backdrop,
  setTitleOffset,
  subtitle,
  title,
  type,
  ...rest
}: ContentCoverProps) {
  const backdropIsLoading = backdrop === 'loading';

  return (
    <Box
      as={ImageBackground}
      source={
        backdropIsLoading ? undefined : { uri: getImageUrl(backdrop, 780) }
      }
      style={{ aspectRatio: 16 / 10 }}
      {...rest}
    >
      {backdropIsLoading && (
        <Loader position="absolute" top={0} bottom={0} left={0} right={0} />
      )}
      {!backdropIsLoading && !backdrop && <NoCover icon={getIconType(type)} />}
      <Gradient
        position="absolute"
        top="20%"
        bottom={0}
        left={0}
        right={0}
        opacity={0.9}
      />
      <Centered justifyContent="flex-end" flexGrow={1} pb="md">
        {!!title && (
          <Text
            variant="h1"
            numberOfLines={1}
            onLayout={({
              nativeEvent: {
                layout: { y }
              }
            }) => setTitleOffset(y)}
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text variant="subtitle1" numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </Centered>
    </Box>
  );
}
