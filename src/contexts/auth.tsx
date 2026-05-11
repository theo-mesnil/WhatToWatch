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

const AuthContext = createContext<AuthState>({
  accessToken: null,
  accountId: null,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  openLogin: () => Promise.resolve(false),
  sessionId: null,
})

type AuthCredentials = {
  accessToken: null | string
  accountId: null | string
  sessionId: null | string
}

const EMPTY_CREDENTIALS: AuthCredentials = {
  accessToken: null,
  accountId: null,
  sessionId: null,
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false)
  const [credentials, setCredentials] = useState<AuthCredentials>(EMPTY_CREDENTIALS)

  useEffect(() => {
    WebBrowser.warmUpAsync()
    return () => {
      WebBrowser.coolDownAsync()
    }
  }, [])

  const storeAuthState = async (newState: AuthCredentials) => {
    try {
      const jsonValue = JSON.stringify(newState)
      await SecureStore.setItemAsync(authStorageKey, jsonValue)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error saving', error)
    }
  }

  const logIn = (accountId: string, accessToken: string, sessionId: string) => {
    setCredentials({ accessToken, accountId, sessionId })
    storeAuthState({ accessToken, accountId, sessionId })
  }

  const logOut = () => {
    setCredentials(EMPTY_CREDENTIALS)
    SecureStore.deleteItemAsync(authStorageKey)
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
        const tokenResponse = await fetchAccessToken(tokenData.request_token)
        logIn(tokenResponse.accountId, tokenResponse.accessToken, tokenResponse.sessionId)
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

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const value = await SecureStore.getItemAsync(authStorageKey)
        if (value !== null) {
          const stored = JSON.parse(value) as AuthCredentials
          setCredentials({
            accessToken: stored.accessToken,
            accountId: stored.accountId,
            sessionId: stored.sessionId,
          })
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching from storage', error)
      }

      setIsReady(true)

      try {
        await SplashScreen.hideAsync()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error hiding splash screen:', e)
      }
    }
    bootstrap()
  }, [])

  const { accessToken, accountId, sessionId } = credentials

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
