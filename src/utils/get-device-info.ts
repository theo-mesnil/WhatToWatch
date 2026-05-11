import * as Device from 'expo-device'
import { Platform } from 'react-native'

export const isIpad = Platform.OS === 'ios' && Platform.isPad

export const isTablet = Device.deviceType === Device.DeviceType.TABLET || isIpad
