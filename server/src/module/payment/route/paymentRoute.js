const express = require('express');
const router = express.Router();

function configureRouter({ paymentController }) {
  router.post("/new", paymentController.preference.bind(paymentController));

  return router;
};

module.exports = configureRouter;
