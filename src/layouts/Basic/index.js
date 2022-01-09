import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Box } from 'components/Box';
import { statusBarHeight } from 'constants/statusBar';

export function BasicLayout(props) {
  return (
    <Box as={ScrollView} bounces={false} showsVerticalScrollIndicator={false}>
      <Box paddingTop={statusBarHeight + 10} paddingBottom="xl" {...props} />
    </Box>
  );
}
