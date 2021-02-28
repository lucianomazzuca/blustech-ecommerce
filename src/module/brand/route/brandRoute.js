const express = require('express');

const router = express.Router();

function configureRouter({ brandController }) {
  router.get('/', brandController.index.bind(brandController))

  return router;
}

module.exports = configureRouter;