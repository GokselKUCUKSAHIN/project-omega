const {mongoDbDriverFactory} = require("moosedb");
const bodySchemaValidate = require("../../utils/body-schema-validate");
const {undefCheck} = require("undef-check");
const tryCatch = require("../../utils/try-catch");

async function toDatabase(databaseURI, dbName, collectionName) {
  undefCheck(databaseURI, "Database URI Undefined.");
  undefCheck(dbName, "Database Name Undefined.");
  undefCheck(collectionName, "Database Collection Undefined.");
  const [driver, err] = await tryCatch(mongoDbDriverFactory)(databaseURI);
  if (err) return console.error("MongoDbDriver faced an Error while creating an instance.");
  const collection = driver.db(dbName).get(collectionName);
  return {
    /**@param result {Object}
     * @param validate {boolean}
     * @return {Promise<boolean>}
     */
    dBsaver: async function (result, validate = false) {
      if (validate && !(await bodySchemaValidate(result))) return false;
      return collection.insertOne(result);
    },
    /**@param dbName {string}
     * @param collectionName {string}
     */
    dBswitch: function (dbName, collectionName) {
      undefCheck(dbName, "Database Name Undefined.");
      undefCheck(collectionName, "Database Collection Undefined.");
      driver.db(dbName).get(collectionName);
    },
    /**@return {Promise<boolean>}
     */
    dBclose: async function () {
      return await driver.close();
    }
  }
}

module.exports = toDatabase;