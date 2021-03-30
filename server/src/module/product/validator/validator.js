const { body } = require('express-validator');

const productValidatorRules = [
  body('model').trim().isLength({min: 3, max:20}).withMessage("Model must be between 3 and 20 characters"),
  body('price').trim().isCurrency({ digits_after_decimal: [1,2]}),
  body('discount').trim().isInt({min: 0, max: 100})
];

module.exports = productValidatorRules;