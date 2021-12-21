const {MongoClient} = require("mongodb");

class MongodbDriver {
  constructor(url) {
    this.alive = false;
    this.client = new MongoClient(url);
  }

  async initialize() {
    await this.client.connect();
    this.alive = true;
  }

  openDb(databaseName) {
    this._checkAlive();
    /**@type {Db} */
    this.db = this.client.db(databaseName);
    this.collection = void 0;
    return this;
  }

  openCollection(collectionName) {
    this._checkAlive();
    /**@type {Collection<Document>} */
    this.collection = this.db.collection(collectionName);
    return this;
  }

  isAlive() {
    return this.alive;
  }

  /**@private */
  _checkAlive() {
    if (!this.alive) throw Error("Connection is not alive. Connection dead or never initialized.");
  }

  async close() {
    if (this.alive) {
      try {
        await this.client.close();
        this.alive = false;
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    return false;
  }
}

async function mongoDbDriverFactory(url, alive = true) {
  const mongoDriver = new MongodbDriver(url);
  if (alive) await mongoDriver.initialize();
  return mongoDriver;
}

module.exports = mongoDbDriverFactory;