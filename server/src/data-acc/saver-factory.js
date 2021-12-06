const fs = require("fs");
const timestamp = require('time-stamp');


function toFile(filePath) {
  return function (file) {
    fs.writeFileSync(`${filePath}/${timestamp.utc('YYYY-MM-DD HH-mm-ss-ms')}.json` , JSON.stringify(file), "utf-8");
  }
}

module.exports = {toFile};
