const saverFactory = require("./saver-factory");

const saver = saverFactory.toFile("./log");


const testObject = {
  name: "Göksel",
  age: 23
}

saver(testObject);