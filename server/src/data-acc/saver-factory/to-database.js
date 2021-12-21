const bodySchemaValidate = require("../../utils/body-schema-validate");
const undefCheck = require("../../utils/undef-check");

function toDatabase(databaseURI, dbName, collection) {
  undefCheck(databaseURI, "Database URI Undefined.");
  undefCheck(dbName, "Database Name Undefined.");
  undefCheck(collection, "Database Collection Undefined.");
  return async function (result, validate = false) {
    if (validate && !(await bodySchemaValidate(result))) return false;

    // TODO Save to Database
    return // TODO response of operation
  }
}

module.exports = toDatabase;