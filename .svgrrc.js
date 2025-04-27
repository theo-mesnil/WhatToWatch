/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
  indexTemplate: require('./scripts/svgr-index-template'),
  native: true,
  outDir: 'src/components/Icon/components',
  replaceAttrValues: {
    '#0F172A': '{color}',
  },
  svgoConfig: require('./scripts/svgo.config'),
  template: require('./scripts/svgr-template'),
  typescript: true,
}
