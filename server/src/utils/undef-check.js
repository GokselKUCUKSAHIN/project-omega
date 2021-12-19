function undefCheck(value, message) {
  if (value === undefined) throw Error(message);
}
module.exports = undefCheck;