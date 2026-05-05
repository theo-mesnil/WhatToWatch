import { NETWORK_HBO_ID, NETWORK_NETFLIX_ID } from '~/constants/networks'

import { getNetworkFromUrl } from './networks'

describe('Networks utils', () => {
  test('getNetworkFromUrl', () => {
    expect(getNetworkFromUrl('this-is-url.com')).toBe(undefined)
    expect(getNetworkFromUrl('https://www.netflix.com/link-to')).toBe(NETWORK_NETFLIX_ID)
    expect(getNetworkFromUrl('hbo.com/house-of-dragon')).toBe(NETWORK_HBO_ID)
  })
})
