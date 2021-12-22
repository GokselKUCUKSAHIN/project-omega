module.exports = function (value, message = "Error message not specified.") {
  if (value === undefined) throw Error(message);
}