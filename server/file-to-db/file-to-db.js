const fs = require("fs");
const {join} = require("path");
const {mongoDbDriverFactory} = require("moosedb");
const {using} = require("using-statement");

function loadLogs() {
  const dirContent = fs.readdirSync('logs');
  const logs = [];
  dirContent.filter(v => v.match(/[\w\s\-]\.json$/i)).forEach(dir => {
    logs.push(JSON.parse(fs.readFileSync(join("logs", dir), "utf-8")));
  });
  return logs;
}

(async _ => {
  using(await mongoDbDriverFactory("mongodb://superUser:pass123@10.1.8.88:27017"), async driver => {
    const collection = driver.db("epatch").get("results");
    const response = await collection.insertMany(loadLogs());
    console.log(response);
  });
})();