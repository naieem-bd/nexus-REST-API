const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('get all users');
});

module.exports = router;
