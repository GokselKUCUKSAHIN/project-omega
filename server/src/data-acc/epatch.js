const express = require('express');
const saveFactory = require("./saver-factory");
const isEmpty = require("../utils/is-empty");
const formatInt = require("../utils/format-int");
const bodySchemaValidator = require("../utils/body-schema-validate");
const mongodbUriFactory = require("../utils/mongodb-uri-factory");
const router = express.Router();

// data-acc/epatch/
router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

const filePath = process.env.FILE_PATH;
const fileSaver = saveFactory.toFile(filePath);

// Object Destructuring
const {dbSaver, dBclose, dBswitch} = saveFactory.toDatabase();



const dbAddress = process.env.DATABASE_ADR;
const dbPort = process.env.DATABASE_PORT;
const dbUser = process.env.DATABASE_USR;
const dbPwd = process.env.DATABASE_PWD
const mongodbURI = mongodbUriFactory(dbAddress, dbPort, dbUser, dbPwd);

router.post('/', (req, res, next) => {
  try {
    const body = req.body;
    if (isEmpty(body)) return res.sendStatus(404);
    if (!bodySchemaValidator(body)) return res.sendStatus(418); // I'm a tea pod
    const vmid = body.vmid;
    // SAVE
    saver(body, (!!vmid ? formatInt(vmid) : "unknown"));
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;