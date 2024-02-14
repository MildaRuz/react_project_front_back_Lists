const express = require('express');
const usersController = require('../controllers/usersController');
const { validateJWTToken } = require('../../middleware');

const usersRouter = express.Router();

// get all
usersRouter.get('/users', usersController.all);

//get single user
usersRouter.get('/users/:user_id', usersController.single);

// Post (create user
usersRouter.post('/users', usersController.create);

//PUT   (update users)
usersRouter.put('/users/:user_id', usersController.update);

//Delete /api/users/:id
usersRouter.delete('/users/:user_id', usersController.delete);

module.exports = {
  usersRouter,
};
