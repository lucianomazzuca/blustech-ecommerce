const { body, validationResult } = require('express-validator');

const loginValidatorRules = [
  body('email').trim().notEmpty().withMessage('Email is empty'),
  body('password').trim().notEmpty().withMessage('Password is empty')
];

// function loginValidator(req, res, next) {
//   body('email').isEmail().normalizeEmail(),
//   body('text').not().isEmpty().trim().escape(),
//   body('notifyOnReply').toBoolean()

//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     return next();
//   };

//   res.status(400).json(errors);
// }

module.exports = loginValidatorRules