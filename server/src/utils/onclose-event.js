const callbacks = {};

function addCallback(name, callback) {
  if (typeof callback === "function" && typeof name === "string") callbacks[name] = callback;
}

function removeCallback(name) {
  if (hasCallback(name)) delete callbacks[name];
}

function hasCallback(name) {
  return callbacks.hasOwnProperty(name);
}

function executeCallbacks() {
  Object.values(callbacks).forEach(callback => callback());
}

function exitHandler(options, exitCode) {
  if (options.close) executeCallbacks();
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) process.exit();
}

process.stdin.resume();//so the program will not close instantly
//do something when app is closing
process.on('exit', exitHandler.bind(null, {close: true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit: true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit: true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit: true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit: true}));

module.exports = {addCallback, removeCallback, hasCallback};