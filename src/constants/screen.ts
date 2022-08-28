import { Dimensions, Platform, PlatformIOSStatic } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const SIZE_TABLET = 768;
const SMALL_DEVICE = 375;

const isSmallDevice = windowWidth < SMALL_DEVICE;
const isTablet = windowWidth >= SIZE_TABLET;
const isAndroid = Platform.OS === 'android';
const isIos = Platform.OS === 'ios';

let isIpad;

if (isIos) {
  const platformIOS = Platform as PlatformIOSStatic;
  if (platformIOS.isPad) {
    isIpad = true;
  }
}

export {
  isAndroid,
  isIos,
  isIpad,
  isSmallDevice,
  isTablet,
  screenHeight,
  screenWidth,
  SIZE_TABLET,
  SMALL_DEVICE,
  windowHeight,
  windowWidth
};
