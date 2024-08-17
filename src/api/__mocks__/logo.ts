import type { UseGetContentLogo } from 'api/logo';

export const MOCK_LOGO: UseGetContentLogo['data'] = {
  url: 'url-logo.png',
  aspectRatio: 245 / 234
};

export const MOCK_LOGO_EMPTY: UseGetContentLogo['data'] = null;
