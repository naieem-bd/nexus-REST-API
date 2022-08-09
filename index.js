const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('Connect to MongoDB');
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('hi from homepage');
});

app.listen(2727, () => {
  console.log('hello node JS');
});
