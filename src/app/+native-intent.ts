import * as SecureStore from 'expo-secure-store'

export async function redirectSystemPath({ initial, path }: { initial: boolean; path: string }) {
  // Prevent Expo Router from navigating on the auth callback deep link
  if (path.includes('auth')) {
    if (initial) {
      const returnPath = await SecureStore.getItemAsync('auth-return-path')
      await SecureStore.deleteItemAsync('auth-return-path')
      return returnPath || '/(tabs)/me'
    }
    return undefined
  }

  return path
}
