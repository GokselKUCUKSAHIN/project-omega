function formatInt(num, pad = 3) {
  if (num === undefined) throw Error("Number Undefined.");
  return num.toString().padStart(pad, "0");
}

module.exports = formatInt;