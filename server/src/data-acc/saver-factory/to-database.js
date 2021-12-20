const monk = require("monk");
const undefCheck = require("../../utils/undef-check");

function toDatabase(databaseURI, dbName, collection) {
  undefCheck(databaseURI, "Database URI Undefined.");
  undefCheck(dbName, "Database Name Undefined.");
  undefCheck(collection, "Database Collection Undefined.");
  return function (result, validate = false) {
    if(validate) let PLACE_HOLDER; // TODO validate the result
    // TODO Save to Database
    return // TODO response of operation
  }
}

module.exports = toDatabase;