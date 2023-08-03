const router = require('express').Router();
const controller = require('./controller.js');

// Temp Test Route
router.get('/access', (req, res) => {
  const json = {
    access: 'granted',
  };
  res.status(200).json(json);
});
router.get('/test', controller.test)
router.get('/admin/generate_users', controller.admin.generateUsers)

module.exports = router;
