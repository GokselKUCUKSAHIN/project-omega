// // const saverFactory = require("./saver-factory");
//
// // const saver = saverFactory.toFile("hello/world/my/file/directory/tree/goes/here/");
//
//
// const testObject = {
//   name: "Göksel",
//   age: 23
// }
//
// const mongodbUriFactory = require("../utils/mongodb-uri-factory");
//
// // saver(testObject);
//
// const bodySchema = require("../utils/body-schema-validate");
//
// bodySchema().then(v => {
//   // console.log(v);
// });
//
// const mongoRegex = require("../constants/regex/mongo-uri");
//
// const testMongodbUri = "mongodb://superUser:pass123@10.1.8.88:123";
// console.log(testMongodbUri.match(mongoRegex) !== null);
require("dotenv").config();

const dbAddress = process.env.DATABASE_ADR;
const dbPort = process.env.DATABASE_PORT;
const dbUser = process.env.DATABASE_USR;
const dbPwd = process.env.DATABASE_PWD
const mongodbURI = process.env.DATABASE_URI;
// const mongodbURI = mongodbUriFactory(dbAddress, dbPort, dbUser, dbPwd);
console.log(mongodbURI)

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(mongodbURI, function (err, db) {
  if (err) throw err;
  var dbo = db.db("epatch");
  dbo.collection("results").find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});