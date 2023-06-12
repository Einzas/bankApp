const transferController = require('../controllers/transfer.controller');
const transferMiddleware = require('../middlewares/transfers.middlewares');

const express = require('express');

const router = express.Router();

router.post(
  '/',
  transferMiddleware.createTransferValidation,
  transferController.createTransfer
);

module.exports = router;
