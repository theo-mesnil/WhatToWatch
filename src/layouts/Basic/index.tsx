import { statusBarHeight } from 'constants/statusBar';

import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, BoxProps } from 'components/Box';

export function BasicLayout(props: BoxProps) {
  return (
    <Box as={ScrollView} bounces={false} showsVerticalScrollIndicator={false}>
      <Box paddingTop={statusBarHeight + 10} paddingBottom="xl" {...props} />
    </Box>
  );
}
