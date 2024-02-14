const { executeQuery } = require('../../helpers');

module.exports = {
  all: async (req, res, next) => {
    const sql = 'SELECT * FROM student';

    const [items, error] = await executeQuery(sql);
    if (error) {
      return next(error);
    }
    res.json(items);
  },

  single: async (req, res, next) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM student WHERE id=?';
    const [items, error] = await executeQuery(sql, [id]);

    if (error) {
      return next(error);
    }

    res.json(items[0]);
  },

  create: async (req, res, next) => {
    const { firstname, lastname, email } = req.body;

    const argArr = [firstname, lastname, email];
    const sql = `INSERT INTO student ( firstname, lastname, email) VALUES (?,?,?)`;
    const [items, error] = await executeQuery(sql, argArr);
    if (error) {
      return next(error);
    }

    if (items.affectedRows !== 1) {
      console.log('create item no rows affected', items);
      return next(error, { msg: 'something wrong' });
    }
    res.json({
      id: items.id,
      msg: 'success',
    });
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;
    const argArray = [firstname, lastname, email, id];

    const sql = `UPDATE student SET firstname=?, lastname=?, email=? WHERE id=?`;

    const [responseObj, error] = await executeQuery(sql, argArray);
    if (error) {
      return next(error);
    }

    if (responseObj.affectedRows !== 1) {
      return next(error, { msg: 'something wrong, not updated' });
    }
    res.json({
      id: id,
      msg: 'successfuly updated',
    });
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    const sql = 'DELETE FROM `student` WHERE id=? LIMIT 1';

    const [responseObject, error] = await executeQuery(sql, [id]);
    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next('something went wrong, student not deleted');
    }

    res.status(200).json({
      message: 'Student deleted successfully',
    });
  },
};
