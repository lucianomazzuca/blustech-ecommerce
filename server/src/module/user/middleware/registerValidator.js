const { body, validationResult } = require("express-validator");

const registerValidatorRules = [
  body("email").trim().isEmail().withMessage("You have to enter a valid email"),
  body("password").trim().isLength({min: 5}).withMessage('Password must be at least 5 characters long'),
  body("name").trim().isLength({ min: 3}).withMessage('Name must be at least 3 characters long')
];

module.exports = registerValidatorRules;
