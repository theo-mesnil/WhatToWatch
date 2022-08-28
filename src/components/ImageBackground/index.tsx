import * as React from 'react';
import {
  ImageBackground as RNImageBackground,
  ImageBackgroundProps as RNImageBackgroundProps
} from 'react-native';

import { Box, BoxProps } from 'components/Box';

type ImageBackgroundProps = BoxProps & RNImageBackgroundProps & {};

export function ImageBackground(props: ImageBackgroundProps) {
  return <Box as={RNImageBackground} {...props} />;
}
