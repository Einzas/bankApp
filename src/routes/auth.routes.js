const authController = require('../controllers/auth.controller');
const validationMiddleware = require('../middlewares/validations.middleware');

const express = require('express');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.signup
);

router.post(
  '/login',
  validationMiddleware.loginValidation,
  authController.login
);

module.exports = router;
