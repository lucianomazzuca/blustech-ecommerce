const express = require('express');
const passport = require('passport');

const router = express.Router();

function configureRouter({ cartController }) {
  router.get('/', cartController.index.bind(cartController));
  router.get('/:userId', cartController.getByUserId.bind(cartController));

  return router;
}

module.exports = configureRouter;