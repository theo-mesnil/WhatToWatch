import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Box, BoxProps } from 'components/Box';
import { statusBarHeight } from 'constants/statusBar';

export function BasicLayout(props: BoxProps) {
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Box paddingTop={statusBarHeight + 10} paddingBottom="xl" {...props} />
    </ScrollView>
  );
}
