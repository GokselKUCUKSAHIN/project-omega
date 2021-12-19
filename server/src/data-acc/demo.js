const saverFactory = require("./saver-factory");

const saver = saverFactory.toFile("hello/world/my/file/directory/tree/goes/here/");

const testObject = {
  name: "Göksel",
  age: 23
}
// saver(testObject);

const bodySchema = require("../utils/body-schema-validate");

bodySchema().then(v => {
  console.log(v);
});