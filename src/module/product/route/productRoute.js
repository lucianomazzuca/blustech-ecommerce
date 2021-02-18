const express = require('express');
const { container } = require("../../../config/di-setup");

const router = express.Router();

const productController = container.resolve('productController');
console.log(productController)

router.get('/', productController.index.bind(productController));

module.exports = router;