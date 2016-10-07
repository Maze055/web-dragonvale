/**
 * @author: @AngularClass
 */
var path = require('path');

// Helper functions
var ROOT = path.resolve(__dirname, '..');

// CUSTOM: path to utility code directory
var UTIL = path.resolve(__dirname, '../../../util');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

// CUSTOM: clone of root above fo util path
function util(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [UTIL].concat(args));
}

exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;

// CUSTOM: util export
exports.util = util;
