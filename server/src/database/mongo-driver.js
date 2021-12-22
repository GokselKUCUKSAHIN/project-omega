const {MongoClient} = require("mongodb");
// const onCloseEvent = require("../utils/onclose-event");
const int = require("../utils/int");

class MongodbDriver {
  constructor(url) {
    this.alive = false;
    this.client = new MongoClient(url);
  }

  /**@return {Promise<void>} */
  async initialize() {
    if (this.alive) return;
    await this.client.connect();
    this.alive = true;
    this._id = `id:${int(Math.random() * 10_000)}`; // TODO impl randomInt function
    // TODO add to Callback list with _id
    // onCloseEvent.addCallback(this._id, this._autoClose); // TODO TEST THIS will not behave as i expected???
  }

  /**@param databaseName {string}
   * @returns {MongodbDriver}
   */
  openDatabase(databaseName){
    this._checkAlive();
    /**@type {Db} */
    this.database = this.client.db(databaseName);
    this.collection = void 0;
    return this;
  }

  /**@param databaseName {string}
   * @returns {MongodbDriver}
   * @alias MongoDriver.openDatabase
   */
  db(databaseName) {
    return this.openDatabase(databaseName);
  }

  /**@param collectionName
   * @return {Collection<Document>}
   */
  openConnection(collectionName) {
    this._checkAlive();
    /**@type {Collection<Document>} */
    this.collection = this.database.collection(collectionName);
    return this.collection;
  }

  /**@param collectionName {string}
   * @return {Collection<Document>}
   * @alias MongodbDriver.openConnection
   */
  get(collectionName) {
    return this.openConnection(collectionName);
  }

  /**@return {boolean} */
  isAlive() {
    return this.alive;
  }

  /**@private */
  _checkAlive() {
    if (!this.alive) throw Error("Connection is not alive. Connection dead or never initialized.");
  }

  /**@return {Promise<boolean>} */
  async close() {
    // TODO remove from callback list
    console.log("Exit called", this._id);
    // onCloseEvent.removeCallback(this._id);
    return await this._autoClose()
  }

  /**@private
   * @return {Promise<boolean>}
   */
  async _autoClose() {
    console.log("ID=", this._id);
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

// DEMO with Promises

// mongoDbDriverFactory("mongodb://superUser:pass123@10.1.8.88:27017").then(driver => {
//   /**@type {Collection<Document>} */
//   const collection = driver.openDb("epatch").openCollection("results").collection;
//   collection.find({"result.fitness": {$eq: -217.7991357}}).toArray().then(console.log)
// });

// DEMO with async/await (IIFE)
//
// (async _ => {
//   const driver = await mongoDbDriverFactory("mongodb://superUser:pass123@10.1.8.88:27017");
//   const collection = driver.db("epatch").get("results");
//   const results = await collection.find({"result.fitness": {$eq: -217.7991357}}).toArray();
//   console.log(results);
// })();