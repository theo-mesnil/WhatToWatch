import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts
} from '@expo-google-fonts/poppins';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { IntlMessages } from 'locales';
import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { theme } from 'theme';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <View style={styles.wrapper}>
            <Stack screenOptions={{ header: () => null }}>
              <Stack.Screen
                name="movie/[id]"
                options={{
                  presentation: 'modal'
                }}
              />
              <Stack.Screen
                name="tv/[id]"
                options={{
                  presentation: 'modal'
                }}
              />
              <Stack.Screen
                name="person/[id]"
                options={{
                  presentation: 'modal'
                }}
              />
            </Stack>
          </View>
        </QueryClientProvider>
      </IntlMessages>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.behind
  }
});
