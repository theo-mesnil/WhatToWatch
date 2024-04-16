import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts
} from '@expo-google-fonts/poppins';
import { SplashScreen, Stack } from 'expo-router';
import * as React from 'react';
import { StatusBar } from 'react-native';

import { IntlMessages } from 'components/IntlMessages';
// import { GenresProvider } from 'contexts/genres';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        animated
        backgroundColor="transparent"
        translucent
      />
      <IntlMessages>
        {/* <GenresProvider> */}
        <Stack screenOptions={{ headerShown: false }} />
        {/* </GenresProvider> */}
      </IntlMessages>
    </>
  );
}
