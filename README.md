# eleventy-plugin-xlsx
Uses the [Xlsx package](https://www.npmjs.com/package/xlsx) to convert excel spreadsheets to json data files and saves the output to the eleventy _data directory

## Install
```bash******
$npm install eleventy-plugin-xlsx --save-dev
```


## Usage
The default directory for excel files is /_xlsx. Any excel workbooks saved the /_xlsx directory will be parsed, converted to JSON, and saved to /_data/xlsx. These default directories can be overridden in the options array passed to the plugin.

```javascript
const parseExcelData = require("eleventy-plugin-xlsx");

// Default paths shown
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(parseExcelData, {
    xlsxPath: "./_xlsx",
    dataPath: "./_data/xlsx"
  });
}
```
