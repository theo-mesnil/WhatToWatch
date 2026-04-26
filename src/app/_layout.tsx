import 'intl'
import 'intl/locale-data/jsonp/en'
import 'intl/locale-data/jsonp/fr'
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import { SafeAreaListener } from 'react-native-safe-area-context'
import { Uniwind } from 'uniwind'

import { StatusBar } from '~/components/status-bar'
import { AuthProvider } from '~/contexts/auth'

import '../global.css'
import { ThemeProvider } from '~/contexts/theme'
import { IntlMessages } from '~/locales'

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

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets)
      }}
    >
      <AuthProvider>
        <ThemeProvider>
          <IntlMessages>
            <QueryClientProvider client={queryClient}>
              <StatusBar />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="me/index"
                  options={{
                    presentation: 'modal',
                  }}
                />
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
              </Stack>
            </QueryClientProvider>
          </IntlMessages>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaListener>
  )
}
