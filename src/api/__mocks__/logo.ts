import type { UseGetContentLogo } from '~/api/logo'

export const MOCK_LOGO: UseGetContentLogo['data'] = {
  aspectRatio: 245 / 234,
  url: 'url-logo.png',
}

export const MOCK_LOGO_EMPTY: UseGetContentLogo['data'] = null
