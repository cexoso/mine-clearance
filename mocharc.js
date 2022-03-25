'use strict';

function hasSpec() {
  var argv = process.argv;
  return argv.some(arg => arg.match(/spec\.ts?/));
}
const has = hasSpec();

// Here's a JavaScript-based config file.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.
module.exports = {
  extension: ['spec.ts'],
  spec: has
    ? undefined : [ 'src/**/*.spec.ts' ], 
  timeout: 10000,
  require: ['ts-node/register/transpile-only'],
  'watch-files': ['src/**/*.ts'],
};
