const {mongoDbDriverFactory} = require("moosedb");
const bodySchemaValidate = require("../../utils/body-schema-validate");
const {undefCheck} = require("undef-check");
const isEmpty = require("../../utils/is-empty");
const tryCatch = require("../../utils/try-catch");

async function toDatabase(databaseURI, dbName, collectionName) {
  undefCheck(databaseURI, "Database URI Undefined.");
  undefCheck(dbName, "Database Name Undefined.");
  undefCheck(collectionName, "Database Collection Undefined.");
  const [driver, err] = await tryCatch(mongoDbDriverFactory)(databaseURI);
  if (err) return console.error("MongoDbDriver faced an Error while creating an instance.");
  const collection = driver.db(dbName).get(collectionName);
  return async function (document, validate = false) {
    undefCheck(document, "Documents cannot be undefined or null.");
    if (isEmpty(document)) throw Error("Document cannot be empty.");
    if (validate && !(await bodySchemaValidate(result))) return false;
    collection.insertOne(document).then(console.log);
  }
}

module.exports = toDatabase;

/*
dBsaver: async function (result, validate = false) {
  if (validate && !(await bodySchemaValidate(result))) return false;
  return collection.insertOne(result);
},
dBswitch: function (dbName, collectionName) {
  undefCheck(dbName, "Database Name Undefined.");
  undefCheck(collectionName, "Database Collection Undefined.");
  driver.db(dbName).get(collectionName);
},

dBclose: async function () {
  return await driver.close();
}
*/