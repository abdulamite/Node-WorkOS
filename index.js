const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/index');
const morgan = require('morgan');
dotenv.config();

const app = express();

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});