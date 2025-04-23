import 'intl'
import 'intl/locale-data/jsonp/en'
import 'intl/locale-data/jsonp/fr'
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'

import { AuthProvider } from '~/contexts/Auth'
import { IntlMessages } from '~/locales'
import { theme } from '~/theme'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 2000,
  fade: true,
})

export const queryClient = new QueryClient()

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  })

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded) {
    return null
  }

  return (
    <AuthProvider>
      <StatusBar animated backgroundColor="transparent" barStyle="light-content" translucent />
      <IntlMessages>
        <QueryClientProvider client={queryClient}>
          <View style={styles.wrapper}>
            <Stack screenOptions={{ header: () => null }}>
              <Stack.Screen
                name="movie/[id]/images/[type]"
                options={{
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="tv/[id]/images/[type]"
                options={{
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="person/[id]/images/[start]"
                options={{
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="video/[id]"
                options={{
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="login/index"
                options={{
                  presentation: 'modal',
                }}
              />
            </Stack>
          </View>
        </QueryClientProvider>
      </IntlMessages>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.behind,
    flex: 1,
  },
})
