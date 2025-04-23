import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthState = {
  accessToken: null | string
  accountId: null | string
  isReady: boolean
  logIn: (accountId: string, accessToken: string, sessionId: string) => void
  logOut: () => void
  openLoginWebview: () => void
  sessionId: null | string
}

const authStorageKey = 'auth-key'

export const AuthContext = createContext<AuthState>({
  accessToken: null,
  accountId: null,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  openLoginWebview: () => {},
  sessionId: null,
})

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false)
  const [accountId, setAccountId] = useState<null | string>(null)
  const [accessToken, setAccessToken] = useState<null | string>(null)
  const [sessionId, setSessionId] = useState<null | string>(null)
  const router = useRouter()

  const storeAuthState = async (newState: { accessToken; accountId; sessionId }) => {
    try {
      const jsonValue = JSON.stringify(newState)
      await AsyncStorage.setItem(authStorageKey, jsonValue)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error saving', error)
    }
  }

  const openLoginWebview = () => {
    router.push('/login')
  }

  const logIn = (accountId: string, accessToken: string, sessionId: string) => {
    setAccountId(accountId)
    setAccessToken(accessToken)
    setSessionId(sessionId)
    storeAuthState({ accessToken, accountId, sessionId })
  }

  const logOut = () => {
    setAccountId(null)
    setAccessToken(null)
    setSessionId(null)
    storeAuthState({ accessToken: null, accountId: null, sessionId: null })
  }

  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(authStorageKey)
        if (!value.includes(null)) {
          const auth = JSON.parse(value)
          setAccountId(auth.accountId)
          setAccessToken(auth.accessToken)
          setSessionId(auth.sessionId)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching from storage', error)
      }

      setIsReady(true)
    }
    getAuthFromStorage()
  }, [])

  useEffect(() => {
    if (isReady) {
      async function hideSplash() {
        try {
          await SplashScreen.hideAsync()
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Error hiding splash screen:', e)
        }
      }
      hideSplash()
    }
  }, [isReady])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        accountId,
        isReady,
        logIn,
        logOut,
        openLoginWebview,
        sessionId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
