const mongoDbDriverFactory = require("../../database/mongo-driver");
const bodySchemaValidate = require("../../utils/body-schema-validate");
const undefCheck = require("../../utils/undef-check");

async function toDatabase(databaseURI, dbName, collectionName) {
  undefCheck(databaseURI, "Database URI Undefined.");
  undefCheck(dbName, "Database Name Undefined.");
  undefCheck(collectionName, "Database Collection Undefined.");
  const driver = await mongoDbDriverFactory(databaseURI);
  const collection = driver.db(dbName).get(collectionName);
  return {
    saver: async function (result, validate = false) {
      if (validate && !(await bodySchemaValidate(result))) return false;
      // TODO insertOne
      return // TODO response of operation
    },
    switch: function (dbName, collectionName) {
      undefCheck(dbName, "Database Name Undefined.");
      undefCheck(collectionName, "Database Collection Undefined.");
      driver.db(dbName).get(collectionName);
    },
    closeDb: async function () {
      return await driver.close();
    }
  }
}

module.exports = toDatabase;