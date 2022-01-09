import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';
import { registerRootComponent } from 'expo';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';

import { Box } from 'components/Box';
import { coreTheme } from 'themes/core';
import { LocaleProvider } from 'contexts/locales';
import { IntlMessages } from 'components/IntlMessages';
import { GenresProvider } from 'contexts/genres';
import { Navigation } from 'navigation';

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
        <StatusBar
          barStyle="light-content"
          animated
          backgroundColor="transparent"
          translucent
        />
        <LocaleProvider>
          <IntlMessages>
            <GenresProvider>
              <Box backgroundColor="behind" flex={1}>
                <Navigation />
              </Box>
            </GenresProvider>
          </IntlMessages>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

registerRootComponent(App);
