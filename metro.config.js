const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const packagePath = "/Users/brojun/Desktop/works/korail-ts";

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    nodeModulesPaths: [packagePath],
  },
  watchFolders: [packagePath],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
