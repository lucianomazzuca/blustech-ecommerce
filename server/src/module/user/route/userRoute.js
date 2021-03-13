const express = require("express");
const passport = require('passport');
const { container } = require("../../../config/di-setup");

const router = express.Router();

const userController = container.resolve('userController');
router.get('/', userController.index.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/get', userController.getUser.bind(userController));

module.exports = router;