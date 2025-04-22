import { NETWORK_HBO_ID, NETWORK_NETFLIX_ID } from 'constants/networks'

import { getNetworkColor, getNetworkFromUrl } from './networks'

describe('Networks utils', () => {
  test('getNetworkFromUrl', () => {
    expect(getNetworkFromUrl('this-is-url.com')).toBe(undefined)
    expect(getNetworkFromUrl('https://www.netflix.com/link-to')).toBe(NETWORK_NETFLIX_ID)
    expect(getNetworkFromUrl('hbo.com/house-of-dragon')).toBe(NETWORK_HBO_ID)
  })

  test('getNetworkColor', () => {
    expect(getNetworkColor(NETWORK_NETFLIX_ID)).toStrictEqual(['#E50914', '#b70710'])
    expect(getNetworkColor(NETWORK_HBO_ID)).toStrictEqual(['#7B2ABF', '#441769'])
  })
})
