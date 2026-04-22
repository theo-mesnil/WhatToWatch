import * as SecureStore from 'expo-secure-store'
import type { ReactNode } from 'react'
import { createContext, use, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { Uniwind } from 'uniwind'

export type Theme = 'dark' | 'light' | 'system'

const THEME_STORAGE_KEY = 'theme'

interface ThemeContextType {
  changeTheme: (theme: Theme) => void
  isDark: boolean
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('system')
  const colorScheme = useColorScheme()

  useEffect(() => {
    SecureStore.getItemAsync(THEME_STORAGE_KEY).then(storedTheme => {
      if (storedTheme) {
        setTheme(storedTheme as Theme)
        Uniwind.setTheme(storedTheme as Theme)
      } else {
        Uniwind.setTheme('system')
      }
    })
  }, [])

  const changeTheme = async (newTheme: Theme) => {
    setTheme(newTheme)
    await SecureStore.setItemAsync(THEME_STORAGE_KEY, newTheme)
    Uniwind.setTheme(newTheme)
  }

  const isDark = theme === 'system' ? colorScheme === 'dark' : theme === 'dark'

  return (
    <ThemeContext.Provider value={{ changeTheme, isDark, theme }}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = use(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
