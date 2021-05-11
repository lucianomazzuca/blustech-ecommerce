const { body } = require('express-validator');

const brandValidatorRules = [
  body('name').trim().isLength({ min: 1}).withMessage("Name can't be empty")
];

module.exports = brandValidatorRules;