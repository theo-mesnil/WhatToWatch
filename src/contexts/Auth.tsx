import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import * as WebBrowser from 'expo-web-browser'
import type { PropsWithChildren } from 'react'
import { createContext, use, useEffect, useState } from 'react'

import { fetchAccessToken, fetchRequestToken } from '~/api/auth'

const REDIRECT_URI = 'whattowatch://auth'

type AuthState = {
  accessToken: null | string
  accountId: null | string
  isReady: boolean
  logIn: (accountId: string, accessToken: string, sessionId: string) => void
  logOut: () => void
  openLogin: (returnPath?: string) => Promise<boolean>
  sessionId: null | string
}

const authStorageKey = 'auth-key'
const authReturnPathKey = 'auth-return-path'

export const AuthContext = createContext<AuthState>({
  accessToken: null,
  accountId: null,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  openLogin: () => Promise.resolve(false),
  sessionId: null,
})

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false)
  const [accountId, setAccountId] = useState<null | string>(null)
  const [accessToken, setAccessToken] = useState<null | string>(null)
  const [sessionId, setSessionId] = useState<null | string>(null)

  useEffect(() => {
    WebBrowser.warmUpAsync()
    return () => {
      WebBrowser.coolDownAsync()
    }
  }, [])

  const storeAuthState = async (newState: {
    accessToken: null | string
    accountId: null | string
    sessionId: null | string
  }) => {
    try {
      const jsonValue = JSON.stringify(newState)
      await SecureStore.setItemAsync(authStorageKey, jsonValue)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error saving', error)
    }
  }

  const openLogin = async (returnPath?: string): Promise<boolean> => {
    try {
      if (returnPath) {
        await SecureStore.setItemAsync(authReturnPathKey, returnPath)
      }

      const tokenData = await fetchRequestToken(REDIRECT_URI)
      if (!tokenData.request_token) return false

      const result = await WebBrowser.openAuthSessionAsync(
        `https://www.themoviedb.org/auth/access?request_token=${tokenData.request_token}`,
        REDIRECT_URI,
        { preferEphemeralSession: true }
      )

      if (result.type === 'success') {
        const credentials = await fetchAccessToken(tokenData.request_token)
        logIn(credentials.accountId, credentials.accessToken, credentials.sessionId)
        SecureStore.deleteItemAsync(authReturnPathKey)
        return true
      }

      return false
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Login error', error)
      return false
    }
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
    SecureStore.deleteItemAsync(authStorageKey)
  }

  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const value = await SecureStore.getItemAsync(authStorageKey)
        if (value !== null) {
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
        openLogin,
        sessionId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return use(AuthContext)
}
