const resolveRelativeAppRoot = require('./resolvePath').resolveRelativeAppRoot;

module.exports = {
  root: resolveRelativeAppRoot('.'),
  src: resolveRelativeAppRoot('src'),
  publicFolder: resolveRelativeAppRoot('src/public'),
  serverAppTs: resolveRelativeAppRoot('./src/ssrApp.ts'),
  mobileLoadableStats:resolveRelativeAppRoot('dist/mobile-loadable-stats.json'),
  webLoadableStats:resolveRelativeAppRoot('dist/web-loadable-stats.json'),
  mobileAppTsx: resolveRelativeAppRoot('./src/apps/mobile/index.tsx'),
  webAppTsx: resolveRelativeAppRoot('./src/apps/web/index.tsx'),
  dist: resolveRelativeAppRoot('./dist'),
  htmlTemplate: resolveRelativeAppRoot('./src/index.html'),
  mobileAppName: 'mobile',
  webAppName: 'web',
};
