const express = require('express');

const emojis = require('./emojis');

const router = express.Router();

const myObject = Object.freeze({message: 'API - 👋🌎🌍🌏'});

router.get('/', (req, res) => {
  res.json(myObject);
});

router.use('/emojis', emojis);

module.exports = router;
