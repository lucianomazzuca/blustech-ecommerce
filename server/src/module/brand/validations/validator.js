const { body } = require('express-validator');

const brandValidatorRules = [
  body('name').trim().notEmpty().withMessage("Name can't be empty")
];

module.exports = brandValidatorRules;