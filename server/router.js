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

// User Routes
router.post('/signUp', controller.user.sign.up)
router.post('/signIn', controller.user.sign.in)
router.post('/:user_id/generatePack', controller.user.generatePack)
router.get('/:user_id/pack', controller.user.getPack)
router.get('/:user_id/cards', controller.user.getCards)

module.exports = router;
