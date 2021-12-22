const {MongoClient} = require("mongodb");
// const onCloseEvent = require("../utils/onclose-event");
const int = require("../utils/int");
const sleep = require("../utils/sleep");

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
    // onCloseEvent.addCallback(this._id, this._autoClose); // TODO TEST THIS will not behave as i expected???
  }

  /**
   * @param databaseName {string}
   * @returns {MongodbDriver}
   */
  openDb(databaseName) {
    this._checkAlive();
    /**@type {Db} */
    this.db = this.client.db(databaseName);
    this.collection = void 0;
    return this;
  }

  /**
   * @param collectionName {string}
   * @returns {MongodbDriver}
   */
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

  close() {
    // TODO remove from callback list
    console.log("Exit called", this._id);
    // onCloseEvent.removeCallback(this._id);
    return this._autoClose()
  }

  /**@private */
  _autoClose() {
    console.log("ID=", this._id);
    if (this.alive) {
      // await this.client.close();
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

// DEMO with Promises

// mongoDbDriverFactory("mongodb://superUser:pass123@10.1.8.88:27017").then(driver => {
//   /**@type {Collection<Document>} */
//   const collection = driver.openDb("epatch").openCollection("results").collection;
//   collection.find({}).toArray().then(results => {
//     console.log(results);
//   });
// });

// DEMO with async/awaitv (IIFE)

(async _ => {
  const driver = await mongoDbDriverFactory("mongodb://superUser:pass123@10.1.8.88:27017");
  const collection = driver.openDb("epatch").openCollection("results").collection;
  const results = await collection.find({}).toArray();
  console.log(results);
})();

