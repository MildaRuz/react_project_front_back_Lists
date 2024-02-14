const { jwtSecret } = require('./config');
const APIError = require('./src/apiError/ApiError');
const jwt = require('jsonwebtoken');

const mainErrroHandler = (errorGot, req, res, next) => {
  console.log('errorGot ===', errorGot);

  if (errorGot instanceof APIError) {
    return res.status(errorGot.status).json({
      error: errorGot.message,
    });
  }

  if (errorGot?.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      error: 'email already taken',
    });
  }

  res.status(500).json({
    error: 'System errror',
  });
};

const validateJWTToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  if (!jwtSecret) return res.status(401).json({ error: 'JWT Secret not Provided' });

  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    console.log(error);
    return next(new APIError('Invalid token', 401));
  }
};

module.exports = {
  mainErrroHandler,
  validateJWTToken,
};
