const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('hello its auth route');
});

module.exports = router;
