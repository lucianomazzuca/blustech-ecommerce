const { validationResult } = require('express-validator');
const fs = require('fs');

function deleteFile(path) {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    console.log(e)
  }
}

const validationHandler = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  };

  if (req.file) {
    console.log('validationFileHandle', req.file.path)
    deleteFile(req.file.path)
  }

  return res.status(400).json({
    errors: error.errors
  })
}

module.exports = validationHandler;