const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add support for vector icons and fonts
config.resolver.assetExts.push("ttf", "otf", "woff", "woff2");

module.exports = config;
