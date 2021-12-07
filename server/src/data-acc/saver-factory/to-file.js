const fs = require("fs");
const timestamp = require('time-stamp');

function createPath(filePath) {
  !fs.existsSync(filePath) && fs.mkdirSync(filePath, {recursive: true})
  return filePath;
}

function createFileFromPath(filePath) {
  return `${createPath(filePath)}/${timestamp.utc('YYYY-MM-DD HH-mm-ss-ms')}.json`
}

function toFile(path) {
  return function (file) {
    fs.writeFileSync(createFileFromPath(path), JSON.stringify(file), "utf-8");
  }
}

module.exports = toFile;