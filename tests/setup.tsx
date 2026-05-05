jest.useFakeTimers()

jest.mock('expo-localization', () => ({
  getLocales: () => [
    {
      languageCode: 'en',
      regionCode: 'EN',
    },
  ],
}))

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    bottom: 0,
    top: 0,
  }),
}))

jest.mock('expo-secure-store', () => ({
  deleteItemAsync: jest.fn(),
  getItemAsync: jest.fn(() => null),
  setItemAsync: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'))

afterEach(() => {
  jest.restoreAllMocks()
  jest.clearAllTimers() // Clear any pending timers
})
