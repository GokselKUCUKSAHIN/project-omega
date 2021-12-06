const saverFactory = require("./saver-factory");

const fileSaver = saverFactory.toFile("C:/x/");
const testObject = {
  name: "Göksel",
  age: 23
}
fileSaver(testObject);