// Use px2rem
const px2rem = require("postcss-plugin-px2rem");

// Set Rem
const preset = {
  // remUnit: 32 //基准大小 baseSize，需要和rem.js中相同

  // - Transfer Pixel
  rootValue: 10,
  // - Decimal 10
  // unitPrecision: 5,
  // - White List
  // propWhiteList: [],
  // - Black List
  // propBlackList: [],
  // - Exclude File
  exclude: /node_module/,
  // - Retain Class
  selectorBlackList: [":root", "html", "body"],
  // - Ignore Class
  ignoreIdentifier: false,
  // - Replace Rules
  // replace: true,
  // - Transfer in Media Screen
  mediaQuery: false,
  // - Mix Pixel to Transfer
  minPixelValue: 0
};

// Export
module.exports = (option = {}) => px2rem({ ...preset, ...option });
