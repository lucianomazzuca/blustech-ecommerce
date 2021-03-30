const { body } = require('express-validator');

const productValidatorRules = [
  body('model').trim().isLength({ min: 3}).withMessage("Model must be between 3 and 20 characters")
];

module.exports = productValidatorRules;