import { registerRootComponent } from 'expo';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import { Box } from 'components/Box';
import { coreTheme } from 'themes/core';
import { Text } from 'components/Text';

function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={coreTheme}>
        <Box
          backgroundColor="behind"
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Text variant="h1">WhatToWatch</Text>
        </Box>
      </ThemeProvider>
    );
  }
}

registerRootComponent(App);
