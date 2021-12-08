const express = require('express');
const saveFactory = require("./saver-factory");
const Process = require("process");

const router = express.Router();

// data-acc/epatch/
router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});


const filePath = Process.env.FILE_PATH;
const saver = saveFactory.toFile(filePath);

router.post('/', (req, res, next) => {
  try {
    const body = req.body;
    if (!body) res.send(404);
    const vmid = body.vmid;
    saver(body, (!!vmid ? vmid : "unknown"));
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;