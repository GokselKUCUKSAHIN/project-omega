const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'DATA ACC - 👋🌎🌍🌏'
  });
});

router.post('/', async (req, res, next) => {
  try {
    console.log("POST REQUEST AT /");
    console.log("Request Body:", req.body);
    res.send(200);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
