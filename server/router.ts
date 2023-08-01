const router = require('express').Router();
const controller = require('./controller.ts');

// Temp Test Route
router.get('/access', (req, res) => {
  const json = {
    access: 'granted',
  };
  res.status(200).json(json);
});

module.exports = router;
