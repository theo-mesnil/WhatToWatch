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

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

afterEach(() => {
  jest.restoreAllMocks()
  jest.clearAllTimers() // Clear any pending timers
})
