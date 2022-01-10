import 'dotenv/config';

export default {
  name: 'WhatToWatch',
  slug: 'WhatToWatch',
  description:
    "Find movies & tv shows guide recommendations - Looking for a movie or series idea for tonight? WhatToWatch is the simplest and fastest way to discover movies, series and actors. It's an application based on themoviedb (TMDb)database.",
  version: '1.0.0',
  orientation: 'portrait',
  icon: 'src/assets/icon.png',
  splash: {
    image: 'src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#121418'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: 'src/assets/adaptive-icon.png',
      backgroundColor: '#121418'
    },
    package: 'com.theomesnil.WhatToWatch',
    versionCode: 2
  },
  web: {
    favicon: 'src/assets/favicon.png'
  },
  extra: {
    eas: {
      projectId: 'deb154a5-6b12-419a-a3c5-d704888f7df2'
    },
    theMovieDbApiKey: process.env.THEMOVIEDB_API_KEY
  }
};
