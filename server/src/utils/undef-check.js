function undefCheck(value, message = "Error message not specified.") {
  if (value === undefined) throw Error(message);
}

module.exports = undefCheck;