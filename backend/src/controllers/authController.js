const bcrypt = require('bcrypt');
const { executeQuery, signJWTToken } = require('../../helpers');
const ApiErr = require('../apiError/ApiError');

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email=?';
  const [rowsArr, error] = await executeQuery(sql, [email]);

  if (error) {
    console.log('login error ===');
    return next(error);
  }

  if (rowsArr.length === 0) {
    console.log('user not found ===');
    return next(new ApiErr('User not found', 400));
  }
  const userFound = rowsArr[0];

  const hashPassword = userFound.password;

  if (!bcrypt.compareSync(password, hashPassword)) {
    return next(new ApiErr('Password or email not matched', 401));
  }

  const data = {
    sub: userFound.id,
    user: {
      id: userFound.id,
      email: userFound.email,
      scope: userFound.scope,
    },
  };

  const token = signJWTToken(data);

  res.json({ message: 'Login success', token });

  res.end();
};

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO `users` (`email`, `password`, `scope`) VALUES (?, ?, 'manager')";

  const [resObj, error] = await executeQuery(sql, [email, passwordHash]);

  if (error) {
    console.log('register error ====');
    return next(error);
  }

  if (resObj.affectedRows === 1) {
    res.status(201).json({
      msg: `User created successfully`,
      id: resObj.insertId,
    });
  }

  if (resObj.affectedRows !== 1) {
  }
  res.end();
};

module.exports = {
  login,
  register,
};
