const mongoRegex = require('../constants/regex/mongo-uri');

function mongodbUriFactory(address, port, usr, pwd) {
  const uri = `mongodb://${usr}:${pwd}@${address}:${port}`;
  return uri.match(mongoRegex) === null ? undefined : uri;
}