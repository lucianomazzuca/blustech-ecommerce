const { body, validationResult } = require('express-validator');

const brandValidatorRules = [
  body('name').trim().notEmpty().withMessage("Name can't be empty")
];

const validationHandler = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  };

  return res.status(400).json({
    errors: error.errors
  })
}

module.exports = { brandValidatorRules, validationHandler }