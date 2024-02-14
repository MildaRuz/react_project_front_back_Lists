const express = require('express');
const booksController = require('../controllers/booksController');
const { validateJWTToken } = require('../../middleware');

const booksRouter = express.Router();

// get all
booksRouter.get('/books', booksController.all);

//get single book
booksRouter.get('/books/:book_id', booksController.single);

// Post (create book)
booksRouter.post('/books', booksController.create);

//PUT   (update books)
booksRouter.put('/books/:book_id', booksController.update);

//Delete /api/books/:id
booksRouter.delete('/books/:book_id', booksController.delete);

module.exports = {
  booksRouter,
};
