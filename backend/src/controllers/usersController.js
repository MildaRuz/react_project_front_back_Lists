const { executeQuery } = require('../../helpers');
const bcrypt = require('bcrypt');

module.exports = {
  all: async (req, res, next) => {
    const sql = 'SELECT `user_id`, `email`, `scope`, `isActive` FROM users';

    const [items, error] = await executeQuery(sql);
    if (error) {
      return next(error);
    }
    res.json(items);
  },

  single: async (req, res, next) => {
    const { user_id } = req.params;
    // console.log('user ID-----', req.params);

    const sql = 'SELECT * FROM `users` WHERE user_id=?';
    const [items, error] = await executeQuery(sql, [user_id]);

    if (error) {
      return next(error);
    }

    res.json(items[0]);
  },

  create: async (req, res, next) => {
    const { email, password, scope, isActive } = req.body;

    const argArr = [email, password, scope, isActive];
    const sql = `INSERT INTO users ( email, password, scope, isActive) VALUES (?,?,?,?)`;

    const passwordHash = bcrypt.hashSync(password, 10);

    const [items, error] = await executeQuery(sql, [email, passwordHash, scope, isActive]);

    if (error) {
      return next(error);
    }

    if (items.affectedRows !== 1) {
      console.log('create item no rows affected', items);
      return next(error, { msg: 'something wrong' });
    }
    res.json({
      id: items.user_id,
      msg: 'success',
    });
  },

  update: async (req, res, next) => {
    const { user_id } = req.params;
    const { email, scope, isActive } = req.body;

    const sql = `UPDATE users SET email=?, scope=?, isActive=? WHERE user_id=?`;

    // const passwordHash = bcrypt.hashSync(password, 10);

    const argArray = [email, scope, isActive, user_id];

    const [responseObj, error] = await executeQuery(sql, argArray);
    if (error) {
      return next(error);
    }

    if (responseObj.affectedRows !== 1) {
      return next(error, { msg: 'something wrong, not updated' });
    }
    res.json({
      id: user_id,
      msg: 'successfuly updated',
    });
  },

  delete: async (req, res, next) => {
    const { user_id } = req.params;
    console.log(req.params);
    const sql = 'DELETE FROM `users` WHERE user_id=? LIMIT 1';

    const [responseObject, error] = await executeQuery(sql, [user_id]);
    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next('something went wrong, user not deleted');
    }

    res.status(200).json({
      message: 'User deleted successfully',
    });
  },
};
