const express = require('express');
const studentController = require('../controllers/studentController');
const { validateJWTToken } = require('../../middleware');

const studentRouter = express.Router();

// get all
studentRouter.get('/students', studentController.all);

//get single /api/students/:id
studentRouter.get('/students/:id', studentController.single);

// Post (create student)
studentRouter.post('/students', validateJWTToken, studentController.create);

//PUT   (update student)
studentRouter.put('/students/:id', validateJWTToken, studentController.update);

//Delete /api/student/:id
studentRouter.delete('/students/:id', validateJWTToken, studentController.delete);

module.exports = {
  studentRouter,
};
