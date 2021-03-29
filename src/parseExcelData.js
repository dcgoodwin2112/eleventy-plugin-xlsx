const fs = require("fs");
const path = require("path");
const globby = require("globby");
const xlsx = require("xlsx");

module.exports = async function (xlsxPath, dataPath) {
  const paths = await globby(`${xlsxPath}/**/*.xlsx`);
  paths.forEach((workbookPath) => {
    // ignore temp path for open files
    if (workbookPath.includes("/~$")) {
      return;
    }
    const basePath = workbookPath.replace(xlsxPath, "");
    const outputPath = path.join(dataPath, basePath).replace(".xlsx", "");
    const workbook = xlsx.readFile(workbookPath);

    const writeJson = (outputPath, sheetName, sheetJson) => {
      fs.promises.writeFile(
         path.join(outputPath, `${sheetName}.json`),
         JSON.stringify(sheetJson)
       );
    }

    workbook.SheetNames.forEach((sheetName) => {
      const sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      fs.promises
        .access(outputPath)
        .then(() => {
          writeJson(outputPath, sheetName, sheetJson);
        })
        .catch((err) => {
          // If directory does not exists, create it before writing json
          if (err.code === "ENOENT") {
            fs.promises.mkdir(outputPath, { recursive: true }).then(() => {
              writeJson(outputPath, sheetName, sheetJson);
            });
          }
        });
    });
  });
};
