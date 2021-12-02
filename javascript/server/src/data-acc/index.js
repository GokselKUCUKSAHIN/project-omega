const express = require('express');

const epatch = require('./epatch');

const router = express.Router();

// data-acc/
router.get('/', (req, res) => {
  res.json({
    message: 'DATA-ACC API - 👋🌎🌍🌏'
  });
});

router.use('/epatch', epatch);

module.exports = router;
