const express = require('express');
const saveFactory = require("./saver-factory");
const Process = require("process");
const isEmpty = require("../utils/is-empty");
const formatInt = require("../utils/format-int");
const bodySchemaValidator = require("../utils/body-schema-validate");
const mongodbUriFactory = require("../utils/mongodb-uri-factory");
const router = express.Router();

// data-acc/epatch/
router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});


const filePath = Process.env.FILE_PATH;
const saver = saveFactory.toFile(filePath);

const dbAddress = Process.env.DATABASE_ADR;
const dbPort = Process.env.DATABASE_PORT;
const dbUser = Process.env.DATABASE_USR;
const dbPwd = Process.env.DATABASE_PWD
const mongodbURI = mongodbUriFactory(dbAddress, dbPort, dbUser, dbPwd);

router.post('/', (req, res, next) => {
  try {
    const body = req.body;
    if (isEmpty(body)) return res.sendStatus(404);
    if (!bodySchemaValidator(body)) return res.sendStatus(418); // I'm a tea pod
    const vmid = body.vmid;
    saver(body, (!!vmid ? formatInt(vmid) : "unknown"));
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;