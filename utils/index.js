const appPath = require('./path');
const resolveRelativeAppRoot = require('./resolvePath');

module.exports = {
    ...appPath,
    resolveRelativeAppRoot
}