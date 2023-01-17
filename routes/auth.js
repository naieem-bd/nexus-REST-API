const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// register a new user
router.post('/register', async (req, res) => {
  try {
    // generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user to database
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login a user
router.post('/login', async (req, res) => {
  try {
    // find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json('User not found');
      return;
    }

    // check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(400).json('Invalid credentials');
      return;
    }

    // return/login user
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
