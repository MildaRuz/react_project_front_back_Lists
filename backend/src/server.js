require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const { validateJWTToken } = require('../middleware');

const { executeQuery } = require('../helpers');
const { studentRouter } = require('./routes/studentRoutes');
const authRouter = require('./routes/authRoutes');
const { usersRouter } = require('./routes/usersRoutes');
const { booksRouter } = require('./routes/booksRoutes');

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello everyone',
  });
});

app.use('/api', studentRouter);
app.use('/api', authRouter);
app.use('/api', validateJWTToken, usersRouter);
app.use('/api', validateJWTToken, booksRouter);

app.get('/test-conn', async (req, res) => {
  const sql = 'SELECT * FROM student';
  const [students, error] = await executeQuery(sql);

  res.json(students);
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
