const {MongoClient} = require("mongodb");
const onCloseEvent = require("../utils/onclose-event");
const int = require("../utils/int");
const sleep = require("../utils/sleep");

class MongodbDriver {
  constructor(url) {
    this.alive = false;
    // this.client = new MongoClient(url);
  }

  async initialize() {
    if (this.alive) return;
    // await this.client.connect();
    await sleep(100);
    this.alive = true;
    this._id = `id:${int(Math.random() * 10_000)}`;
    // TODO add to Callback list with _id
    onCloseEvent.addCallback(this._id, this._autoClose); // TODO TEST THIS not behave as i expected???
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

  close() {
    // TODO remove from callback list
    console.log("Exit called", this._id);
    onCloseEvent.removeCallback(this._id);
    return this._autoClose()
  }

  /**@private */
  _autoClose() {
    console.log("ID=",this._id);
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

// DEMO
/*
mongoDbDriverFactory("hello.com").then(driver => {
  const collection = driver.openDb("epatch").openCollection("results");
  collection.find({}).then(findResult => {
    console.log(findResult.toArray());
  })
});
*/


(async _ => {
  const driver = await mongoDbDriverFactory("hello.com");
  console.log(driver.isAlive())
  console.log("callback: ", onCloseEvent.hasCallback(driver._id));

  console.log(driver.isAlive());
  console.log("callback: ", onCloseEvent.hasCallback(driver._id));
})();

