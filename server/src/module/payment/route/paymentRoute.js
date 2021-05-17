const express = require('express');
const router = express.Router();

function configureRouter({ paymentController }) {
  router.post("/create_preference", paymentController.preference.bind(paymentController));

  return router;
};

module.exports = configureRouter;
