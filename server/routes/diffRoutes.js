const express = require('express');
const router = express.Router();
const { diffTexts } = require('../services/diffService');

router.post('/', (req, res) => {
  const { leftText = '', rightText = '' } = req.body || {};

  const result = diffTexts(leftText, rightText);
  res.json(result);
});

module.exports = router;

