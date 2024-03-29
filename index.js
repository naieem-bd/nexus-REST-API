const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const app = express();
dotenv.config();

// mongoDB connection
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('Successfully connected to MongoDB');
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(2727, () => {
  console.log('The server is running on port 2727');
});
