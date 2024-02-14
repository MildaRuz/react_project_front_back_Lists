const express = require('express');

const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/auth/login', authController.login);

authRouter.post('/auth/register', authController.register);

module.exports = authRouter;
