const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Profile has been updated');
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can modify your account only!');
  }
});

// delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Profile has been deleted');
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json('You can delete your account only!');
  }
});

// get a user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// follow a user
// unfollow a user

module.exports = router;
