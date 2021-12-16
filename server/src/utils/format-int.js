function formatInt(num, pad = 3) {
  if (!num || typeof num !== "string" || typeof num !== "number") throw Error("Undefined or unsupported data type.");
  return num.toString().padStart(pad, "0");
}

module.exports = formatInt;