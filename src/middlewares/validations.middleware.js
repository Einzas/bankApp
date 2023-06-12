const { body, validationResult } = require('express-validator');

const validateField = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validateField,
];

exports.loginValidation = [
  body('accountNumber').notEmpty().withMessage('Account number is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateField,
];

exports.createTransactionValidation = [
  body('amount').notEmpty().withMessage('Amount is required'),
  body('senderUserId').notEmpty().withMessage('Sender user id is required'),
  body('receiverUserId').notEmpty().withMessage('Receiver user id is required'),
  validateField,
];
