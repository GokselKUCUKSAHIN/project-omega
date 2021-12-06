const express = require('express');

const router = express.Router();

// data-acc/epatch/
router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

router.post('/', (req, res, next) => {
  try {
    const body = req.body;
    if (!!body) {
      res.send({status: "OK", body}).json();
    } else {
      res.send(404);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;