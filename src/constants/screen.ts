import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';
const isIos = Platform.OS === 'ios';

export { isAndroid, isIos };
