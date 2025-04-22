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

afterEach(() => {
  jest.restoreAllMocks()
  jest.clearAllTimers() // Clear any pending timers
})
