const { validationResult } = require('express-validator');
const fs = require('fs');

const validationHandler = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  };

  if (req.file) {
    console.log(req.file)
  }

  return res.status(400).json({
    errors: error.errors
  })
}

module.exports = validationHandler;