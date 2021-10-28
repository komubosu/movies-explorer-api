const router = require('express').Router();
const { updateCurrentUserValidation } = require('../middlewares/validation');
const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', updateCurrentUserValidation, updateCurrentUser);

module.exports = router;
