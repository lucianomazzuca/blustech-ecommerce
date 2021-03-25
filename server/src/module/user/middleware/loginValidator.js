const { body, validationResult } = require('express-validator');

const loginValidatorRules = [
  body('email').trim().notEmpty().withMessage('Email is empty'),
  body('password').trim().notEmpty().withMessage('Password is empty')
];

module.exports = loginValidatorRules