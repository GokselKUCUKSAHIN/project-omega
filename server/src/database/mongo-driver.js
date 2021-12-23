const {MongoClient} = require("mongodb");
const undefCheck = require("../utils/undef-check");
const int = require("../utils/int");

const tryCatch = require("../utils/try-catch");
const sleep = require("../utils/sleep");

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
    // onCloseEvent.addCallback(this._id, this._autoClose); // TODO add to Callback list with _id
    // TODO TEST THIS will not behave as i expected???
  }

  /**@param databaseName {string}
   * @returns {MongodbDriver}
   */
  openDatabase(databaseName) {
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
    if (!this.isAlive()) throw Error("Connection is not alive. Connection dead or never initialized.");
  }

  /**@param body{Object}
   * @return {Promise<InsertOneResult<TSchema>>}
   */
  async insertOne(body, ...args) {
    this._checkAlive();
    undefCheck(body, "Object undefined.");
    if (Array.isArray(body)) throw Error("Can't use Arrays on insertOne method.");
    return await this.collection.insertOne(body, args);
  }

  /**@param bodyArray{Array<Object>}
   * @return {Promise<InsertManyResult<TSchema>>}
   */
  async insertMany(bodyArray, ...args) {
    this._checkAlive();
    undefCheck(bodyArray, "Object Array undefined.");
    if (!Array.isArray(bodyArray)) throw Error("bodyArray must be an Object Array.");
    return await this.collection.insertMany(bodyArray, args);
  }

  /**@return {Promise<boolean>} */
  async close() {
    console.log("Exit called", this._id);
    // onCloseEvent.removeCallback(this._id);
    // TODO remove from callback list
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

/*
async function mongoDbDriverFactoryWithErrorHandling(url, alive = true) {
  try {
    const driver = await mongoDbDriverFactory(url, alive);
    return [driver, null];
  } catch (err) {
    return [null, err];
  }
}
*/

module.exports = {mongoDbDriverFactory};

// DEMO with Promises

// mongoDbDriverFactory("mongodb://superUser:pass123@10.1.8.88:27017").then(driver => {
//   /**@type {Collection<Document>} */
//   const collection = driver.openDb("epatch").openCollection("results").collection;
//   collection.find({"result.fitness": {$eq: -217.7991357}}).toArray().then(console.log)
// });


// DEMO with async / await (IIFE)

// (async _ => {
//   const driver = await mongoDbDriverFactory("mongodb://superUser:pass123@10.1.8.88:27017");
//   const collection = driver.db("driver").get("demo");
//   await driver.insertMany([{name: "Bilal", surname: "Babayiğit"}, {name: "Murat", surname: "Türkmen"}]);
//   console.log(await collection.find({}).toArray());
//   // const results = await collection.find({"result.fitness": {$eq: -217.7991357}}).toArray();
//   // console.log(results);
// })();

// DEMO with tryCatch Decorator

async function bomb(millis) {
  await sleep(millis);
  throw Error("BOOOOMMMM!!!");
}

/**
 *
 * @type {function(): Promise<[*,null]|[null,*]}
 */
const defusedBomb = tryCatch(bomb);


const mongoDbDriverFactoryWithErrorHandling = tryCatch(mongoDbDriverFactory);

(async _ => {
  // const [, err] = await defusedBomb(1000);
  // if (err) console.error("Error handled")
  // const [, err] = await defusedBomb(1000);
  // if (err) console.log("DEFUSED!");

  const [driver, err] = await mongoDbDriverFactoryWithErrorHandling("mongodb://superUser:pass123@10.1.8.88:27017");
  const collection = driver.db("epatch").get("results");
  console.log(await collection.find({}).toArray());


})();

// const [driver, err] = await mongoDbDriverFactoryWithErrorHandling("mongodb://superUser:pass123@10.1.8.88:27017");
// const results = await collection.find({"result.fitness": {$eq: -217.7991357}}).toArray();
// console.log(results);