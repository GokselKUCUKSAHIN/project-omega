const {undefCheck} = require("undef-check");

function formatInt(num, pad = 3) {
  undefCheck(num, "Number Undefined.");
  return num.toString().padStart(pad, "0");
}

module.exports = formatInt;