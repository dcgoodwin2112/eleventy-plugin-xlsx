const pluginDefaults = require("./src/pluginDefaults");
const parseExcelData = require("./src/parseExcelData");

module.exports = function (eleventyConfig, options = {}) {
  const pluginOptions = Object.assign(pluginDefaults, options);
  eleventyConfig.addWatchTarget(pluginOptions.xlsxPath);
  parseExcelData(pluginOptions.xlsxPath, pluginOptions.dataPath);
};
