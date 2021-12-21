const {MongoClient} = require("mongodb");
const int = require("../utils/int");

class MongodbDriver {
  constructor(url) {
    this.alive = false;
    this.client = new MongoClient(url);
  }

  async initialize() {
    if (this.alive) return;
    await this.client.connect();
    this.alive = true;
    this._id = `id:${int(Math.random() * 10_000)}`;
    // TODO add to Callback list with _id
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
    // TODO remove from callback list
    return await this._autoClose()
  }

  /**@private */
  async _autoClose() {
    if (this.alive) {
      await this.client.close();
      this.alive = false;
      return true;
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

// DEMO

mongoDbDriverFactory("hello.com").then(driver => {
  const collection = driver.openDb("epatch").openCollection("results");
  collection.find({}).then(findResult => {
    console.log(findResult.toArray());
  })
});
