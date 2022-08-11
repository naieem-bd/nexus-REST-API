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
    console.log(error);
  }
});

module.exports = router;
