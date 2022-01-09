import { Platform } from 'react-native';

import { TouchableAndroid } from './TouchableAndroid';
import { TouchableIOS } from './TouchableIOS';

export const Touchable = Platform.select({
  android: () => TouchableAndroid,
  ios: () => TouchableIOS
})();
