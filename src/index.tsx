import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { Box } from 'components/Box';
import { IntlMessages } from 'components/IntlMessages';
import { GenresProvider } from 'contexts/genres';
import { LocaleProvider } from 'contexts/locales';
import { Navigation } from 'navigation';
import { coreTheme } from 'themes/core';

SplashScreen.preventAutoHideAsync();

export function AppIndex() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  const onLayoutRootView = React.useCallback(async () => {
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
            <Box flex={1} onLayout={onLayoutRootView}>
              <Navigation />
            </Box>
          </GenresProvider>
        </IntlMessages>
      </LocaleProvider>
    </ThemeProvider>
  );
}
