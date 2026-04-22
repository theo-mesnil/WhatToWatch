import * as Device from 'expo-device'
import { Dimensions, Platform } from 'react-native'

export const isIpad = Platform.OS === 'ios' && Platform.isPad

export const isTablet = Device.deviceType === Device.DeviceType.TABLET || isIpad

export const isTabletHorizontal = () => {
  const { height, width } = Dimensions.get('window')

  return isTablet && width > height
}
