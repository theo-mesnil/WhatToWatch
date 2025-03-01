jest.useFakeTimers();

jest.mock('expo-localization', () => ({
  getLocales: () => [
    {
      languageCode: 'en',
      regionCode: 'EN'
    }
  ]
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0
  })
}));

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllTimers(); // Clear any pending timers
});
