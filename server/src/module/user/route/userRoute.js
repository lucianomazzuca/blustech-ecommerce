const express = require("express");
const passport = require('passport');
const { container } = require("../../../config/di-setup");

const router = express.Router();

const userController = container.resolve('userController');
router.get('/', passport.authenticate('jwt', { session: false }), userController.index.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/me', passport.authenticate('jwt', { session: false}), userController.getUser.bind(userController));

module.exports = router;