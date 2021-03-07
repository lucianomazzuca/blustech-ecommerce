const express = require('express');

const router = express.Router();

function configureRouter({ brandController }) {
  router.get('/', brandController.index.bind(brandController));
  router.post('/', brandController.save.bind(brandController));

  return router;
}

module.exports = configureRouter;