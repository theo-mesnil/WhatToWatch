import '@testing-library/react-native/extend-expect';

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
