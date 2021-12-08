const fs = require("fs");
const timestamp = require('time-stamp');

function createPath(filePath) {
  !fs.existsSync(filePath) && fs.mkdirSync(filePath, {recursive: true})
  return filePath;
}

function createFileFromPath(filePath, vmid) {
  return `${createPath(filePath)}/${safeVMID(vmid)}${timestamp.utc('YYYY-MM-DD HH-mm-ss-ms')}.json`
}

function safeVMID(vmid) {
  return ("" + vmid).replaceAll(/[ :.]/g, '-').trim();
}

function toFile(path) {
  return function (file, vmid) {
    fs.writeFileSync(createFileFromPath(path, vmid), JSON.stringify(file), "utf-8");
  }
}

module.exports = toFile;