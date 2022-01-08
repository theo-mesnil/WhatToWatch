import { registerRootComponent } from 'expo';
import React from 'react';
import { Text } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { Box } from 'components/Box';
import { coreTheme } from 'themes/core';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={coreTheme}>
        <Box
          backgroundColor="primary500"
          flex="1"
          alignItems="center"
          justifyContent="center"
        >
          <Text>coco</Text>
        </Box>
      </ThemeProvider>
    );
  }
}

registerRootComponent(App);
