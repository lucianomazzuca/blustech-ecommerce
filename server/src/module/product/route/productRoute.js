const express = require('express');

const router = express.Router();

function configureRouter({productController}) {
  router.get('/', productController.index.bind(productController));
  router.get('/:id', productController.getById.bind(productController));
  router.post('/', productController.save.bind(productController));
  router.delete('/:id', productController.delete.bind(productController));
  
  return router;
}

module.exports = configureRouter;