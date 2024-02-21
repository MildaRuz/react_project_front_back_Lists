const { executeQuery } = require('../../helpers');
const bcrypt = require('bcrypt');

module.exports = {
  all: async (req, res, next) => {
    const sql = 'SELECT * FROM books';

    const [items, error] = await executeQuery(sql);
    if (error) {
      return next(error);
    }
    res.json(items);
  },

  single: async (req, res, next) => {
    const { book_id } = req.params;
    // console.log('book ID-----', req.params);

    const sql = 'SELECT * FROM `books` WHERE book_id=?';
    const [items, error] = await executeQuery(sql, [book_id]);

    if (error) {
      return next(error);
    }

    res.json(items[0]);
  },

  create: async (req, res, next) => {
    const { img_url, title, author, description, year } = req.body;
    console.log('boooodyyy', req.body);

    const argArr = [img_url, title, author, description, year];
    console.log(argArr);

    const sql = `INSERT INTO books (img_url, title, author, description, year) VALUES (?,?,?,?,?)`;

    const [items, error] = await executeQuery(sql, argArr);

    if (error) {
      return next(error);
    }

    if (items.affectedRows !== 1) {
      console.log('create item no rows affected', items);
      return next(error, { msg: 'something wrong' });
    }
    res.json({
      id: items.book_id,
      msg: 'Book created successfully',
    });
  },

  getReserved: async (req, res, next) => {
    const sql = 'SELECT books.book_id FROM books JOIN users ON books.book_id=users.user_id WHERE book_id=?';

    const [items, error] = await executeQuery(sql);
    if (error) {
      return next(error);
    }
    res.json(items);
  },

  reserve: async (req, res, next) => {
    const { book_id, user_id } = req.body;
    console.log('boooodyyy', req.body);

    const argArr = [book_id, user_id];
    console.log(argArr);

    const sql = `INSERT INTO reserved_books (book_id, user_id) VALUES (?,?)`;

    const [items, error] = await executeQuery(sql, argArr);

    if (error) {
      return next(error);
    }

    if (items.affectedRows !== 1) {
      console.log('Reservation book no rows affected', items);
      return next(error, { msg: 'something wrong' });
    }
    res.json({
      id: items.book_id,
      msg: 'Book reserved successfully',
    });
  },

  update: async (req, res, next) => {
    const { book_id } = req.params;
    const { img_url, title, author, description, year } = req.body;

    const sql = `UPDATE books SET img_url=?, title=?, author=?, description=?, year=? WHERE book_id=?`;

    const argArray = [img_url, title, author, description, year, book_id];

    const [responseObj, error] = await executeQuery(sql, argArray);
    if (error) {
      return next(error);
    }

    if (responseObj.affectedRows !== 1) {
      return next(error, { msg: 'something wrong, not updated' });
    }
    res.json({
      id: book_id,
      msg: 'Book successfuly updated',
    });
  },

  delete: async (req, res, next) => {
    const { book_id } = req.params;
    console.log(req.params);
    const sql = 'DELETE FROM `books` WHERE book_id=? LIMIT 1';

    const [responseObject, error] = await executeQuery(sql, [book_id]);
    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next('something went wrong, book not deleted');
    }

    res.status(200).json({
      message: 'Book deleted successfully',
    });
  },
};
