const { body } = require('express-validator');

const productValidatorRules = [
  body('name').trim().isLength({ min: 3}).withMessage("Name can't be empty")
];

module.exports = productValidatorRules;