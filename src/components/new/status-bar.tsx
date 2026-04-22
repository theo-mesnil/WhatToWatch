import { StatusBar as ExpoStatusBar } from 'expo-status-bar'

import { useTheme } from '~/contexts/theme'

export const StatusBar = () => {
  const { isDark } = useTheme()

  return <ExpoStatusBar style={isDark ? 'light' : 'dark'} />
}
