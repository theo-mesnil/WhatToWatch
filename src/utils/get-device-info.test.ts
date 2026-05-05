/* eslint-disable @typescript-eslint/no-require-imports */
import { Dimensions, Platform } from 'react-native'

beforeEach(() => {
  jest.resetModules()
})

const mockPlatformIpad = () => {
  Platform.OS = 'ios'
  Object.defineProperty(Platform, 'isPad', { configurable: true, value: true })
}

describe('isTablet', () => {
  it('should return true when deviceType is TABLET', () => {
    jest.doMock('expo-device', () => ({
      DeviceType: { TABLET: 2 },
      deviceType: 2,
    }))

    const { isTablet } = require('./get-device-info')

    expect(isTablet).toBe(true)
  })

  it('should return true when iOS iPad', () => {
    jest.doMock('expo-device', () => ({
      DeviceType: { TABLET: 2 },
      deviceType: null,
    }))
    mockPlatformIpad()

    const { isTablet } = require('./get-device-info')

    expect(isTablet).toBe(true)
  })

  it('should return false when deviceType is not TABLET and not iPad', () => {
    jest.doMock('expo-device', () => ({
      DeviceType: { TABLET: 2 },
      deviceType: null,
    }))

    const { isTablet } = require('./get-device-info')

    expect(isTablet).toBe(false)
  })
})

describe('isIpad', () => {
  it('should return true on iOS iPad', () => {
    mockPlatformIpad()

    const { isIpad } = require('./get-device-info')

    expect(isIpad).toBe(true)
  })

  it('should return false on non-iPad', () => {
    const { isIpad } = require('./get-device-info')

    expect(isIpad).toBe(false)
  })
})

describe('isTabletHorizontal', () => {
  it('should return true when tablet and width > height', () => {
    jest.doMock('expo-device', () => ({
      DeviceType: { TABLET: 2 },
      deviceType: 2,
    }))

    jest
      .spyOn(Dimensions, 'get')
      .mockReturnValue({ fontScale: 1, height: 768, scale: 1, width: 1024 })

    const { isTabletHorizontal } = require('./get-device-info')

    expect(isTabletHorizontal()).toBe(true)
  })

  it('should return false when tablet and width <= height', () => {
    jest.doMock('expo-device', () => ({
      DeviceType: { TABLET: 2 },
      deviceType: 2,
    }))

    jest
      .spyOn(Dimensions, 'get')
      .mockReturnValue({ fontScale: 1, height: 1024, scale: 1, width: 768 })

    const { isTabletHorizontal } = require('./get-device-info')

    expect(isTabletHorizontal()).toBe(false)
  })

  it('should return false when not a tablet', () => {
    jest.doMock('expo-device', () => ({
      DeviceType: { TABLET: 2 },
      deviceType: null,
    }))

    jest
      .spyOn(Dimensions, 'get')
      .mockReturnValue({ fontScale: 1, height: 768, scale: 1, width: 1024 })

    const { isTabletHorizontal } = require('./get-device-info')

    expect(isTabletHorizontal()).toBe(false)
  })
})
