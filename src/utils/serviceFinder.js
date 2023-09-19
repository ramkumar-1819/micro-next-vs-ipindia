const fs = require("fs");
const path = require("path");
const url = require("url");

const serviceRelativePath = "src/data/services";
const currentPath = path.join(process.cwd(), serviceRelativePath);
const getDirectoryData = (
  service = "llp-registration-india",
  language,
  servicePath = currentPath,
  callback = true
) => {
  const givenPath =
    language === "hi" && callback ? `${servicePath}/hi` : servicePath;

  try {
    const directory = fs.readdirSync(givenPath);
    for (let fileFolder of directory) {
      const filePath = path.join(givenPath, fileFolder);
      const fileDetails = fs.statSync(filePath);
      const isFile = fileDetails?.isFile();
      if (isFile) {
        if (service === fileFolder.split(".json")[0]) {
          const data = fs.readFileSync(filePath);
          const stringifiedData = data.toString();
          return JSON.parse(stringifiedData);
        }
      } else {
        const data = getDirectoryData(service, language, filePath, false);
        if (data) {
          return data;
        }
      }
    }
    return null;
  } catch (err) {}
};

module.exports = {
  getDirectoryData,
};
