import * as React from 'react';
import { Image as RNImage, ImageProps as RNImageProps } from 'react-native';

import { Box, BoxProps } from 'components/Box';

type ImageProps = BoxProps &
  RNImageProps & {
    aspectRatio?: number;
    style?: any;
  };

export function Image({ aspectRatio, style = {}, ...rest }: ImageProps) {
  return <Box as={RNImage} style={{ aspectRatio, ...style }} {...rest} />;
}
