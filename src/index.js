import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';
import React, { useCallback } from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { Box } from 'components/Box';
import { coreTheme } from 'themes/core';
import { LocaleProvider } from 'contexts/locales';
import { IntlMessages } from 'components/IntlMessages';
import { GenresProvider } from 'contexts/genres';
import { Navigation } from 'navigation';

SplashScreen.preventAutoHideAsync();

export function AppIndex() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={coreTheme}>
      <StatusBar
        barStyle="light-content"
        animated
        backgroundColor="transparent"
        translucent
      />
      <LocaleProvider>
        <IntlMessages>
          <GenresProvider>
            <Box backgroundColor="behind" flex={1} onLayout={onLayoutRootView}>
              <Navigation />
            </Box>
          </GenresProvider>
        </IntlMessages>
      </LocaleProvider>
    </ThemeProvider>
  );
}
